import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [{   
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
}];

const tweets = [{   
    username: "bobesponja",
    tweet: "eu amo o hub"
}];

app.post('/sign-up', (req, res) => {
    users.push(req.body);
    res.send('OK');
});

app.post('/tweets', (req, res) => {
    tweets.push(req.body);
    res.send('OK');
});

app.get('/tweets', (req, res) => {
    let last10 = getTweets(0,9);
    last10 = last10.map(addAvatar);
    res.send(last10);
});

function getTweets(from, to) {
    const arr = tweets.filter((value, index) => index <= tweets.length-from && index >= tweets.length-from-to);
    return arr
};

function addAvatar(value) {
    const user = users.find(element => element.username === value.username);
    value.avatar = user.avatar;
    return value
};

app.listen('5000', () => console.log('Listening on 5000'));