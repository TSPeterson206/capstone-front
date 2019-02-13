// import React, { Component} from 'react'
// import Reviews from './Reviews'
// import axios from 'axios';


// export default class ProvidersSUD extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       providers:[]
//     }
//     console.log(this.props.type)
//   }
// componentDidMount() {
//   this.getSUDproviders(1)
// }
//   getSUDproviders(type){
//    axios.get('http://localhost:8000/providers')
//    .then(result => {
//    const providers = result.data.filter(ele => ele.typeID === type)
   
//   // console.log(this.state.providers)
//    }
   
//    )
  
//   }
//   render () {
//     return (
//       <div>
//         <p>ThIS IS THE PROVIDERSSUD AREA</p>
//         {this.getSUDproviders(parseInt(this.props.type))}
//       </div>
//     )
//   }
// }