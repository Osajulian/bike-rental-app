import React, { Component } from 'react';
import Bike from './components/Bike';
import RentBike from './containers/RentBike';


/*
    develop a simple product reservation page for bike rentals.
    Using the attached JSON data,
    provide the user with the option to rent bikes.
*/

const INITIAL_STATE = {
  items: [], // bikes
  selectedBike: null,
  ordered: []
};

class App extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    fetch('./data/bikerentals.json')
      .then(response => response.json())
      .then(result => {
        this.setState(prevState => {
            return {
              ...prevState,
              items: result.products
            };
        })
      })
  }

  onBikeClicked = (bike, event) => {
      this.setState(prevState => {
        return {
          ...prevState,
          selectedBike: bike
        }
      })
      event.preventDefault();
  }

  onRentHandler = (order) => {
    console.log(order);
    this.setState(prevState => {
      const orderedBikes = prevState.ordered.concat(order.selectedBike);
      return {
        ...prevState,
        ordered: orderedBikes,
        selectedBike: null
      }
    })
  }

  render() {
  let rentBike = null;
  if (this.state.selectedBike != null){
    rentBike = <RentBike selectedBike={this.state.selectedBike} onRent={this.onRentHandler}></RentBike>;
  }

    return (
      <>
        <header>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
              <div className="navbar-header">
                <a href="./" className="navbar-brand">Bike Rentals</a>
              </div>
            </div>
          </nav>
        </header>
        <div className="container mt-5">
          <div className="card-columns">
            {this.state.items.map(item => {
              console.log(this.state.ordered);
              let outOfStock = this.state.ordered.findIndex(order => {
                console.log(order, item);
                return order.id === item.id
              }) >= 0;
              return <Bike key={item.id} model={item} onClick={this.onBikeClicked.bind(this) } outOfStock={outOfStock}>{item.name}</Bike>;
            })}
          </div>
        </div>
        {rentBike}
      </>
    );
  }
}

export default App;
