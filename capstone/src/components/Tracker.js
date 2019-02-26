import React, { Component } from 'react'
import axios from 'axios';
import Goals from './Goals'
import Collapsible from 'react-collapsible';
import Search from './Search'
import SearchedProviders from './SearchedProviders'
import Moment from 'react-moment';
import { Button } from 'reactstrap'
import { FaTimes } from 'react-icons/fa'
// import { url } from 'inspector';


export default class Tracker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      goals: [],
      favoriteProviders: this.props.favorites,
      submittedSearch: false,
      searchedProviders: [],
      selectedProviderFavorites: [],
      user: this.props.user
    }

  }

  componentDidMount() {
    this.getGoals();
    this.getFavorites(this.props.id);
  }

  getGoals = async () => {
    try {
      const id = this.props.id
      const goals = await axios.get(`http://localhost:8000/goals/${id}`)
      this.setState({
        goals: goals.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  addGoal = async () => {
    const goal = {
      user_id: this.props.id,
      goal: this.state.goaldescription,
      enddate: this.state.enddate
    }
    try {
      await axios.post('http://localhost:8000/goals', goal)
      await this.getGoals()
    } catch (err) {
      console.log(err)
    }
  }

  deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/goals/goals/${id}`)
      this.getGoals();
    } catch (err) {
      console.log(err)
    }
  }

  getFavorites = async (userId) => {
    try {
      const favorites = await axios.get(`http://localhost:8000/favorites/${userId}`)
      this.setState({
        favoriteProviders: favorites.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  addFavorite = async (providerId) => {
    const favorite = {
      user_id: this.props.id,
      provider_id: providerId
    }
    await axios.post(`http://localhost:8000/favorites`, favorite)
      .then(() =>
        this.setState({
          favoriteProviders: [...this.state.favoriteProviders, favorite]
        })
      )
    this.getFavorites(this.props.id);
  }

  deleteFavorite = (userId, favoriteId) => {
    axios.delete(`http://localhost:8000/favorites/${userId}/${favoriteId}`)
      .then(() => this.getFavorites(userId))
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSearchSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.get(`http://localhost:8000/providers`)
      const data = await response.data.filter(post =>
        Object.values(post).reduce((i, b) => i || (typeof b === 'string' ?
          b.toLowerCase().includes(this.state.search.toLowerCase()) : false), false)
      )
      this.setState({
        searchedProviders: data,
        submittedSearch: true
      })
      if (this.state.search.length < 2) {
        this.setState({
          submittedSearch: false
        })
      }
      return data
    } catch (err) {
      console.log(err)
    }
  }

  closeSearch=()=>{
    this.setState({
      submittedSearch:false
    })
  }
    render () {
      return (
        <div className="container tracker">
          <div className="row">
            <div className="col-3">
              <div className="profile-img-top" style={{backgroundImage:`url(${this.props.profilepic}`}}></div>
              <p className="motto"><strong>"{this.props.tagline}"</strong></p>
              <Search handleSearchSubmit={this.handleSearchSubmit} handleChange={this.handleChange}/>
            </div>
            <div className="col-4">
              <p className="trackerColumnHeader">Goals</p>
              {this.state.goals.map(ele=>
              <div className="goal" key={ele.id}>
                <Goals 
                  key={ele.id}
                  userId={this.props.id}
                  goalId={ele.id}
                  goal={ele.goal}
                  createdAt={ele.created_at}
                  enddate={ele.enddate}
                  deleteGoal={this.deleteGoal}
                  getGoals={this.getGoals}
                />
              </div>
              )}
              <Collapsible trigger="+ Add a goal">
              <div className="addGoal">
                <form className="addGoalForm" >
                  <label>What is your goal?</label>
                  <input type="text" name="goaldescription" placeholder="type here..." onChange={this.handleChange}></input>
                  <label>What is your completion date?</label>
                  <input type="date" name="enddate" onChange={this.handleChange}></input>
                  <Button className="addFavorite" type="button" onClick={()=>{this.addGoal()}}>Add</Button>
                </form>
                </div>
              </Collapsible>
            </div>
            <div className="col-3 favorites">
              <p className="trackerColumnHeader">Favorites</p>
                {this.state.favoriteProviders.map(ele=>
                  <div key={ele.id}>
                    <img src={ele.businessphoto} alt={ele.businessphoto} className="favoritesImg"></img><small>{this.props.companyname}</small>
                    <small>{ele.companyname}</small>
                    <span href="#" className="deleteFavoriteBtn" onClick={()=>{this.deleteFavorite(this.state.id, ele.id)}}><FaTimes /></span>
                  </div>
                )}

            </div>
            <div className="col-2">
            <p className="trackerColumnHeader">Sober Time</p>
              <div className="soberTime">
                <p><Moment diff={this.props.soberDate} unit="days"></Moment> days</p>
              </div>
              <div className="soberTime">
                <p><Moment diff={this.props.soberDate} unit="hours"></Moment> hours</p>
              </div>
              <div className="soberTime">
                <p><Moment diff={this.props.soberDate} unit="minutes"></Moment> minutes</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {this.state.submittedSearch && this.state.searchedProviders.map(ele =>
            <div className="row" key={ele.id}>
              <div className="col-10">
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
                />
              </div>
              <div className="col-2">
              <form className="box">
                <button type="button" onClick={()=>{this.addFavorite(ele.id)}}>+ Favorites</button>
                <span type="button" onClick={this.closeSearch}><FaTimes /></span>
                </form>
              </div>
            </div>
            )}
            </div>
          </div>
        </div>
      )
    }
  }