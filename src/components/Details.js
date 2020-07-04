import React, { Component } from 'react'
import { ProductConsumer } from '../context'
import { ButtonContainer } from './Button'
import { Link } from 'react-router-dom'
import {ProductContext} from '../context';
import history from '../History';

export default class Details extends Component {
  static contextType = ProductContext;

  componentDidMount(){
    let value = this.context;
    if(value == null || value.detailProduct == null){
      history.replace('/');
      return;
    }
  }
  
  render() {
    let value = this.context;
    if(value == null || value.detailProduct == null){
      return (
        <p> </p>
      )
    }
    const {
      listingId,
      pictureUrl,
      name,
      description,
      price,
      hostName,
      accomodates,
      beds,
      bathrooms,
      reviewScoreRating,
      cancellationPolicy,
      amenities,
      city,
      state,
      reviews
    } = value.detailProduct;
    return (
      <ProductConsumer>
        {value => {
          console.log(value, "value");
          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1 />
                </div>
              </div>
              {/* end of title */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={pictureUrl} className="img-fluid" alt="" />
                </div>
                {/* product info */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h1>{name}</h1>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Guest Rating :
                  </p>
                  <p className="text-muted lead">{reviewScoreRating}</p>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0" />
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Amenities :
                  </p>
                  <p className="text-muted lead">{amenities}</p>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0" />
                  <h4 className="text-blue">
                    <strong>
                      price : <span>$</span>
                      {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Cancellation Policy :
                  </p>
                  <p className="text-muted lead">{cancellationPolicy}</p>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0" />
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Accommodates: <span>{accomodates}</span> <br />
                    Beds: <span>{beds}</span> <br />
                    Bathrooms: <span>{bathrooms}</span>
                  </p>

                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    Location:{" "}
                    <span>
                      {city}, {state}
                    </span>
                  </p>
                  <p className="text-muted lead" />

                  <p className="text-muted lead">What our guests say..</p>
                    <span>{reviews}</span>
                  <br />
                  <br />
                  <div>
                    <Link to="/">
                      <ButtonContainer>Back to Listings</ButtonContainer>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    )
  }
}
