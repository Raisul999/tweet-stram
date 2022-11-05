import { Button } from '@mui/material'
import Link from "next/link"
import styles from '../styles/Home.module.css'
import Form from '../components/Form'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.btnGroup}>
        <Button
          variant="contained"
          color="success"
        >
        <Link href='/TweetTable'>View Tweets</Link>  
        </Button>
        <Button
          variant="contained"
          color="warning"
        >
        <Link href='/ChannelTable'>View Channels</Link>  
        </Button>
      </div>

      <Form />

    </div>
  )
}
