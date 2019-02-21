import React, { Component } from 'react'
import Tracker from './Tracker'
import axios from 'axios'
import SearchedProviders from './SearchedProviders'
import Collapsible from 'react-collapsible';
import { Button } from 'reactstrap';
import { Card, CardImg, CardText, CardBody } from 'reactstrap';
import Search from './Search'
import UserTracker from './UserTracker';


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
    console.log(this.state.selectedProviderFavorites)
    console.log(this.state.selectedProviderID)
    console.log(this.state.user)

  }

  componentDidMount() {
    this.getAccount();
  }

  getAccount = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users`)
      const user = await response.data.filter(user => user.username === this.props.match.params.username)
      console.log(user[0].id)
      const favorites = await axios.get(`http://localhost:8000/favorites/${user[0].id}`)
      console.log(favorites)
      const favs = favorites.data.filter(ele=>ele.user_id === user[0].id)
      console.log(favs)
      this.setState({ user: [...user],
        selectedProviderFavorites:[...favs]
      })
    } catch (err) {
      console.log(err)
    }
    console.log(this.state.user)
  }

  getProvidersByType = async (type) =>{
     try {
      const found = await axios.get('http://localhost:8000/providers')
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
    
getAverage = async(id) =>{
await axios.get(`http://localhost:8000/reviews/providers/${id}`)
      .then((result)=>{
      const ratings = result.data.map(ele=> {return ele.rating}).reduce((a,b)=>a+b)
      const average = ratings/result.data.length
      console.log(average)
      this.setState({
        average:average
      })
      }
      )
}

addFavorite = async(providerId) => {
  const favorite = {
    user_id:this.state.user[0].id,
    provider_id:providerId
  }
  console.log('hittingaddfavorite', favorite)
  await axios.post(`http://localhost:8000/favorites`, favorite)
  .then(()=>
  this.setState({
    selectedProviderFavorites:[...this.state.selectedProviderFavorites, favorite]
  })
  )
console.log(this.state.selectedProviderFavorites)
this.getAccount();
}

handleSearchSubmit = async (event) => {
  event.preventDefault()
  try {
    const response = await axios.get(`http://localhost:8000/providers`)
    const data = await response.data.filter(post =>
      Object.values(post).reduce((i, b) => i || (typeof b === 'string' ?
        b.toLowerCase().includes(this.state.search.toLowerCase()) : false), false)
    )
    console.log(data)

    this.setState({
      searchedProviders: data,
      submittedSearch: true
    })

    if(this.state.search.length <2) {
      this.setState({
        submittedSearch:false
      })
    }
    console.log(this.state.submittedSearch)

    return data
  } catch (err) {
    console.log(err)
  }
}

handleChange = (event) => {
  this.setState({
    [event.target.name] : event.target.value
  })
}
 getFavorites = async(userId) => {
    try {
      const favorites = await axios.get(`http://localhost:8000/favorites/${userId}`)
      console.log(favorites)
      this.setState({
        favoriteProviders:favorites.data
      })
    } catch (err) {
      console.log(err)
    }
    console.log(this.state.favoriteProviders)
  }

deleteFavorite = (userId, favoriteId) => {
  console.log('hittingdeletefavorite', userId, favoriteId)
  axios.delete(`http://localhost:8000/favorites/${userId}/${favoriteId}`)
  .then(()=>this.getFavorites(userId))
}

  render() {
    return (
<div>
<Search handleSearchSubmit={this.handleSearchSubmit} handleChange={this.handleChange}/>
<div className="tracker">
  <UserTracker 
  user={this.state.user}
  favorites={this.state.selectedProviderFavorites}
  deleteFavorite={this.deleteFavorite}
  getFavorites={this.getFavorites}
  addFavorite={this.addFavorite}
  />
  </div>
  {
            this.state.submittedSearch && this.state.searchedProviders.map(ele =>
              <SearchedProviders
                businessphoto={ele.businessphoto}
                companyname={ele.companyname}
                address={ele.address}
                phone={ele.phone}
                key={ele.id}
                id={ele.id}
                providerbio={ele.providerbio}
                getAverage={this.getAverage}
                user={this.state.user}
                average={this.state.average}
                addFavorite={this.addFavorite}
                />)
          }
  {this.state.type ? this.state.providers.map(ele => 
    <div key={ele.id}>
    
    <Collapsible trigger={ele.companyname} onOpening={()=>{this.getAverage(ele.id)}}>
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
  <div className="container">
    <div className="row cardRow">
      <div className="col-12">
        <div>
          <div className="categoryCards">
          <div className="cardDiv">
          <Card className="card">
          <CardImg src="https://www.allmyrelationscounseling.com/wp-content/uploads/2014/12/Individual-Counseling-e1420327034910.jpg" className="cardImage"></CardImg>
          <CardBody>
          <CardText>Check out SUD providers</CardText>

            <Button onClick={()=>{this.getProvidersByType(1)}} name="SUD" type="1">SUD</Button>
          </CardBody>
          </Card>
          </div>
          <div className="cardDiv">
          <Card className="card">
          <CardImg src="http://www.counselingpsychology.org/wp-content/uploads/2014/10/Therapist-Therapy-300x200.jpg" className="cardImage"></CardImg>
          <CardBody>
          <CardText>Check out mental health providers</CardText>
          <Button onClick={()=>{this.getProvidersByType(5)}} name="MH" type="2">Mental Health</Button>
          </CardBody>
          </Card>
          </div>
          <div className="cardDiv">
          <Card className="card">
          <CardImg src="https://bestdoctors.com/wp-content/uploads/2016/11/Doctor-with-Tablet.jpg" className="cardImage"></CardImg>
          <CardBody>
          <CardText>Check out medical providers</CardText>

          <Button onClick={()=>{this.getProvidersByType(2)}} name="Medical" type="3">Medical</Button>
          </CardBody>
          </Card>
          </div>
          <div className="cardDiv">
          <Card className="card">
          <CardImg src="http://www.yosukekashiwagi.net/file/2018/07/get_help_for_your_small_law_firm.jpg" className="cardImage"></CardImg>
          <CardBody>
          <CardText>Check out legal providers</CardText>

          <Button onClick={()=>{this.getProvidersByType(3)}} name="Legal" type="4">Legal</Button>
          </CardBody>
          </Card>
          </div>
          <div className="cardDiv">
          <Card className="card">
          <CardImg src="https://www.groupon.com/merchant/wp-content/uploads/2017/12/accountantfees_121317_blog.jpg" className="cardImage"></CardImg>
          <CardBody>
          <CardText>Check out financial service providers</CardText>

          <Button onClick={()=>{this.getProvidersByType(4)}} name="Financial" type="5">Financial</Button>
          </CardBody>
          </Card>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
}
}