import React, { Component } from 'react'
import axios from 'axios';
import Goals from './Goals'
import Collapsible from 'react-collapsible';
import Search from './Search'
import SearchedProviders from './SearchedProviders'
import Moment from 'react-moment';
import { FaTimes, FaPlus } from 'react-icons/fa'
const url =  process.env.REACT_APP_API_URL


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
      const goals = await axios.get(`${url}/goals/${id}`)
      this.setState({
        goals: goals.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  addGoal = async () => {
    if(this.state.goals.length >=3) {alert('Maximum goals entered!'); return}
    const goal = {
      user_id: this.props.id,
      goal: this.state.goaldescription,
      enddate: this.state.enddate
    }
    try {
      await axios.post(`${url}/goals`, goal)
      await this.getGoals()
    } catch (err) {
      console.log(err)
    }
  }

  deleteGoal = async (id) => {
    try {
      await axios.delete(`${url}/goals/goals/${id}`)
      this.getGoals();
    } catch (err) {
      console.log(err)
    }
  }

  getFavorites = async (userId) => {
    try {
      const favorites = await axios.get(`${url}/favorites/${userId}`)
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
    if(this.state.favoriteProviders.length >=13) {alert('max favorites reached!');return}
    await axios.post(`${url}/favorites`, favorite)
      .then(() =>
        this.setState({
          favoriteProviders: [...this.state.favoriteProviders, favorite]
        })
      )
    this.getFavorites(this.props.id);
  }

  deleteFavorite = (userId, favoriteId) => {
    axios.delete(`${url}/favorites/${userId}/${favoriteId}`)
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
      const response = await axios.get(`${url}/providers`)
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
        <div>
          <div className="row">
            <div className="col-3">
              <div className="profile-img-top" style={{backgroundImage:`url(${this.props.profilepic}`}}></div>
              <p className="motto"><strong>"{this.props.tagline}"</strong></p>
              <Search handleSearchSubmit={this.handleSearchSubmit} handleChange={this.handleChange}/>
            </div>
            <div className="col-4 goalsColumn">
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
              <Collapsible className="addGoalCollapsible addButton" trigger={<FaPlus />}>
              <div className="addGoal">
                <form className="addGoalForm" >
                  <label><strong>What is your goal?</strong></label><br></br>
                  <input type="text" className="goalInput" name="goaldescription" onChange={this.handleChange} required></input><br></br>
                  <label><strong>What is your completion date?</strong></label><br></br>
                  <input type="date" className="goalInput" name="enddate" onChange={this.handleChange} required></input><br></br>
                  <span className="addGoal addButton" onClick={()=>{this.addGoal()}}><FaPlus /> Done</span>
                </form>
                </div>
              </Collapsible>
            </div>
            <div className="col-3 favorites">
              <p className="trackerColumnHeader">Favorites</p>
                {this.state.favoriteProviders.map(ele=>
                  <div className="userFavorite" key={ele.id}>
                    <img src={ele.businessphoto} alt={ele.businessphoto} className="favoritesImg"></img><small>{this.props.companyname}</small>
                    <small>{ele.companyname}</small>
                    <span href="#" className="deleteFavoriteBtn closeButton" onClick={()=>{this.deleteFavorite(this.state.id, ele.id)}}><FaTimes /></span>
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
          <div className="container searchContainer">
              {this.state.submittedSearch && this.state.searchedProviders.map(ele =>
            <div className="row" key={ele.id}>
              <div className="col-11">
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
                  addFavorite={this.addFavorite}
                />
              </div>
              <div className="col-1">
                <form className="closeFavoriteSearch">
                  <div>
                    <label>Close</label><br></br>
                    <span className="closeSearchSpan" onClick={this.closeSearch}><FaTimes /></span><br></br>
                    <label>Favorites</label><br></br>
                    <span className="favoriteSearchSpan" onClick={()=>{this.addFavorite(ele.id)}}><FaPlus /></span>
                  </div>
                </form>
              </div>
            </div>
            )}
          </div>
        </div>
      )
    }
  }