import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
const __dirname = process.cwd(); // The current path of the project



app.use(express.static(path.resolve(__dirname)));

app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body; // We receive name, email and message values ​​from the request body


    const payload = {
        username: 'fl', // Set the webhook username here
        avatar_url: 'https://avatars.githubusercontent.com/u/123509083?s=400&u=06ebbd267c34d61e4f109e2ba503875473cb101c&v=4', // Set the webhook avatar URL here
        embeds: [
            {
                title: '📬 New Contact Form Submission',
                description: 'You have received a new message through the contact form on your website.',
                color: 7506394, // You can change this color code as per your preference
                thumbnail: {
                    url: 'https://media.tenor.com/ju5hhb03JgIAAAAC/dark.gif' // Replace with your thumbnail image URL
                },
                fields: [
                    {
                        name: '📝 Name',
                        value: name,
                        inline: true
                    },
                    {
                        name: '📧 Email',
                        value: email,
                        inline: true
                    },
                    {
                        name: '💬 Message',
                        value: message,
                        inline: false
                    }
                ],
                footer: {
                    text: 'Contact Form Notification',
                    icon_url: 'https://avatars.githubusercontent.com/u/123509083?s=400&u=06ebbd267c34d61e4f109e2ba503875473cb101c&v=4' // Replace with your footer icon URL
                },
                timestamp: new Date()
            }
        ]
    };

    try {
        const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            res.status(200).send('Message sent successfully!');
        } else {
            res.status(500).send('Error sending message.');
        }
    } catch (error) {
        res.status(500).send('Error sending message.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
