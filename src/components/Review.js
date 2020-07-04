import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import { ProductConsumer } from '../context'

const products = [
  { name: 'Ocean of Seas', desc: 'By Andrea Adney', price: '$15' },
  { name: 'Shipping', desc: '', price: 'Free' }
]
const addresses = ['Planet X', 'Marvel Universe', 'Xandar', '3000', 'USA']
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr Groot' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' }
]

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
})

function Review(props) {
  const { classes } = props
  return (
    <ProductConsumer>
    {
      value => {
        const { cart, cartSubTotal, cartTax, cartTotal } = value;
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {cart.map(product => (
                <ListItem className={classes.listItem} key={product.title}>
                  <ListItemText primary={product.title} secondary={product.isbn} />
                  <Typography variant="body2">{product.count} * </Typography>
                  <Typography variant="body2">{product.price} </Typography>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                  {cartTotal}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={16}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  Shipping
                </Typography>
                <Typography gutterBottom>Star-Lord</Typography>
                <Typography gutterBottom>{addresses.join(', ')}</Typography>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  Payment details
                </Typography>
                <Grid container>
                  {payments.map(payment => (
                    <React.Fragment key={payment.name}>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{payment.detail}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        );
    }}
    </ProductConsumer>
  )
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Review)
