import React from 'react';
/// props = { model, onClick }
const bike = ({ model, onClick, outOfStock }) => {
    let rentButton = <a href="./" onClick={(event) => onClick(model, event)} className="btn btn-danger align-center">Rent now!</a>;
    if (outOfStock){
        rentButton = <span className="btn btn-danger disabled">Out of stock</span>
    }

    return (
        <div className="card mb-3">
            <img src={model.image} className="card-img-top" alt={model.name} />
            <div className="card-body">
                <h5 className="card-title">{model.name}</h5>
                <h6 className="h3 text-center">${model.price}</h6>
                {rentButton}
            </div>
        </div>
    );
}

export default bike;