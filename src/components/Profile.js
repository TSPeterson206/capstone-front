import React, { Component } from 'react'
import axios from 'axios'
import SearchedProviders from './SearchedProviders'
import Collapsible from 'react-collapsible';
import { Card, CardText, CardBody } from 'reactstrap';
import UserTracker from './UserTracker';
const url =  process.env.REACT_APP_API_URL

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      providers:[],
      type:'',
      selectedProviderID:'',
      selectedProviderFavorites:[],
      average:''
    }

  }

  componentDidMount() {
    this.getAccount();
  }

  getAccount = async () => {
    try {
      const response = await axios.get(`${url}/users`)
      console.log(response)
      const user = await response.data.filter(user => user.username === this.props.match.params.username)
      const favorites = await axios.get(`${url}/favorites/${user[0].id}/`)
      console.log(favorites)
      const favs = favorites.data.filter(ele=>ele.user_id === user[0].id)
      this.setState({ user: [...user],
        selectedProviderFavorites:[...favs]
      })
    } catch (err) {
      console.log(err)
    }
    console.log(this.state.user)
    let days = Date.now()-new Date(this.state.user[0].soberdate).getTime();
    const total = Math.round(days/86400000) + " days";
    this.setState({
      soberDays:total,
      soberDate:this.state.user[0].soberdate
    })
  }

  getProvidersByType = async(type) =>{
     try {
      const found = await axios.get(`${url}/providers`)
      const filtered = await found.data.filter(ele => ele.typeID === type)
      this.setState({
        providers:filtered,
          type:type
      })
    }
    catch (err) {
      console.log(err)
     }
    }
    
getAverage = async(id) => {
await axios.get(`${url}/reviews/providers/${id}`)
      .then((result)=>{
      const ratings = result.data.map(ele=> {return ele.rating}).reduce((a,b)=>a+b,0)
      const average = ratings/result.data.length
      const fixedAverage= average.toFixed(2)
      this.setState({
        average:fixedAverage
      })
    }
  )
}

closeProviderWindow= () => {
this.setState({
  type:''
})
}

  render() {
    return (
<div>
  <div className="trackerContainer">
    <div className="row">
      <div className="col-12">
        <div className="">
          <UserTracker 
            user={this.state.user}
            favorites={this.state.selectedProviderFavorites}
            deleteFavorite={this.deleteFavorite}
            getFavorites={this.getFavorites}
            addFavorite={this.addFavorite}
            soberDays={this.state.soberDays}
            soberDate={this.state.soberDate}
          />
        </div>
      </div>
    </div>
  </div>
  <div className="providersContainer">
    <div className="row">
    <div className="col-12">
      <div href="#" className="providersContainerHeader" onClick={this.closeProviderWindow}>Providers</div>
        {this.state.type ? this.state.providers.map(ele => 
        <div key={ele.id}>
          <Collapsible className="providerCollapsibleName" trigger={ele.companyname} onOpening={()=>{this.getAverage(ele.id)}}>
            <SearchedProviders
              key={ele.id}
              id={ele.id}
              businessphoto={ele.businessphoto}
              companyname={ele.companyname}
              address={ele.address}
              phone={ele.phone}
              providerbio={ele.providerbio}
              getAverage={this.getAverage}
              user={this.state.user}
              average={this.state.average}
            />
          </Collapsible>
      </div>) : null} 
    </div>
    </div>
  </div>
    <div className="flex-container cardContainer">
      <div className="row cardRow">
        <div className="col-12">
            <div className="categoryCards">
              <div className="cardDiv">
              <span onClick={()=>{this.getProvidersByType(1)}} name="SUD" type="1">
                <Card className="card">
                <div className="card-img-top" style={{backgroundImage:'url(https://www.allmyrelationscounseling.com/wp-content/uploads/2014/12/Individual-Counseling-e1420327034910.jpg)'}}></div>
                  <CardBody className="cardBody"> 
                    <CardText className="cardText">Substance Use</CardText>
                  </CardBody>
                </Card>
                </span>
              </div>
              <div className="cardDiv">
              <span onClick={()=>{this.getProvidersByType(5)}} name="MH" type="2">
                <Card className="card">
                <div className="card-img-top" style={{backgroundImage:'url(http://www.counselingpsychology.org/wp-content/uploads/2014/10/Therapist-Therapy-300x200.jpg)'}}></div>
                  <CardBody className="cardBody">
                    <CardText className="cardText">Mental Health</CardText>
                  </CardBody>
                </Card>
                </span>
              </div>
              <div className="cardDiv">
              <span onClick={()=>{this.getProvidersByType(2)}} name="Medical" type="3">
                <Card className="card">
                <div className="card-img-top" style={{backgroundImage:'url(https://bestdoctors.com/wp-content/uploads/2016/11/Doctor-with-Tablet.jpg)'}}></div>
                  <CardBody className="cardBody">
                    <CardText className="cardText">Medical</CardText>
                  </CardBody>
                </Card>
                </span>
              </div>
              <div className="cardDiv">
              <span onClick={()=>{this.getProvidersByType(3)}} name="Legal" type="4">
                <Card className="card">
                  <div className="card-img-top" style={{backgroundImage:'url(http://www.yosukekashiwagi.net/file/2018/07/get_help_for_your_small_law_firm.jpg)'}}></div>
                  <CardBody className="cardBody">
                    <CardText className="cardText">Legal</CardText>
                  </CardBody>
                </Card>
                </span>
              </div>
              <div className="cardDiv">
              <span onClick={()=>{this.getProvidersByType(4)}} name="Financial" type="5">
                <Card className="card">
                <div className="card-img-top" style={{backgroundImage:'url(https://www.groupon.com/merchant/wp-content/uploads/2017/12/accountantfees_121317_blog.jpg)'}}></div>
                  <CardBody className="cardBody">
                    <CardText className="cardText">Financial</CardText>
                </CardBody>
              </Card>
              </span>
            </div>
            <div className="cardDiv">
            <span onClick={()=>{this.getProvidersByType(6)}} name="Financial" type="6">
                <Card className="card">
                <div className="card-img-top" style={{backgroundImage:'url(https://amp.businessinsider.com/images/5b43ccf31335b831008b4c1c-750-563.jpg)'}}></div>
                  <CardBody className="cardBody">
                    <CardText className="cardText">Fitness</CardText>
                </CardBody>
              </Card>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
  }
}