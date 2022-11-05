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
import DeleteIcon from '@mui/icons-material/Delete';


const ChannelTable = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const getChannels = () => {
        setLoading(true)
        axios.get('api/getChannels')
            .then((res) => {


                setData(res.data.channels)
                setLoading(false)
                // alert(res?)

            }).catch((err) => {
                alert("Server Timeout")
                setLoading(false)
            })


    }

    useEffect(() => {
        getChannels()
    }, [])

    const deleteChannel = (params) => {
        // console.log(params)
        let copy =  [...data]
        axios.post('api/deleteChannel', params)
            .then((res) => {
                alert(res.data.message)
            })
            .catch((error) => {
                alert(error.data.message)
            })

         copy = data.filter((data) =>data.id !== params.id)
         setData(copy)
    }

    // console.log(data)
    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "2rem" }}>
                <Button
                    variant='contained'
                    color='success'
                >
                    <Link href='/'>Add</Link>
                </Button>
            </div>
            {loading ? <p style={{ textAlign: "center", fontSize: "1.5rem" }}>Loading...</p> : <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "6rem 4rem" }}>
                <h3 align="center">Channels Table</h3>

                <TableContainer component={Paper}>

                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Rule ID</TableCell>
                                <TableCell align="center">Rule</TableCell>
                                <TableCell align="center">Channel Tag</TableCell>
                                <TableCell align="center">Delete Channel</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell align="center" >{row.rule_id}</TableCell>
                                    <TableCell align="center">{row.rule}</TableCell>
                                    <TableCell align="center">{row.channel_tag}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => { deleteChannel(row) }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>}
        </>
    )
}

export default ChannelTable
