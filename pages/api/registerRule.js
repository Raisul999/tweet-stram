import { TwitterApi } from'twitter-api-v2';

export default async(req, res)=>{
  
    const { channel, keyword } = req.body

    const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAACAhiwEAAAAAKYLu5uGcWXgL1zFGLNML5VjNDi4%3DM75PwdAE3ikXwXkAmm7lYesLhrR21ax5KV2CSVQMJ7hieUig2w');

    const addedRules = await client.v2.updateStreamRules({
        add: [
            { value: keyword, tag: channel },
        ],
    });

    console.log(addedRules)
  
}