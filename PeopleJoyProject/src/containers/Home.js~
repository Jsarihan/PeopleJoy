import React, { Component } from "react";
import "./Home.css";
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
	
	constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }
  

  componentDidUpdate() {
    this.checkAuthentication();
    if (!this.props.userHasAuthenticated) {
			this.props.auth.logout();    
    }
  }
  
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>PeopleJoy</h1>
          <p>Student Loans</p>
        </div>
      </div>
    );
  }
});
