import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'reactjs-simple-spinner'
import request from '../utils/request'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

const items = [
  {
    src: 'https://www.westcountyservices.org/wp-content/uploads/2016/09/helping-1024x478.jpg',
    altText: 'Slide 1',
    caption: 'Rejuvenate what has been neglected'
  },
  {
    src: 'https://www.safehavenofashland.org/upload/hope.jpg',
    altText: 'Slide 2',
    caption: 'Mend what has become damaged'
  },
  {
    src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF3aNUtNjVtiEgvQ9EQim7NIGrZWmnvAcWPUeguW6uXJDDcIqT',
    altText: 'Slide 3',
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
      const { username, password } = event.target

      request('/auth/login', 'post', {
        username: username.value,
        password: password.value
      })
        .then(response => {
          this.setState({ showErrorMessage: false })

          localStorage.setItem('token', response.data.token)
          return request('/auth/login')
        })
        .then(response => {
          console.log("username", `${username.value}`, this.props)
          this.props.setAuthentication(response.data)
          this.props.history.push({pathname:`/profile/${username.value}`, state: { username : username.value }})
        })
        .catch(error => {
          console.log(error)
          this.setState({ showErrorMessage: true })
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
      this.setState({ activeIndex: nextIndex });
    }
  
    previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }
  
    goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
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
          <img src={item.src} alt={item.altText} className="carouselImage" />
          <CarouselCaption  captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      this.state.isLoading ?
        <div className="border rounded p-5 col-sm-6 mt-5 mr-auto ml-auto">
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
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
      <div className="col-sm-6 mt-5 mr-auto ml-auto">
        <div className={this.state.showErrorMessage ? "error-handler alert alert-danger" : "error-handler alert alert-danger invisible"}>
          Invalid Username or Password
        </div>
        <form className="border rounded p-5" onSubmit={this.handleLogin}>
          <h2>Account Login</h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input type="text" className="form-control" id="username" name="username" aria-describedby="usernameHelp" placeholder="enter username" required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="password" required />
          </div>
          <button type="submit" className="btn btn-outline-info mr-3">Submit</button>
          <Link className="small" to="/signup">Create an Account</Link>
        </form>
      </div>
      </div>
    )
  }
}
