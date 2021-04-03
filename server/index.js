const express= require("express");
const app= express();
const mysql= require("mysql");
const cors= require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

    user: "root",
    host: "localhost",
    password: "password",
    database: "stocksys", 
});

app.post("/create", (req, res) => {

    const stockname= req.body.stockname;
    const transactiontype= req.body.transactiontype;
    const quantity= req.body.quantity;
    const amount= req.body.amount ;
    const transactiondate= req.body.transactiondate;



 db.query(
    "INSERT INTO stocks (stockname, transactiontype, quantity, amount, transactiondate) VALUES (?,?,?,?,?)", 
        [stockname, transactiontype, quantity, amount, transactiondate], 
        (err, result) => {
            if(err) {
                console.log(err);
            }else{
                res.send("Values inserted");
            }
        } 
    );
});

app.get("/stocks", (req, res) => {

    db.query("SELECT * FROM stocks", (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
     });
    
});

   
   


app.listen(3001, () => {console.log("Yes, your server is running in port 3001");});