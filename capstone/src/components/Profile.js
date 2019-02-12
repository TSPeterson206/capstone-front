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


export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      SUD:false,
      MH:false,
      financial:false,
      legal:false,
      medical:false
    }
  }

  componentDidMount() {
    this.getAccount()
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

  handleClick = (event) => {
    // e.preventDefault();
    this.setState({
      [event.target.name]:true
    })
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
  <div>
{!this.state.SUD ? <a onClick={this.handleClick} name="SUD">Substance Use Disorders</a> : null}
</div>
<a onClick={this.handleClick} name="MH">Mental Health</a>
<a onClick={this.handleClick} name="medical">Medical</a>
<a onClick={this.handleClick} name="legal">Legal</a>
<a onClick={this.handleClick} name="financial">Financial</a>


<div>
  {this.state.SUD ? <ProvidersSUD /> : null}
</div>
<div>
  {this.state.MH ? <ProvidersMH /> : null}
</div>
<div>
  {this.state.medical ? <ProvidersMedical /> : null}
</div>
<div>
  {this.state.legal ? <ProvidersLegal /> : null}
</div>
<div>
  {this.state.financial ? <ProvidersFinancial /> : null}
</div>

</div>
    )
  }
}