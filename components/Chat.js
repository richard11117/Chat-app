import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styled from '@emotion/styled';

const socket = io();

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(to bottom right, #111, #222);
    color: #e0e0e0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #1e1e1e;
    border-bottom: 1px solid #444;
`;

const MessageInputContainer = styled.div`
    display: flex;
    padding: 10px;
    background: #333;
    border-top: 1px solid #444;
`;

const MessageInput = styled.input`
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #444;
    background: #222;
    color: #e0e0e0;
`;

const Button = styled.button`
    background-color: #25D366;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
`;

const Message = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    background: #333;
    border-radius: 5px;
`;

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
    }, []);

    const sendMessage = () => {
        if (input) {
            socket.emit('message', { username, text: input });
            setInput('');
        }
    };

    return (
        <ChatContainer>
            {!loggedIn ? (
                <div>
                    <MessageInput
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button onClick={() => setLoggedIn(true)}>Join Chat</Button>
                </div>
            ) : (
                <>
                    <MessagesContainer>
                        {messages.map((msg, index) => (
                            <Message key={index}>
                                <strong>{msg.username}: </strong>{msg.text}
                            </Message>
                        ))}
                    </MessagesContainer>
                    <MessageInputContainer>
                        <MessageInput
                            type="text"
                            placeholder="Type a message"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <Button onClick={sendMessage}>Send</Button>
                    </MessageInputContainer>
                </>
            )}
        </ChatContainer>
    );
}
