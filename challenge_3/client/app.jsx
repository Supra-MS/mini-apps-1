class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'cart',
      fname: '',
      lname: '',
      email: '',
      password: '',
      address1: '',
      address2: '',
      city: '',
      zip: '',
      tel: '',
      ccName: '',
      ccNum: '',
      exp: '',
      cvv: '',
      billZip: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.postAuthUser = this.postAuthUser.bind(this);
    this.postUserDetails = this.postUserDetails.bind(this);
    this.postBillingInformation = this.postBillingInformation.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  fetchCartHomePage() {
    fetch('/', {
      method: 'GET'
    })
  }

  postAuthUser() {
    fetch('/authUser', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: this.state.fname,
        lastname: this.state.lname,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => {
        console.log('Response: ', response);
      })
      .catch(error => {
        console.log('Error posting the auth details of user: ', error);
      })
  }

  postUserDetails() {
    fetch('/userData', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        zip: this.state.zip,
        mobile: this.state.tel
      })

    })
      .then(response => {
        console.log('Response: ', response);
      })
      .catch(error => {
        console.log('Error posting the user pii: ', error);
      })
  }

  postBillingInformation() {
    fetch('/billInfo', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardHolderName: this.state.ccName,
        cardNumber: this.state.ccNum,
        expiry: this.state.exp,
        cvv: this.state.cvv,
        billZip: this.state.billZip
      })

    })
      .then(Response => {
        console.log('Response: ', Response);
      })
      .catch(error => {
        console.log('Error posting the user payment details: ', error);
      })
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  nextPage(nextPage) {
    console.log('State: ', this.state.page);
    this.setState(prevState => {
      console.log('Previous state: ', prevState);
      return {
        page: nextPage
      }
    })
  }

  prevPage(prevPage) {
    this.setState(prev => {
      return {
        page: prevPage
      }
    })
  }

  render() {
    if (this.state.page === 'cart') {
      return <CartPage nextPage={this.nextPage} />
    }
    if (this.state.page === 'authUser') {
      return <AuthenticateUser prevPage={this.prevPage} nextPage={this.nextPage} postAuth={this.postAuthUser} value={this.state} inputChange={this.handleInputChange} />
    }
    if (this.state.page === 'userData') {
      return <UserPiiData prevPage={this.prevPage} nextPage={this.nextPage} value={this.state} postUserInfo={this.postUserDetails} inputChange={this.handleInputChange} />
    }
    if (this.state.page === 'billingInfo') {
      return <BillingInformation prevPage={this.prevPage} nextPage={this.nextPage} value={this.state} postPayment={this.postBillingInformation} inputChange={this.handleInputChange} />
    }
    if (this.state.page === 'review') {
      return <ReviewPage prevPage={this.prevPage} nextPage={this.nextPage} summary={this.state} />
    }
    if (this.state.page === 'confirmation') {
      return <ConfirmationPage nextPage={this.nextPage} />
    }

  }

} /* end of class */

function CartPage(props) {
  console.log('Props in cartPage: ', props);
  return (
    <div className="jumbotron text-center">
      <h4 className="display-5">Your Cart</h4>
      <button className="btn btn-lg btn-warning" type="submit"
        onClick={(e) => {
          props.nextPage('authUser');
        }}
      >Proceed To CheckOut
      </button>
    </div>
  )
}

function AuthenticateUser(props) {
  return (
    <div className="jumbotron">
      <form className="authUser" onSubmit={(e) => {
          e.preventDefault();
            props.postAuth();
            props.nextPage('userData');
      }}>
        <div className="form-group">
          <label>First Name :</label>
          <input className="form-control" type="text" name="fname" value={props.value.fname} placeholder="Joe *" onChange={(e) => props.inputChange(e)} required />
        </div>
        <div className="form-group">
          <label>Last Name :</label>
          <input className="form-control" type="text" name="lname" value={props.value.lname} placeholder="Smith *" onChange={(e) => props.inputChange(e)} required />
        </div>
        <div className="form-group">
          <label>Email :</label>
          <input className="form-control" type="email" name="email" value={props.value.email} placeholder="joe@gmail.com *" onChange={(e) => props.inputChange(e)} required />
        </div>
        <div className="form-group">
          <label>Password :</label>
          <input className="form-control" type="password" name="password" value={props.value.password} placeholder="" onChange={(e) => props.inputChange(e)} required />
        </div>
        <button className="btn btn-danger" onClick={() => props.prevPage('cart')} >Back</button>
        <button className="btn btn-primary" type="submit">Next</button>
      </form>
    </div>
  )
}

function UserPiiData(props) {
  return (
    <div className="jumbotron">
      <p className="lead">User Details</p>
      <form className="userData" onSubmit={(e) => {
            e.preventDefault();
            props.postUserInfo();
            props.nextPage('billingInfo');
          }}>
        <div className="form-group">
          <label>Address 1 :</label>
          <input className="form-control" name="address1" value={props.value.address1} type="text" onChange={(e) => props.inputChange(e)} placeholder="Street address.. *" required />
        </div>
        <div className="form-group">
          <label>Address 2 :</label>
          <input className="form-control" name="address2" value={props.value.address2} type="text" onChange={(e) => props.inputChange(e)} placeholder="Apt, bldg.. " />
        </div>
        <div className="form-group">
          <label>City :</label>
          <input className="form-control" name="city" value={props.value.city} type="text" onChange={(e) => props.inputChange(e)} required />
        </div>
        <div className="form-inline">
          <div className="form-group">
            <label>Zip Code :</label>
            <input style={{ width: '140px', marginLeft: '10px' }} name="zip" value={props.value.zip} className="form-control" type="number" onChange={(e) => props.inputChange(e)} required />
          </div>
          <div className="form-group">
            <label style={{ marginLeft: '7px' }}>State :</label>
            <select className="form-control" readOnly>
              <option>AZ</option>
              <option>CA</option>
              <option>CO</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label style={{ marginTop: '15px' }}>Mobile :</label>
          <input className="form-control" name="tel" value={props.value.tel} type="tel" onChange={(e) => props.inputChange(e)} />
        </div>
        <button className="btn btn-danger" onClick={() => props.prevPage('authUser')} >Back</button>
        <button className="btn btn-primary" type="submit">Next</button>
      </form>
    </div>
  )
}

function BillingInformation(props) {
  return (
    <div className="jumbotron">
      <p className="lead">Payment Method :</p>
      <form className="billinginfo" onSubmit={(e) => {
            e.preventDefault();
            props.postPayment();
            props.nextPage('review');
          }}>
        <div className="form-group">
          <div className="form-check form-inline">
            <input className="radiobtn form-check-input" type="radio" defaultChecked />
            <label className="form-check-label">Credit</label>
          </div>
          <br></br>
          <div className="form-group">
            <label>Card Holder Name :</label>
            <input className="form-control" name="ccName" value={props.value.ccName} type="text" onChange={(e) => props.inputChange(e)} />
          </div>
          <div className="form-group">
            <label>Card Number :</label>
            <input className="form-control" name="ccNum" value={props.value.ccNum} type="number" placeholder="4444-4444-4444-4444" onChange={(e) => props.inputChange(e)} required />
          </div>
          <div className="form-row">
            <div className="form-group-sm col-md-5">
              <label>Expiry Date :</label>
              <input className="form-control" name="exp" value={props.value.exp} type="month" onChange={(e) => props.inputChange(e)} required />
            </div>
            <div className="form-group col-md-5">
              <label>Security Code :</label>
              <input className="form-control" name="cvv" value={props.value.cvv} type="number" placeholder="CVV" onChange={(e) => props.inputChange(e)} required />
            </div>
          </div>
          <div className="form-group">
            <label>Billing Zip Code :</label>
            <input style={{ width: '180px' }} name="billZip" value={props.value.billZip} className="form-control" type="number" onChange={(e) => props.inputChange(e)} required />
          </div>
        </div>
        <button className="btn btn-danger" onClick={() => props.prevPage('userData')} >Back</button>
        <button className="btn btn-primary" type="submit">Next</button>
      </form>
    </div>
  )
}

function ReviewPage(props) {
  const ccLast4Digits = props.summary.ccNum.split('').slice(-4).join('');
  console.log('CC 4: ', ccLast4Digits)
  return (
    <div className="jumbotron text-center">
        <h4 className="display-5">Please Review Your Details Below :</h4>
      <div style={{textAlign: 'left', margin: '30px'}}>
          <h5 className="display-5" style={{textDecoration: 'underline'}}>User PII Data</h5>
          <h6>First Name: {props.summary.fname}</h6>
          <h6>Last Name: {props.summary.lname}</h6>
          <h6>Email: {props.summary.email}</h6>
          <h6>Address 1: {props.summary.address1}</h6>
          <h6>Address 2: {props.summary.address2}</h6>
          <h6>City: {props.summary.city}</h6>
          <h6>Zip: {props.summary.zip}</h6>
          <br></br>
          <h5 className="display-5" style={{textDecoration: 'underline'}}>User Payment Details</h5>
          <h6>Card Number (last 4 digits): {ccLast4Digits}</h6>
          <h6>Expiry Date: {props.summary.exp}</h6>
          <h6>Billing Zip: {props.summary.billZip}</h6>
      </div>
      <div className="form-group">
          <div className="form-check form-inline">
            <input className="agreeradiobtn form-check-input" type="radio" defaultChecked />
            <label style={{fontSize: '20px'}} className="form-check-label">Agree To Terms & Conditions</label>
          </div>
          <div className="form-check form-inline">
          <input className="checkbtn form-check-input" type="checkbox" defaultChecked />
            <label style={{fontSize: '20px'}} className="form-check-label">Subscribe to our news letters</label>
          </div>

      </div>
      <button className="btn btn-lg btn-danger" onClick={() => props.prevPage('billingInfo')}>Back</button>
      <button className="btn btn-lg btn-warning" type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.nextPage('confirmation');
        }}
      >Purchase</button>
    </div>
  )
}

function ConfirmationPage(props) {
  return (
    <div className="jumbotron text-center">
      <h5 className="display-5">Congratulations! Your Order has been placed successfully</h5>
      <button className="btn btn-lg btn-warning"
        onClick={(e) => {
          props.nextPage('cart');
        }}
      >Continue Shopping</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

