const { MongoClient } = require("mongodb");

const CONNECTION_STRING = process.env.MONGO_URL || "mongodb://localhost:27017";

const client = new MongoClient(CONNECTION_STRING);

class Base extends MongoClient {
  constructor(connectionString, type) {
    // ideally connectTimeoutMS should be much larger value
    super(connectionString, { connectTimeoutMS: 3000 });
    this._db = this.db("addressbook");
    this.connect()
      .then(() => {
        this.col = this._db.collection(type);
      })
      .catch((err) => {
        console.error(err);
        process.abort();
      });
  }
}

process.on("exit", client.close.bind(client));

module.exports = {
  Base,
  CONNECTION_STRING,
};
