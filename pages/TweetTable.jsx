import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button

} from '@mui/material';
import Link from 'next/link';


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
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "2rem" }}>
                <Button
                    variant='contained'
                    color='success'
                >
                    <Link href='/'>Add Channel</Link>
                </Button>
            </div>
            {loading ? <p style={{ textAlign: "center", fontSize: "1.5rem" }}>Loading...</p> : <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "6rem 4rem" }}>
                <h3 align="center">Tweet Stream Table</h3>

                <TableContainer component={Paper}>

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
                </TableContainer>

            </div>}
        </>
    )
}

export default TweetTable
