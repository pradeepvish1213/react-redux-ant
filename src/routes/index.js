import React, { Component, Fragment } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginContainer, RegistrationContainer } from './../containers'
import { PrivateRoute } from './../components/PrivateRouteComponent'
import { history } from './../utils'
import { notification } from 'antd'

class Routes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      loading: false
    };
  }

  componentDidMount() {
    const { authenticationReducer } = this.props;
    console.log('Authentication :', authenticationReducer);
    this.setState({ isLogin: (authenticationReducer.length > 0 ? (authenticationReducer.user.token ? true : false) : false) });
  }

  componentDidUpdate(preveProps, preveStates) {
    const { alertReducer, authenticationReducer,loadingReducer } = this.props;

    if (preveProps.alertReducer !== alertReducer) {
      if (alertReducer.type === 'alert-danger') {
        this.openNotificationWithIcon('error', 'Login Notification', alertReducer.message);
      }

      if (alertReducer.type === 'alert-success') {
        this.openNotificationWithIcon('success', 'Login Notification', alertReducer.message);
      }
    }

    if(preveProps.loadingReducer!==loadingReducer){
      console.log('Loading bar :', loadingReducer.is_loading)
      this.setState({ loading: loadingReducer.is_loading });
    }

    if (preveProps.authenticationReducer !== authenticationReducer) {
      this.setState({ isLogin: (authenticationReducer.length > 0 ? (authenticationReducer.user.token ? true : false) : false) });
    }
  }

  openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  render() {
    return (
      <Router history={history}>
        {this.state.loading && <Fragment>
          <div className="loading">
            <div className="loader"></div>
          </div>
        </Fragment>
        }
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/registration" component={RegistrationContainer} />
          <Route path="/" component={LoginContainer} />
          <PrivateRoute path={'/home'} component={'HomeContainer'} />
        </Switch>
      </Router>)
  }
}


function mapStateToProps(state) {
  const { alertReducer, authenticationReducer,loadingReducer } = state;
  return { alertReducer, authenticationReducer,loadingReducer }
}

const Container = connect(mapStateToProps)(Routes);

export { Container as Routes };
