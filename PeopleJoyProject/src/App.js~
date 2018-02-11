import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { Security} from '@okta/okta-react';
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import "./App.css";


function onAuthRequired({history}) {
  history.push('/login');
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
    this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
  }
  
  userHasAuthenticated(state){
    this.setState({ isAuthenticated: state });
  }

  handleLogout = event => {
    
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <Security issuer='https://dev-201956.oktapreview.com/oauth2/default'
                  client_id='0oadyo65gpsaDsES00h7'
                  redirect_uri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired} >
      
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? [<RouteNavItem key={1} href="/dashboard">
                      Dashboard
                    </RouteNavItem>,
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                    ]
                : [
                    <RouteNavItem key={1} href="/signup">
                      Signup
                    </RouteNavItem>,
                    <RouteNavItem key={2} href="/login">
                      Login
                    </RouteNavItem>
                  ]}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
      </Security>
    );
  }
}

export default withRouter(App);
