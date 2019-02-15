import React, { Component } from 'react'
import Tracker from './Tracker'
import axios from 'axios'
import SearchedProviders from './SearchedProviders'
import Collapsible from 'react-collapsible';
import {CollapsibleComponent, CollapsibleHead, CollapsibleContent} from 'react-collapsible-component'

import ProviderProfile from './ProviderProfile'


export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      providers:[],
      type:'',
      selectedProviderID:''
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
      // const reviews = await axios.get(`http://localhost:8000/reviews/providers/${id}`)
      // console.log(reviews.data)
      this.setState({
        providers:filtered,
          type:type
      })
    }
    catch (err) {
      console.log(err)
     }
    }
    
getAverage = async(id) =>{
await axios.get(`http://localhost:8000/reviews/providers/${id}`)
      .then((result)=>{
      const ratings = result.data.map(ele=> {return ele.rating}).reduce((a,b)=>a+b)
      const average = ratings/result.data.length
      console.log(average)
      return average
      }
      )
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
      <div className="col-12">
        <div>
          <button onClick={()=>{this.getProvidersByType(1)}} name="SUD" type="1">Substance Use Disorders</button>
          <button onClick={()=>{this.getProvidersByType(5)}} name="MH" type="2">Mental Health</button>
          <button onClick={()=>{this.getProvidersByType(2)}} name="Medical" type="3">Medical</button>
          <button onClick={()=>{this.getProvidersByType(3)}} name="Legal" type="4">Legal</button>
          <button onClick={()=>{this.getProvidersByType(4)}} name="Financial" type="5">Financial</button>

          {this.state.type ? this.state.providers.map(ele => 
          <div>
          
          <Collapsible trigger={ele.companyname}>
            <SearchedProviders
          id={ele.id}
          businessphoto={ele.businessphoto}
          companyname={ele.companyname}
          address={ele.address}
          phone={ele.phone}
          providerbio={ele.providerbio}
          getAverage={this.getAverage}
          />
          </Collapsible>
          </div>) : null} 
        </div>
      </div>
    </div>
  </div>
</div>
)
}
}