const {MongoClient} = require('mongodb');
async function main() {
  const uri = "mongodb+srv://<username>:<password>@<clusterurl>/test?retryWrites=true&w=majority";
  
  //instance create of Mongo Client
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connection connected...');

    // Make the appropriate DB calls
    // await  listDatabases(client);
    // await addFruit(client,{
    //   name:"Apple",
    //   score:8,
    //   review:"Great Fruit"
    // })
     
    await addFruits(client,[
      {
        name:"Orange",
        score:6,
        review:"Kinda Sour"
      },
      {
        name: "Banana",
        score: 9,
        review: "Great stuff!"
      }
    ])

    // await findFruits(client,"Apple");
    await findFruits(client);
    

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main().catch(console.error);

async function findFruits(client){
  const result = await client.db("fruitsDB").collection("fruits").find().toArray();
  if(result){
    // console.log(`Found a fruit in collection with name ${nameOfFruit}`);
    console.log("Found the following fruits");
    console.log(result)
  }else{
    console.log(`No listing found with name '${nameOfFruit}'`)
  }
}
async function addFruits(client,newFruitsArray){
  const result = await client.db("fruitsDB").collection("fruits").insertMany(newFruitsArray);
  console.log(`${result.insertedCount} listing(s) created with the following ID(s):`);
  console.log(`${result.insertedIds}`);
}

async function addFruit(client,newFruit){
  const result = await client.db("fruitsDB").collection("fruits").insertOne(newFruit);
  console.log(`New Listing created with this following id:${result.insertedId}`)
}

async function listDatabases(client){
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db=>{
  console.log('-$(db.name)');
  })
}

