import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";
	
import { withAuth } from '@okta/okta-react';
import { Redirect } from 'react-router'

import axios from 'axios'
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";

export default withAuth(class Signup extends Component {
  constructor(props) {
    super(props);

   axios.defaults.headers.common['Authorization'] = "SSWS 00wMM69uhKZslkAzioe0p4NLWnWpUQVLKoycsUqD5J";
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    this.state = {
      isLoading: false,
      first: "",
      last: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      complete: false
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signup = this.signup.bind(this);
  }

  validateForm() {
    return (
      this.state.first.length > 0 &&
      this.state.last.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 7 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleSubmit(e){
    e.preventDefault();

    this.setState({ isLoading: true });

    try {
    	await this.signup(this.state.email, this.state.password, this.state.first, this.state.last);
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
      }


  signup(email, password, first, last) {
	  	axios.post("https://dev-201956.oktapreview.com/api/v1/users?activate=false", {
		  "profile": {
		    "firstName": first,
		    "lastName": last,
		    "email": email,
		    "login": email 
		  },
		  "credentials": {
		    "password" : { "value": password }
		  }
	  }
	  ).then(() => this.setState({ complete: true }))
	  .catch(function (error) {
	    console.log(error);
	  });
  }
  
  validatePass() {
    if (this.state.password === this.state.confirmpassword) return 'success';
  }

  renderForm() {

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="first"
         bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.first}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />	
        </FormGroup>
        <FormGroup controlId="last" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.last}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
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
          <HelpBlock>Passwords need 8 characters, one capital, one lowercase, and one special character</HelpBlock>
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large" validationState={this.validatePass()}>
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
			<FormControl.Feedback />
          <HelpBlock>Passwords must match</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.complete
          ? <Redirect to='/login' />: this.renderForm()}
      </div>
    );
  }
})
