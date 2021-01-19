import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '.././App.css'
import Home from './Home'
import AccountBalance from './AccountBalance';
class Debits extends Component {


    render(){
        
          return (
              
             <div>
                
               <h2>Debits Page</h2>
               <Link to = "/" >
                Home Baby
                </Link>
                
                {this.props.debitData.map(item => {
                  
                return(
                    <div className ="debit-text">
                     <p>Date: {item.date}</p>
                     <p>Description: {item.description}</p>
                     <p>Amount: {item.amount} </p>
                  
                    </div>
                );
                })}
                <div className ="totaldebit-text">
                <AccountBalance
                

                debit = {this.props.totaldebit}
                credit = {this.props.totalcredit}
                accountBalance={this.props.accountBalance }
                
                />
                
                Total Debits: ${Math.round(this.props.totaldebit)}

                
                  
                </div>
                <form className ="form" onSubmit ={this.props.onSubmit} >
                    <label for = "a">Description: </label><br>
                    </br>
                    <input 
                    type = "text" 
                    name = "Description" 
      
     
                    /> <br></br>
                    <label for = "b">Amount: </label><br>
                    </br>
                    <input 
                    type = "text"
                    name = "Amount" 
           
                  
                    />
                    <br></br><br></br>
                    <button type = "submit" value = "submit" >Add Debit</button>
                </form>
                

           
                

             </div>
             
            );
    }
}
export default Debits;
  /*
  Make debit page 
  link home page to debit page 
  title of debits 
  fetch the api of debits
  get specific items within that api 

  link about balance props to display on debits 
  


  */