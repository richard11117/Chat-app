import Head from 'next/head';
import Chat from '../components/Chat';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Chat Room</title>
                <meta name="description" content="Chat with everyone in one room" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Chat />
        </div>
    );
}
