import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import { ProductContext, ProductConsumer } from '../context'
import axios from 'axios';
import { CONFIG } from '../Constants'


const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
})

const steps = ['Shipping address', 'Payment details', 'Review your order']

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />
    case 1:
      return <PaymentForm />
    case 2:
      return <Review />
    default:
      throw new Error('Unknown step')
  }
}

function getUser(){
  return {
		"customerId" : 1,
		"name" : "Test Customer",
		"email": "test@test.com",
		"address": "100 Church Street"
	};
}

class Checkout extends React.Component {
  static contextType = ProductContext;

  constructor(props){
    super(props);
    this.UserAction = this.UserAction.bind(this);
  }

  UserAction() {
    var app = this;
    var context = this.context;
    console.log('context', context);
    console.log('profile', this.props.auth.getProfile());
    console.log('cart', context.cart);
    const headers = { 'Authorization': `Bearer ${this.props.auth.getAccessToken()}` }
    console.log(headers);
    var submitDoc = {
      "customer" : getUser(),
      "orderTotal" : context.cartTotal,
      "orderLines" : [],
      "createdAt" : new Date().toISOString(),
      "isFulfilled" : false
    };

    context.cart.forEach(element => {
      var book = {
        "bookId" : element.bookId,
				"isbn" : element.isbn,
				"title" : element.title,
				"price" : element.price
      };
      var bookDoc = {
        "book" : book,
        "quantity" : element.count,
			  "itemTotal" : element.total
      }
      submitDoc.orderLines.push(bookDoc);
    });
    console.log(submitDoc);

    axios.post(`${CONFIG.APIBaseUrl}/bookorder/order`, submitDoc, { headers })
      .then(res => {
        // console.log(res);
        context.setPlacedOrderId(res.data.orderId);
        app.handleNext();
      })
      .catch(error =>  {
        console.log(error);
      });
  }
  
  state = {
    activeStep: 0
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  getConfirmationComponent(){
    var context = this.context;
    console.log('context.getPlacedOrderId()', context.getPlacedOrderId());
    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Thank you for your order.
        </Typography>
        <Typography variant="subtitle1">
          Your order number is {context.getPlacedOrderId()}. We have emailed your order
          confirmation, and will send you an update when your order
          has shipped.
        </Typography>
      </React.Fragment>
    )
  }

  render() {
    const { classes } = this.props
    const { activeStep } = this.state
    
    
    return (
      <ProductConsumer>
      {
        value => {
          const { submitOrder } = value;
          return(
            <React.Fragment>
              <CssBaseline />
              <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                  <Typography variant="h6" color="inherit" noWrap>
                    GuardiansOfTheKey
                  </Typography>
                </Toolbar>
              </AppBar>
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <Typography component="h1" variant="h4" align="center">
                    Checkout
                  </Typography>
                  <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map(label => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <React.Fragment>
                    {activeStep === steps.length ? (
                      this.getConfirmationComponent()
                    ) : (
                      <React.Fragment>
                        {getStepContent(activeStep)}
                        <div className={classes.buttons}>
                          {activeStep !== 0 && (
                            <Button
                              onClick={this.handleBack}
                              className={classes.button}
                            >
                              Back
                            </Button>
                          )}
                          {activeStep !== steps.length-1 && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.handleNext}
                              className={classes.button}
                            >
                              {activeStep === steps.length - 0 ? 'Next' : 'Next'}
                            </Button>
                          )}
                          {activeStep === steps.length-1 && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.UserAction}
                              className={classes.button}
                            >
                              Place Order
                            </Button>
                          )}
                        </div>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                </Paper>
              </main>
            </React.Fragment>
          )
        }
      }
      </ProductConsumer>
    )
  }
}
Checkout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Checkout)
