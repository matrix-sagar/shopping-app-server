const MongoClient = require('mongodb').MongoClient;
var dbName = "ShoppingApp";
var collectionName = "productslist";

const MongoConnection = function(){
    var uri = "mongodb://sagar:xoOWUMq2r9MmPgvP@cluster0-shard-00-00.6i8oj.mongodb.net:27017,cluster0-shard-00-01.6i8oj.mongodb.net:27017,cluster0-shard-00-02.6i8oj.mongodb.net:27017/ShoppingApp?ssl=true&replicaSet=atlas-wf384y-shard-0&authSource=admin&retryWrites=true&w=majority";


    function getAllProducts() {

        return new Promise((res,rej)=>{
            // Get the documents collection
            var client = new MongoClient(uri);
            client.connect(err => {
                if(err){
                    rej(err);
                    return;
                }
                const db = client.db(dbName);
                const collection = db.collection(collectionName);

                collection.find({}).toArray(function(err, docs) {
                    //assert.equal(err, null);
                    if(err){
                    console.log("Error occured while fetching products.");
                    rej(err);           
                    return;
                }
                    console.log('Found the following records');
                    console.log(docs);
                    client.close();
                    res(docs)
                    //callback(docs);
                });
            })

        })

    }

    function insertProduct(data) {

        return new Promise((res,rej)=>{
            // Get the documents collection
            var client = new MongoClient(uri);
            client.connect(err => {
                if(err){
                    rej(err);
                    return;
                }

                const db = client.db(dbName);
                const collection = db.collection(collectionName);
                // Insert some documents
                collection.insertOne(data, function(err, result) {
                    console.log('Inserted documents into the collection');
                    if(err){
                        console.log("Error while post :: " + err);
                        rej(err);
                    }
                    client.close();
                    res();
                });

            })

        })

    }

    function deleteProduct(data) {
        return new Promise((res,rej)=>{
            console.log("Delete method called.");
            var client = new MongoClient(uri);
            client.connect(err => {
                if (err) {
                    console.log("Delete method error connection.");
                    rej(err);
                    return;
                }
                console.log("Delete method connected");
                const db = client.db(dbName);
                const collection = db.collection(collectionName);

                collection.deleteOne(data, function(err, result) {
                    if (err) {
                        console.log('Error while deleting ::  ' + JSON.stringify(err));
                        client.close();
                        rej(err);
                    }
                    
                    client.close();
                    res();
                    

                });
            });
        })
    }

    return {
        getAllProducts : getAllProducts,
        insertProduct : insertProduct,
        deleteProduct : deleteProduct
    }
}

module.exports = new MongoConnection();
