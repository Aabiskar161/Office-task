
import './App.css';
import { useState } from "react";
import Axios from "axios";



function App() {

  const[stockname, setStockname]= useState("");
  const[transactiontype, setTransactiontype]= useState("");
  const[quantity, setQuantity]= useState(0); 
  const[amount, setAmount]= useState(0);
  const[transactiondate, setTransactiondate]= useState(0);

  const [stockList, setStockList] = useState([]); 

 
  
  const addStock= () => { 
   Axios.post("http://localhost:3001/create", {
       stockname: stockname,
       transactiontype: transactiontype,
       quantity: quantity,
       amount: amount,
       transactiondate: transactiondate,
     }) .then(() => {
       console.log("success");
     });  

  };


  const getStocks = () => {
    Axios.get("http://localhost:3001/stocks").then((response) => {
       setStockList(response.data);
     });  
  };
       
  

  return (
    <div className="App">
      <pre> <b> <h1> Portfolio Management  </h1> </b> </pre>


      <div className= "information">

      <label> Stockname: </label>
      <input type= "text" onChange= {(event) => {setStockname(event.target.value);}}/>

      <label>Transaction type: </label>
      <input type= "text" onChange= {(event) => {setTransactiontype(event.target.value);}} />

      <label> Quantity: </label>
      <input type= "number" onChange= {(event) => {setQuantity(event.target.value);}}/>

      <label> Amount: </label>
      <input type= "number" onChange= {(event) => {setAmount(event.target.value);}} />

      <label> Transaction date: </label>
      <input type= "date" onChange= {(event) => {setTransactiondate(event.target.value);}} />

       <button onClick={addStock}> Add Stock </button>
       </div>
       
       <div className="stocks ">
       <button onClick={getStocks}>Show stock</button>

       {stockList.map((val, key) => { 
         return(
         <div className="stock">
           <h3> Stockname: {val.stockname} </h3>
           <h3> Transaction type: {val.transactiontype} </h3>
           <h3> Quantity: {val.quantity} </h3>
           <h3> Amount: {val.amount} </h3>
           <h3> Transaction date: {val.transactiondate} </h3>
           </div>
         );


         })}

       
</div>
    
    </div>
    
  );
}

export default App;
