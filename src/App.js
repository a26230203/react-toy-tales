import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toy: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  //Render the toy 
  componentDidMount() {
    fetch('http://localhost:3001/toys')
      .then(res => res.json())
        .then(toy => this.setState({toy}))
  }
  
  // Increase the likes
    increasLike = (toyObj) => {
        const newLike = toyObj.likes + 1

        fetch(`http://localhost:3001/toys/${toyObj.id}`, {
          method: "PATCH",
          headers: {"Content-Type": "application/json"
          },
          body: JSON.stringify({
            likes: newLike
          })
        })
          .then(res => res.json())
            .then(updatedLike => {
              // updated to the DOM
              this.componentDidMount()
              })
    }

    //Updated  new toy by form  to DOM 
    createToy = (toyObj) => {
        this.setState({
          toy: [...this.state.toy, toyObj]
        })
    }


    //Deleted toy from Backedn and updated to DOM 
    delteToy = (toyObj) => {
      const toyFilter = this.state.toy.filter((toy) => toy.id !== toyObj.id)

      //detled from backend

      fetch(`http://localhost:3001/toys/${toyObj.id}`, {
        method: "DELETE"
      })
        .then(res => res.json)
          .then(() => {
      
            this.setState({
              toy: toyFilter
            })
          })
    }


  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toy={this.state.toy} increasLike={this.increasLike} delteToy={this.delteToy}/>
      </>
    );
  }

}

export default App;
