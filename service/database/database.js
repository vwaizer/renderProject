import { MongoClient } from "mongodb";
import { config } from "dotenv";
import process from "process";
config();

// Replace the uri string with your connection string.
const pass = process.env.PASS;
const user = process.env.USER;
const uri = `mongodb+srv://${user}:${pass}@cluster0.bgfip35.mongodb.net`;
class DataBaseService {
  constructor() {
     this.client = new MongoClient(uri);
    this.db=this.client.db(process.env.DATANAME)
  }
    run() {
    try {
           this.client.connect();
    //   const users = database.collection("user");
    //   const query = { title: "Back to the Future" };
    //   const movie = await users.findOne(query);
        
    } catch(error) {
      // Ensures that the client will close when you finish/error
      console.log("error",error);
    }
  }
   users(){
    return this.db.collection("user");
  }
}

// async function run() {
//   try {
//     const database = client.db(process.env.DATANAME);
//     const user = database.collection('user');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
export const databaseUnit=new DataBaseService();

// run().catch(console.dir);
