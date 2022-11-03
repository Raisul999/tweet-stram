import { useState } from 'react'
import style from "./Form.module.css"
import axios from 'axios'
import {Button} from "@mui/material"
import Link from "next/link"

const Form = () => {
    const [channel, setChannel] = useState('');
    const [keyword, setKeyword] = useState('');

    const registerDetails = async() => {
        if (channel === '') {
            alert("Please enter channel name")
            return
        } else if (keyword === '') {
            alert("Please enter keyword")
            return
        }

        const res = await axios.post('api/registerRule', {
            channel: channel,
            keyword: keyword,
           
        }).then(res => res)

        return res



    }

    

    return (
        <div>

            <div className={style.container}>
                <div className={style.form}>
                    <h1 className={style.heading}>Add Channel</h1>
                    <div className={style.items}>

                        <div> <label>Channel Name</label></div>
                        <input
                            type="text"
                            className={style.input}
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                        />

                        <div> <label>Keyword</label></div>
                        <input
                            type="text"
                            className={style.input}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />

                        <Button
                            style={{backgroundColor:"#6495ED", color:"white"}}
                            onClick={registerDetails }
                        >
                            Send
                        </Button>

                    </div>

                </div>
                  
            </div>
            <Link href="/TweetTable" style={{display:"flex", justifyContent:"center"}}><p>See Tweets</p></Link>
        </div>
    )
}

export default Form
