import { TwitterApi } from 'twitter-api-v2';
import axios from 'axios';
export default async (req, res) => {

    const { channel, keyword } = req.body


    const client = new TwitterApi(process.env.TWITTER_TOKEN);

    const addedRules = await client.v2.updateStreamRules({
        add: [
            { value: keyword, tag: channel },
        ],
    });

    // const deleteRules = await client.v2.updateStreamRules({
    //     delete: {
    //         ids: ['1588048353098887168'],
    //     },
    // });

    // console.log(deleteRules)


    console.log(addedRules)



    if (addedRules.errors == null) {
        const rule_id = String(addedRules.data[0].id)

        console.log('rule_id:', rule_id)

        const endpoint = process.env.HASURA_PROJECT_ENDPOINT;

        const headers = {
            "content-type": "application/json",
            "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
        };
        const graphqlQuery = {

            "query": `mutation($keyword:String!, $channel:String!, $rule_id:String!) {
      
                insert_channels_one(object: {rule: $keyword, channel_tag: $channel, rule_id:$rule_id}){
                    rule
                    rule_id
                    channel_tag
                  }
              }`,
            "variables": { keyword, channel, rule_id }
        };


        const response = await axios({
            url: endpoint,
            method: 'post',
            headers: headers,
            data: graphqlQuery
        })

        console.log(response.data)

        // let result

        if (response.data.data.insert_channels_one) {
            return res.status(200).json({
                message: "Inserted successfully"
            })
        }
        else {
            return res.status(500).json({ message: "Error" })

        }

    }
    
    return res.status(400).json({message:"Duplicate entry"})



}