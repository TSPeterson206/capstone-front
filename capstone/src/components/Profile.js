import React, { Component } from 'react'
import Tracker from './Tracker'
import Providers from './ProvidersSUD'
import axios from 'axios'
import ProvidersMedical from './ProvidersMedical';
import ProvidersFinancial from './ProvidersFinancial';
import ProvidersLegal from './ProvidersLegal';
import ProvidersSUD from './ProvidersSUD'
import ProvidersMH from './ProvidersMH'
import { Link } from 'react-router-dom'
import SearchedProviders from './SearchedProviders';


export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      providers:[],
      type:''
    }
  }

  componentDidMount() {
    this.getAccount();
  }

  getAccount = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users`)
      const user = await response.data.filter(user => user.username === this.props.match.params.username)
      this.setState({ user: [...user] })
    } catch (err) {
      console.log(err)
    }
    console.log(this.state.user)
  }

  getProvidersByType = async (type) =>{
     try {

      const found = await axios.get('http://localhost:8000/providers')
      const filtered =  await found.data.filter(ele => ele.typeID === type)
      console.log(filtered)
      this.setState({
        providers:filtered,
          type:type
      })
    }
    catch (err) {
      console.log(err)
     }
    }

  render() {
    return (
<div>
  {this.state.user.map(user =>
    <Tracker 
    key={user.id}
    id={user.id}
    tagline={user.tagline}
    profilepic={user.profilepic}
    />
  )}

  <div className="container">
  <div className="row">
  <div className="col-md-8">
  <div>
<button onClick={()=>{this.getProvidersByType(1)}} name="SUD" type="1">Substance Use Disorders</button>
<button onClick={()=>{this.getProvidersByType(5)}} name="MH" type="2">Mental Health</button>
<button onClick={()=>{this.getProvidersByType(2)}} name="Medical" type="3">Medical</button>
<button onClick={()=>{this.getProvidersByType(3)}} name="Legal" type="4">Legal</button>
<button onClick={()=>{this.getProvidersByType(4)}} name="Financial" type="5">Financial</button>

{this.state.type ? this.state.providers.map(ele => 
<SearchedProviders
id={ele.id}
businessphoto={ele.businessphoto}
companyname={ele.companyname}
address={ele.address}
phone={ele.phone}
providerbio={ele.providerbio}
/>) : null} 
</div>
</div>
<div className="col-md-4">
<p>REVIEWS SECTION</p>
</div>
</div>
</div>
</div>
)
}
}