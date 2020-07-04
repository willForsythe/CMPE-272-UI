import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../logo.svg'
import { ButtonContainer } from './Button'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'
import Icon from '@material-ui/core/Icon'
import history from '../History';

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    textColor: '#FFFFFF',
    colorTextPrimary: '#AAAAAA',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
})


class SearchAppBar extends Component {

  constructor(props){
    super(props);
  }

  render(){
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" className="nav-link">
              <Typography
                className={classes.title}
                variant="h6"
                color="textPrimary"
                noWrap
              >
                WALK
              </Typography>
            </Link>
            <Button color="default" className={classes.menuButton} onClick={() => {history.push('/')}}>Home</Button>
            <div className={classes.grow} />
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div> */}
            {
              isAuthenticated() && (
                <React.Fragment>
                  <Link to="/" className="nav-link">
                    <Typography
                      className={classes.title}
                      variant="h6"
                      color="default"
                      noWrap
                    >
                      Welcome, {this.props.auth.getProfile().name}
                    </Typography>
                  </Link>
                </React.Fragment>
              )
            }
            
            {
              !isAuthenticated() && (
                <Button onClick={this.props.auth.login} color="default" className={classes.menuButton}>Login</Button>
                // <Link to="/Login" className="lg-auto">
                //   <Button color="default">Login</Button>
                // </Link>
              )
            }
            {
              isAuthenticated() && (
                <React.Fragment>
                  <Button onClick={this.props.auth.logout} color="default" className={classes.menuButton}>Logout</Button> 
                </React.Fragment>
              )
            }
            <div>
              <Link to="/cart" className="ml-auto">
                <IconButton color="inherit" aria-label="shooping-cart">
                  <SvgIcon>
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </SvgIcon>
                </IconButton>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}


SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchAppBar)
