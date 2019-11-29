import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd';
import { FORM_IMAGES } from './../constants/CoreContants';
import { history } from './../utils/history.utils';
import { userActions } from '../actions';

class LoginContainer extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const{dispatch} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                dispatch(userActions.login({values}));
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                <div className={'text-center'}>
                    <div className={'div-center login-container with-30em'}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <img alt={'Logo'} className={'width-50 m-b-10'} src={FORM_IMAGES.LOGO_IMG} />
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <div className={'width-50 login-btn padding-r-10'}>
                                <Button block type="primary" htmlType="submit" className="login-form-button ">Log in</Button>
                            </div>
                            <div className={'width-50 login-btn padding-l-10'}>
                                <Button onClick={() => history.push('/registration')} block type="danger" className={''}>Sign Up</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

const WrappedLoginForm = Form.create({ name: '_login' })(LoginContainer);


const Container = connect(mapStateToProps)(WrappedLoginForm);

export { Container as LoginContainer };