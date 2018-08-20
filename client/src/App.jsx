import React, { Component } from 'react';
import axios from 'axios';
import Candidate from './Candidate.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: null
    };
    
    this.addLike = this.addLike.bind(this);
    this.addFlavor = this.addFlavor.bind(this);
  }
  
  componentDidMount() {
    axios.get('/api/likes').then(response => {
      const votes = {
        chocolate: 0,
        vanilla: 0,
        durian: 0
      };
      
      response.data.forEach(iceCream => {
        const {flavor, likes} = iceCream;
        votes[flavor] = likes;
      });
      
      this.setState({votes});
    });
  }
  
  addLike(flavor) {
    axios.post('/api/like', {flavor}).then(response => {
      const {flavor, likes} = response.data;
      const votes = this.state.votes;
      votes[flavor] = likes;
      
      this.setState({votes});
    });
  }
 
  addFlavor(flavor) {
    const newFlavor = document.getElementById("flavor_text").value;
    axios.post('/api/like', {flavor: newFlavor}).then(response => {
      const {flavor, likes} = response.data;
      const votes = this.state.votes;
      votes[flavor] = likes;
      
      this.setState({votes});
    });
  }
  

  render() {
    // if not initialized, return null
    if (!this.state.votes) return null;
    
    const flavorsLikes = Object.entries(this.state.votes);
    const icecreamToBeRendered = flavorsLikes.map((flavorLikes, index) => (
      <Candidate flavor={flavorLikes[0]} likes={flavorLikes[1]} key={index} clickEvent={this.addLike}/>
    ));
    
    return (
      <div>

        
       <h1>Add Icecream Flavor</h1>
     	<input type='text' id='flavor_text' ></input>           
      <button onClick={()=> this.addFlavor()} >Add Flavor</button>



        <h1>Which Icecream is Supreme?</h1>
        <br />
        <div className="main">
          {icecreamToBeRendered}
        </div>
      </div>
    );
  }
}

export default App;

