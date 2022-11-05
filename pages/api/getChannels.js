import axios from 'axios'

export default async (req, res) => {
    const endpoint = process.env.HASURA_PROJECT_ENDPOINT;

    const headers = {
        "content-type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
    };
    const graphqlQuery = {

        "query": `{
            channels{
                id
                rule_id
                rule
                channel_tag
              }
          }`,
    };

    const response = await axios({
        url: endpoint,
        method: 'post',
        headers: headers,
        data: graphqlQuery
    })
    // console.log(response.data.data)

    return res.send(response.data.data)
}
