import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'reactjs-simple-spinner'
import request from '../utils/request'
import { Carousel, CarouselItem, CarouselCaption } from 'reactstrap';
import { FaShoePrints } from 'react-icons/fa'

const items = [{
    src: 'https://www.westcountyservices.org/wp-content/uploads/2016/09/helping-1024x478.jpg',
    caption: 'Rejuvenate what has been neglected'
  },
  {
    src:'https://www.craigbeck.com/wp-content/uploads/2018/07/positive-energy.jpeg',
    caption:'Increase your positivity'
  },
  {
    src: 'https://www.safehavenofashland.org/upload/hope.jpg',
    caption: 'Mend what has become damaged'
  },
  {
    src: 'https://static1.squarespace.com/static/59779c0fe4fcb5628a339a58/59779d3d37c581c4facdd509/5991b7f0bebafb01ec36b94c/1502722494733/puzzle.jpg?format=2500w',
    caption: 'Reconnect what has been separated'
  }
];

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrorMessage: false,
      isLoading: true,
      activeIndex: 0
    }
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    })
  }

  handleLogin = event => {
    event.preventDefault()
    const {
      username,
      password
    } = event.target

    request('/auth/login', 'post', {
        username: username.value,
        password: password.value
      })
      .then(response => {
        this.setState({
          showErrorMessage: false
        })

        localStorage.setItem('token', response.data.token)
        return request('/auth/login')
      })
      .then(response => {
        console.log("username", `${username.value}`, this.props)
        this.props.setAuthentication(response.data)
        this.props.history.push({
          pathname: `/profile/${username.value}`,
          state: {
            username: username.value
          }
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          showErrorMessage: true
        })
        window.setTimeout(() => {
          this.setState({
            showErrorMessage: false
          });
        }, 2000);
      })
  }

  // CAROUSEL
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({
      activeIndex: nextIndex
    });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({
      activeIndex: nextIndex
    });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({
      activeIndex: newIndex
    });
  }

render() {
  const { activeIndex } = this.state;
  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
      >
      <CarouselCaption  captionHeader={item.caption}/>
        <img src={item.src} alt={item.altText} className="carouselImage" />
      </CarouselItem>
    );
  });

    return (
      this.state.isLoading ? <div className="border rounded p-5 col-sm-6 mt-5 mr-auto ml-auto">
        <Spinner size="massive" lineSize={12} className="center" />
      </div>
        :
      <div>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          className="carousel"
        >
          {slides}
        </Carousel>
        <div className="col-sm-6 mt-5 mr-auto ml-auto">
          <div className={this.state.showErrorMessage ? "error-handler alert alert-danger" : "error-handler alert alert-danger invisible"}>
            Invalid Username or Password
          </div>
          <div className="rounded clientlogin">
          <strong><div className="loginLogo"><FaShoePrints size="3em"/>NextSteps</div></strong>
          

            <form className="box border rounded p-5" onSubmit={this.handleLogin}>
              <h1>Client Login</h1>
              <div className="form-group">
                {/* <label htmlFor="exampleInputEmail1">Username</label> */}
                <input type="text" className="form-control" id="username" name="username" placeholder="enter username" required />
              </div>
              <div className="form-group">
                {/* <label htmlFor="exampleInputPassword1">Password</label> */}
                <input type="password" className="form-control" id="password" name="password" placeholder="enter password" required />
              </div>
              <div className="submitandreset">
              <button type="submit" className="btn btn-outline-info" value="Login">Submit</button>
              <button type="reset" className="btn btn-outline-info">Start Over</button>
              </div>
              <div>
              <Link className="small" to="/signup">Create an Account</Link><br></br>
              <Link className="small" to="/providerSignup">Are you a provider? Add your business here!</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}