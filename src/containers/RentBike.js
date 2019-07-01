import React, { Component } from 'react';

const INITIAL_STATE = {
    form: {
        givenName: ''
    }
}

class RentBike extends Component {
    state = INITIAL_STATE;
    onSubmitHandler = (event) => {
        event.preventDefault();
        if (!this.canBeSubmitted())
            return false;

        const order = {
            selectedBike: this.props.selectedBike,
            details: {
                ...this.state.form
            }
        }
        this.props.onRent(order);

        
        return false;
    }

    canBeSubmitted() {
        const { givenName } = this.state.form;
        return givenName.length > 0;
    }

    handleInputGivenName = (event) => {
        const value = event.target.value;
        this.setState(prevState => {
            return {
                ...prevState,
                form: {
                    ...prevState.form,
                    givenName: value
                }
            }
        })
    }

    render() {
        const { selectedBike } = this.props;

        const canRent = this.canBeSubmitted();

        return (
            <div className="modal fade show open">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>You selected {selectedBike.name}!</h2>
                        </div>
                        <div className="modal-body">
                            <p>Enter your details below!</p>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <label>Given Name *</label>
                                    <input type="text" className="form-control" value={this.state.form.givenName} onChange={this.handleInputGivenName}></input>
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm" disabled={!canRent}>Rent!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RentBike;