import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';


import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";

export default withAuth(class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      sessionToken: null,
      email: "",
      password: "",
      authenticated: null 
    };
    
	 this.oktaAuth = new OktaAuth({ url:  'https://dev-201956.oktapreview.com' });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkAuthentication = this.checkAuthentication.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  

  async handleSubmit(e){
    e.preventDefault();

	   this.setState({ isLoading: true });
		await this.oktaAuth.signIn({
	      username: this.state.email,
	      password: this.state.password
	    })
	    .then(res => (res.status === "SUCCESS" && this.props.userHasAuthenticated(true)))
	    .catch(err => console.log('Found an error', err));
	    this.setState({ isLoading: false });
	  }
	  
  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }
  
  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
  	 return this.props.isAuthenticated ? <Redirect to={{ pathname: '/' }}/> :
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"	
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>;
  }
})
