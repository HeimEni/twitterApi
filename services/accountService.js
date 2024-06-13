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

async function login(username, password) {
    try {
        await client.connect();
        return await client.db("twitter2").collection("user").findOne({
            "username": username,
        });
    } finally {
        await client.close();
    }
}

async function register(username, password) {
    try {
        await client.connect();
        await client.db("twitter2").collection("user").insertOne({
            "username": username,
            "password": password,
            "bio": "This is a sample bio.",
            "followers": [],
            "follows": [],
            "created_at": null

        });
        return await client.db("twitter2").collection("user").findOne({"username": username})
    } finally {
        await client.close();
    }
}

module.exports = {
    login,
    register
}
