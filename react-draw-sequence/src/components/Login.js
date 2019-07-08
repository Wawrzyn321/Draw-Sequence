import React from 'react';
import AuthService from './../services/auth';
import { connect } from 'react-redux';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            logInError: null,
            login: null,
            password: null
        };
        this.submit = this.submit.bind(this);
    }

    getLoginButtonText() {
        if (this.state.isLoading) {
            return "Logging in...";
        }
        else {
            return "Log in";
        }
    }

    async submit(e) {
        e.preventDefault();
        const loginData = new FormData();
        loginData.append('username', this.state.login);
        loginData.append('password', this.state.password);

        try {
            const loginResult = await AuthService.tryLogIn(loginData);
            if (loginResult) {
                AuthService.setCredentials(loginResult, this.props.dispatch);
                this.props.history.push('/admin-list');
                return;
                
            } else {
                this.setState( {logInError: "Invalid username or password!"} );
            }
          } catch (err) {
            this.setState( {logInError: "Invalid username or password!"} );
            console.warn(err);
          }
          this.setState( { isLoading: false} );
    }

    render() {
        return <article className="m-3">
        <h2>Admin Login</h2>
        <form onSubmit={this.submit} className="login-form">
        <div className="form-group">
            <label htmlFor="username" className="col-form-label pt-0">Administrator login</label>
            <input type="text" placeholder="Administrator login" required 
                className="form-control" name="login"
                onChange={(e) => this.setState({login: e.currentTarget.value})}/>
        </div>

        <div className="form-group">
            <label htmlFor="password" className="col-form-label pt-0">Password</label>
            <input type="password" placeholder="Password" required
                className="form-control" name="password"
                onChange={(e) => this.setState({password: e.currentTarget.value})}/>
        </div>

        <button
            type="submit"
            variant="info"
            className="btn btn-info"
            disabled={this.state.isLoading}>
            {/* <b-spinner v-if="isLoading" small type="grow" /> */}
            { this.getLoginButtonText() }
        </button>

        {this.state.logInError &&
        <p className="alert alert-danger mt-3" variant="danger">
            {this.state.logInError}
        </p>}
        </form>
    </article>
    };
}
  
export default Login = connect()(Login);
