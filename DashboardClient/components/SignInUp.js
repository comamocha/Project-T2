// import React from 'react';

// import {Panel, Well, Button} from 'react-bootstrap';

// // let mixin = InnerComponent => class extends React.Component {
  
// // }

// class Signup extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: ''
//     }
//   }
//   updateUsername (event) {
//     var username = event.target.value;
//     this.setState({
//       username: username
//     });
//     console.log(this.state.username);
//   }
//   updatePassword (event) {
//     var password = event.target.value;
//     this.setState({
//       password: password
//     });
//     console.log(this.state.password);
//   }
//   postUser () {
//     var data  = {
//       username: this.state.username,
//       password: this.state.password
//     }
//     $.ajax({
//       method:'POST',
//       url:'http://localhost:3000/users/signup',
//       crossDomain : true,
//       dataType: "json",
//       contentType: "application/json",
//       data: JSON.stringify(data),
//       success: function(data) {
//         if(data.responseText === '"taken"'){
//           alert('Username already taken, please try again');
//         } else {
//           console.log(data);
//           //Trigger dashboard view!
//         }
//       },
//       error: function(err) {
//         console.log(err);
//       }
//     })
//   }
//   render () {
//     return (
//       <Well>
//         <h1>Signup</h1>
//         <form>
//           Username
//           <input ref="username" type="text" onChange={ (event) => {this.updateUsername(event)} }/>
//           Login
//           <input type="password" onChange={ (event) => {this.updatePassword(event)} }/> <br/>
//           <Button ref="password" onClick={() => {this.postUser()}}>Submit</Button>
//         </form>
//       </Well>
//     );
//   }
// }

// export default Signup;


// // wss.on('connection', function())



