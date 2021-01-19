
import './App.css';
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './component/Home'
import AccountBalance from './component/AccountBalance';
import UserProfile from './component/UserProfile'
import Login from './component/Login'
import Debits from './component/Debits';
import Credits from './component/Credits';
import axios from 'axios'
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      totaldebit :0,
      totalcredit :0,
      accountBalance: 0,
      creditData : [],
      debitData : [],
      message: " ", 
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
       
        
        
      }
    }
  }
  componentDidMount() {

    axios.get(`https://moj-api.herokuapp.com/debits`)
    .then(({ data }) => {
      
      let sum = 0;
      if (typeof data == 'object'){
        data.forEach(amt => {
          sum += parseFloat(amt.amount);
        })
      }

      this.setState({
        totaldebit : sum,
      })
      
      
      
      
    }).catch (() => console.log("error"))

    axios.get(`https://moj-api.herokuapp.com/credits`)
    .then(({ data }) => {
    
    let sum = 0;
    if (typeof data == 'object'){
        data.forEach(amt => {
            sum += parseFloat(amt.amount);
        })
    }
   
  
        this.setState({
            totalcredit : sum,
           
        })
        
       
    }).catch (() => console.log("error"))
    axios.get(`https://moj-api.herokuapp.com/credits`) 
    //   .then  (data => console.log(data.data))
    .then(result => {this.setState({creditData: result.data});
    })
    .catch (() => console.log("error"))
    axios.get(`https://moj-api.herokuapp.com/debits`) 
    //   .then  (data => console.log(data.data))
    .then(result => {this.setState({debitData: result.data});
    })
    .catch (() => console.log("error"))


  }
  
  
  
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  setTotalDebit =(num)  =>{
    this.setState({
        totaldebit: num

    })
  }
 
  onSubmit= (e) =>{
    this.setState({ accountBalance: this.state.totalcredit - this.state.totaldebit})
    console.log("account" ,this.state.accountBalance)
    console.log(this.state.totalcredit)
    console.log(this.state.totaldebit)
   
    e.preventDefault();
    if (this.state.accountBalance <0 ){
      console.log(this.state.accountBalance)
      this.setState({message: "Negative Balance"})
    }
    let valDes = e.target.Description.value
    let valAmt = e.target.Amount.value
    let newarray = this.state.debitData;
    let newObj = { 
        date: "2017-11-28349: 23.54.930Z",
        description: valDes, 
        amount : valAmt, 
    }
    newarray.push(newObj)
    this.setState({ debitData: newarray})

   
    let amount = parseFloat(valAmt)
    

    //change state of the totaldebit 
    this.setState((prevState) => {
        return {
           totaldebit: prevState.totaldebit + amount,
           accountBalance: prevState.accountBalance - amount,
           totalcredit: prevState.totalcredit + amount
        }
    });
}
  render() { 
      
    const HomeComponent = () => (
      <Home 
         accountBalance={this.state.accountBalance}
         
      />);
    const UserProfileComponent = () => (
        <UserProfile 
          userName={this.state.currentUser.userName} 
          memberSince={this.state.currentUser.memberSince} 
        />
    );
    const DebitComponent  = () => (
      <Debits
      accountBalance ={this.state.accountBalance}
      totaldebit = {this.state.totaldebit}
      setTotalDebit = {this.setTotalDebit}
      totalcredit = {this.state.totalcredit}
      onSubmit = {this.onSubmit}
      debitData = {this.state.debitData}
      checkBalance = {this.checkBalance}
      message = {this.state.message}
      />
    );
    const CreditComponent  = () => (
      <Credits
      accountBalance ={this.state.accountBalance}
      totalcredit = {this.state.totalcredit}
      totaldebit = {this.state.totaldebit}
      onSubmit = {this.onSubmit}
      creditData = {this.state.creditData}
      checkBalance = {this.checkBalance}
      message = {this.state.message}
      />
    );
   
    const LogInComponent = () => (<Login user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    return (
      <div className = "App">
       
      <Router>
          <Switch>
            <Route exact path="/" render = {HomeComponent}/>
            <Route exact path="/Credits" render = {CreditComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/Debits" render = {DebitComponent}/>
            <Route exact path = "/login" render={LogInComponent}/>
          </Switch>
        </Router>
    
      </div>
    );
  }
  
}

export default App;
