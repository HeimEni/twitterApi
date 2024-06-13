const {MongoClient, ServerApiVersion} = require('mongodb');
const {log} = require("debug");
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function createTweet(text, user_id) {
    try {
        await client.connect();
        return await client.db("twitter2").collection("tweet").insertOne(
            {
                "text": text,
                "user_id": user_id,
                "is_reply": false,
                "reply_to_tweet_id": null,
                "created_at": "2024-06-13T12:00:00Z",
                "nb_like": 0,
                "nb_retweet": 0,
                "nb_reply": 0
            }
        )
            ;
    } finally {
        await client.close();
    }
}

async function getAllUsers() {
    try {
        await client.connect();
        return await client.db("twitter2").collection("user").find().toArray();
    } finally {
        await client.close();
    }
}

async function haveLike(id) {
    try {
        // await client.connect();
        // let array = await client.db("twitter").collection("tweet").find({tweet_id: id}).toArray();
        // console.log(array.forEach((elem) => {
        //     console.log(elem.likes)
        // }))
        // array.likes.forEach((element) => {
        //     console.log(element)
        //     if(element.includes(id)){
        //         return true;
        //     }
        // })
        return false

    } finally {
        // await client.close();
    }
}

async function getAllReplyByTweetId(id) {
    try {
        await client.connect();
        return await client.db("twitter").collection("reply").find({tweet_id: id}).toArray();
    } finally {
        await client.close();
    }
}

async function getTweetById(id) {
    try {
        await client.connect();
        return await client.db("twitter2").collection("tweet").find({_id: id}).toArray();
    } finally {
        await client.close();
    }
}

async function getUserById(id) {
    try {
        await client.connect();
        return await client.db("twitter2").collection("user").find({_id: id}).toArray();
    } finally {
        await client.close();
    }
}

async function getAllTweet() {
    try {
        await client.connect();
        return await client.db("twitter2").collection("tweet").find().toArray();
    } finally {
        await client.close();
    }
}

async function getAllLikeByTweetId(id) {
    try {
        await client.connect();
        return await client.db("twitter2").collection("like").find({id_tweet: id}).toArray();
    } finally {
        await client.close();
    }
}

async function getAllTweetByUserId(id) {
    try {
        await client.connect();
        return await client.db("twitter2").collection("tweet").find({user_id: id}).toArray();
    } finally {
        await client.close();
    }
}

async function getAllRetweetByTweetId(id) {
    try {
        await client.connect();
        return await client.db("twitter2").collection("retweet").find({id_tweet: id}).toArray();
    } finally {
        await client.close();
    }
}

async function createLike(tweet_id, user_id) {
    try {
        await client.connect();
        client.db("twitter2").collection("tweet").updateOne(
            {"tweet_id": tweet_id},
            {$inc: { nb_like: +1 }})
        return await client.db("twitter2").collection("like").insertOne({
                likes: {
                    id_user: user_id,
                    id_tweet: tweet_id,

                }
            }
        ).catch(log);
    } finally {
        await client.close();
    }
}

async function reply(text, tweet_id) {
    try {
        await client.connect();
        return await client.db("twitter2").collection("tweet").insertOne({
                    "text": text,
                    "user_id": localStorage.getItem("user").at(0),
                    "is_reply": true,
                    "reply_to_tweet_id": tweet_id,
                    "created_at": Date.now(),
            }
        ).catch(log);
    } finally {
        await client.close();
    }
}

async function retweet(tweet_id) {
    try {
        await client.connect();
        return await client.db("twitter2").collection("retweet").insertOne(
            {
                        id_user: localStorage.getItem("user"),
                        tweet_id: tweet_id,
                        created_at: new Date()
            }
        ).catch(log);
    } finally {
        await client.close();
    }
}

module.exports = {
    createTweet,
    reply,
    retweet,
    getAllTweetByUserId,
    getAllLikeByTweetId,
    getAllTweet,
    getAllUsers,
    getTweetById,
    getUserById,
    getAllReplyByTweetId,
    createLike,
    haveLike
};