import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios';
import toastr from 'toastr';
import "toastr/build/toastr.min.css";
import { CONFIG } from './Constants';

const styles = theme => ({
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
})


class Fulfill extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      orders: []
    }
    this.fulfillOrder = this.fulfillOrder.bind(this);
  }


  fulfillOrder(orderId){
    var orders = this.state.orders;
    var updatedOrders = [];
    var app = this;
    orders.forEach(function(obj, index, theArray) {
      if (obj.orderId === orderId) {
        obj.isFulfilled = 'Yes';
      }
      updatedOrders.push(obj);
      app.setState({orders: updatedOrders});
    });
  }

  UserAction(orderId) {
    var context = this.context;
    const headers = { 'Authorization': `Bearer ${this.props.auth.getAccessToken()}` }
    axios.put(`${CONFIG.APIBaseUrl}/bookorder/fulfill/${orderId}`, {}, { headers })
      .then(res => {
        switch(res.data.error){
          case 'SUCCESS':
            this.fulfillOrder(orderId);
            toastr.success('Order Fulfilled');
            break;
          case 'ORDER_ALREADY_FULFILLED':
            toastr.error('Order Already Fulfilled');
            break;
          case 'OUT_OF_STOCK':
            toastr.error('Out of Stock');
            break;
          default:
              toastr.error(res.data.error);
              break;
        }
      })
      .catch(error =>  {
        console.log(error);
      });
   }

  componentDidMount() {
    var context = this.context;
    const headers = { 'Authorization': `Bearer ${this.props.auth.getAccessToken()}` }
    axios.get(`${CONFIG.APIBaseUrl}/bookorder/allOrders`, { headers })
      .then(res => {
        // console.log(res);
        this.setState({orders: res.data})
      })
      .catch(error =>  {
        console.log(error);
      });
  }

  render(){
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Recent Orders
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                Aprove recent orders.
              </Typography>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {this.state.orders.map(order => (
                <Grid item key={order.orderId} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://www.pngkit.com/png/detail/12-120436_open-book-icon-png.png"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Order# {order.orderId}
                      </Typography>
                      {
                        order.books.length > 0? (
                        <Typography>{order.books[0].bookName}</Typography>
                        ):
                        (
                          <Typography>Book</Typography>
                        )
                      }
                      
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      { order.isFulfilled !== 'No' ? (
                      <button disabled type="submit" onClick={() => this.UserAction(order.orderId)}>
                          Fulfilled
                        </button>) : (
                        <button type="submit" onClick={() => this.UserAction(order.orderId)}>
                          Fulfill
                        </button>
                      )
                    }
                      
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

Fulfill.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Fulfill)
