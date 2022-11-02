import { useState } from 'react'
import style from "./Form.module.css";
import axios from 'axios'
const Form = () => {
    const [channel, setChannel] = useState('');
    const [keyword, setKeyword] = useState('');

    const sendDetails = async() => {
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

    const insertChannel = async() => {
        if (channel === '') {
            alert("Please enter channel name")
            return
        } else if (keyword === '') {
            alert("Please enter keyword")
            return
        }

        const res = await axios.post('api/registerChannel', {
            channel: channel,
            keyword: keyword,
           
        }).then(res => res)

        console.log(res.data.message)

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

                        <button
                            className={style.btn}
                            onClick={()=>{sendDetails(); insertChannel()} }
                        >
                            Send
                        </button>

                    </div>




                </div>

            </div>
        </div>
    )
}

export default Form
