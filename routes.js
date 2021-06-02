
const mongoDbConnection = require('./mongoDbConnection');

const appRouter = function (app) {

    app.post('/insertproduct', (req, res, next) => {

        let product = req.body;
        console.log("Product is :: " + JSON.stringify(product));
        if(false){
            res.status('400').send({
                message: "Bad Request. Please check if all fields are entered."
            });
        } else {
            mongoDbConnection.insertProduct(product).then((result)=>{
                res.status('200').json({
                    message : "Product Inserted",
                    product : product
                });
            }).catch((err)=>{
                console.log("Error while post : " + err);
                res.status('500').send({
                    message: "Internal Server Error"
                });

            });
        }

    });

    app.get('/getproducts' , (req,res,next) => {
        mongoDbConnection.getAllProducts().then((result)=>{
            res.status('200').json(result);
        }).catch((err)=>{
            res.status('500').send({
                message: "Internal Server Error"
            });
        })
    });

    app.delete('/deleteproduct' , (req,res,next) => {
        let product = req.body;
        mongoDbConnection.deleteProduct(product).then((result)=>{
            res.status('200').json(result);
        }).catch((err)=>{
            res.status('500').send({
                message: "Internal Server Error : " + err
            });
        })
    });

}



module.exports = appRouter;
