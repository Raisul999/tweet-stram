import axios from "axios"


export default async function (req, res) {

    const { channel, keyword } = req.body

    const endpoint = process.env.HASURA_PROJECT_ENDPOINT;

    const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
    };
    const graphqlQuery = {

        "query": `mutation($keyword:String!, $channel:String!) {
  
            insert_channels_one(object: {rule:$keyword, channel:$channel}){
               rule
               channel
            }
          }`,
        "variables": {keyword, channel  }
    };

    const response = await axios({
        url: endpoint,
        method: 'post',
        headers: headers,
        data: graphqlQuery
    })

    console.log(response.data.data.insert_channels_one)

    let result

    if(response.data.data.insert_channels_one.rule!==undefined){
        result = res.status(200).json({
            message: "Inserted successfully"})
    }
    else{
        result=res.status(500).json({ message: "Error"})

    }
    
    // console.log(result)
  
    return result

   
}