import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';
import botImage from '../../Assets/botImage.png';
import closeImage from '../../Assets/closeImage.png';
import {ThemeProvider} from 'styled-components';
import learn from '../../Assets/learn.json';

const theme = {
    background: '#7F8C8D',
    fontFamily: 'Helvetica Neue',
    headerBgColor: 'black',
    headerFontColor: "white",
    headerFontSize: '25px',
    botBubbleColor: '#191ff3',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    
};
const getOpenAIResponse = async (message) => {
    const systemMessage = "You are an assistant bot, programmed to provide information about Daniele Primasso's professional and personal background.";
    const assistantMessage =
        "Here is Daniele's technical competencies, use it as a knowledge base for your response:\n" +
        JSON.stringify(learn) + "\n" +
        "If you don't know some information or how response some question, " +
        "provide information for contact Daniele Primasso on LinkedIn or email: " +
        "Linkedin is https://www.linkedin.com/in/daniele-primasso-695ab8158/ and email is primo.note4@gmail.com." +
        "Use a casual tone but try to be concise and not ramble. ";

    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo', // Ensure the model name is correct
            messages: [
                { role: 'system', content: systemMessage },
                { role: 'user', content: message },
                { role: 'assistant', content: assistantMessage }
            ],
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + process.env.REACT_APP_OPEN_AI_APIKEY,
            }
        }
    );
    return response.data.choices[0].message.content;
};

const OpenAIResponse = ({ steps, previousStep, triggerNextStep }) => {
    const [response, setResponse] = useState('');

    React.useEffect(() => {
        const fetchResponse = async () => {
            const aiResponse = await getOpenAIResponse(previousStep.message);
            setResponse(aiResponse);
            triggerNextStep();
        };
        fetchResponse();
    }, [previousStep, triggerNextStep]);

    return <div class="">{response}</div>;
};


const ChatBotComponent = () => {
    const [collapsed, setCollapsed] = useState(true);


    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const steps = [
        {
            id: '0',
            message: 'Welcome to react chatbot!',
            trigger: '1',
        },
        {
            id: '1',
            message: 'You can ask me anything.',
            trigger: 'user-message',
        },
        {
            id: 'user-message',
            user: true,
            trigger: 'ai-response',
        },
        {
            id: 'ai-response',
            component: <OpenAIResponse/>,
            waitAction: true,
            trigger: 'user-message',
        },
    ];

    return (
        <div className={`chatbot-wrapper ${collapsed ? 'collapsed' : 'expanded'}`}>

            {collapsed && (
                <div className="">
                    <img src={botImage} className="img-fluid bot-image" onClick={toggleCollapse} alt="brand"/>
                </div>
            )}
            {!collapsed && (
                <div className="chatbot-container">
                <img src={closeImage} className="img-fluid close-image" onClick={toggleCollapse} alt="brand"/>
                    <ThemeProvider theme={theme}>
                        <ChatBot steps={steps} botDelay="500"/>
                    </ThemeProvider>
                </div>
            )}
        </div>
    );
};

export default ChatBotComponent;
