const { MongoClient } = require('mongodb');

module.exports.db = () =>  {
    return new Promise(async (resolve,reject) =>{
        try {
          console.log("START Database creation");
          const url = 'mongodb://localhost:27017';
          const client = new MongoClient(url, { "minPoolSize": 5});
          await client.connect();
          const db = client.db("StudentManagement");
          console.log("END Database creation");
          resolve(db);

        } catch (error) {
            console.log(`Error occurred in connecting to database ${error.message}`);
            reject(error);
        }
    })
}

// const collection = client.db().collection('studentManagement');

// try {
//   await collection.insertOne({ _id: 1 });
//   await collection.insertOne({ _id: 1 }); // duplicate key error
// } catch (error) {
//   if (error instanceof MongoServerError) {
//     console.log(`Error worth logging: ${error}`); // special case for some reason
//   }
//   throw error; // still want to crash
// }