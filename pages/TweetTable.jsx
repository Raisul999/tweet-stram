import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper

} from '@mui/material';



const TweetTable = () => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)


    const getTweets = () => {
        setLoading(true)
        axios.get('api/getTweets')
            .then((res) => {


                setData(res.data.tweets)
                setLoading(false)

            }).catch((err) => {
                alert("Server Timeout")
                setLoading(false)
            })


    }

    useEffect(() => {
        getTweets()
    }, [])

    // console.log(data)
    return (
        <div style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", margin: "6rem 4rem" }}>
            {loading?"":<h3 align="center">Tweet Stream Table</h3>}

            {loading ? "Loading" : <TableContainer component={Paper}>
               
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Tweet ID</TableCell>
                            <TableCell align="center">Text</TableCell>
                            <TableCell align="center">Tag</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell align="center" >{row.tweet_id}</TableCell>
                                <TableCell align="center">{row.text}</TableCell>
                                <TableCell align="center">{row.tag}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}

        </div>
    )
}

export default TweetTable
