import React from 'react';
import Debits from './Debits';
import Credits from './Credits';
class AccountBalance extends React.Component{


    render () {
            let balance = this.props.accountBalance
            let debit = this.props.debit
            let credit = this.props.credit
          
        return (
                <div>
                    
                    Balance:  ${Math.round(balance  + credit  - debit)}
                
                </div>
            )
    }
  
}
export default AccountBalance;
