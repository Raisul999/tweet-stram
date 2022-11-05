import axios from 'axios'
import { TwitterApi } from 'twitter-api-v2';

export default async(req,res)=>{
    console.log(req.body)
    const{rule_id, channel_tag} = req.body

    const client = new TwitterApi(process.env.TWITTER_TOKEN);

     const deleteRules = await client.v2.updateStreamRules({
        delete: {
            ids: [rule_id],
        },
    });

    console.log(deleteRules.meta.summary.deleted)

    // Delete Tweets
 
    const endpoint = process.env.HASURA_PROJECT_ENDPOINT;

    const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
    };
    const deleteTweet = {

        "query": `mutation($channel_tag:String!) {
  
            delete_tweets(where: {tag: {_eq:$channel_tag}}){
                affected_rows
              }
          }`,
        "variables": {channel_tag }
    };

    const responseTweet = await axios({
        url: endpoint,
        method: 'post',
        headers: headers,
        data: deleteTweet
    })

    console.log(responseTweet.data.data.delete_tweets)

    // Delete Channel

    const deleteChannel = {

        "query": `mutation($rule_id:String!) {
  
            delete_channels(where: {rule_id: {_eq:$rule_id}}){
                affected_rows
              }
          }`,
        "variables": {rule_id }
    };

    const responseChannel = await axios({
        url: endpoint,
        method: 'post',
        headers: headers,
        data: deleteChannel
    })


   console.log(responseChannel.data.data.delete_channels)

   if(responseChannel.data.data.delete_channels&&responseTweet.data.data.delete_tweets){
     return res.status(200).json({message:"Channel deleted successfully"})
   }

   return res.status(500).json({message:"Error deleting channel"})

}