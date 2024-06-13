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

async function getAllUsers() {
    try {
        await client.connect();
        return await client.db("twitter").collection("user").find().toArray();
    } finally {
        await client.close();
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
        return await client.db("twitter").collection("tweet").find({_id: id}).toArray();
    } finally {
        await client.close();
    }
}

async function getUserById(id) {
    try {
        await client.connect();
        return await client.db("twitter").collection("user").find({_id: id}).toArray();
    } finally {
        await client.close();
    }
}

async function getAllTweet() {
    try {
        await client.connect();
        return await client.db("twitter").collection("tweet").find().toArray();
    } finally {
        await client.close();
    }
}

async function getAllLikeByTweetId(id) {
    try {
        await client.connect();
        return await client.db("twitter").collection("like").find({tweet_id: id}).toArray();
    } finally {
        await client.close();
    }
}

async function getAllTweetByUserId(id) {
    try {
        await client.connect();
        return await client.db("twitter").collection("tweet").find({user_id: id}).toArray();
    } finally {
        await client.close();
    }
}

async function getAllRetweetByTweetId(id) {
    try {
        await client.connect();
        return await client.db("twitter").collection("retweet").find({tweet_id: id}).toArray();
    } finally {
        await client.close();
    }
}

async function createLike(tweet_id, user_id) {
    try {
        await client.connect();
        return await client.db("twitter").collection("tweet").updateOne({_id: tweet_id}, {
                $push: {
                    likes: {
                        user_id: user_id,
                        tweet_id: tweet_id,
                        created_at: new Date()
                    }
                }
            }
        ).catch(log);
    } finally {
        await client.close();
    }
}
async function createShare(tweet_id, user_id) {
    try {
        await client.connect();
        return await client.db("twitter").collection("tweet").updateOne({_id: tweet_id}, {
                $push: {
                    retweets: {
                        user_id: user_id,
                        tweet_id: tweet_id,
                        created_at: new Date()
                    }
                }
            }
        ).catch(log);
    } finally {
        await client.close();
    }
}

async function reply(tweet_id, user_id, comment) {
    try {
        await client.connect();
        return await client.db("twitter").collection("tweet").updateOne({_id: tweet_id}, {
                $push: {
                    replies: {
                        user_id: user_id,
                        tweet_id: tweet_id,
                        created_at: new Date(),
                        text: comment
                    }
                }
            }
        ).catch(log);
    } finally {
        await client.close();
    }
}

module.exports = {
    reply,
    createShare,
    getAllTweetByUserId,
    getAllLikeByTweetId,
    getAllTweet,
    getAllUsers,
    getTweetById,
    getUserById,
    getAllReplyByTweetId,
    createLike
};