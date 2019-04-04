import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

export default class Signin extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
    }

    saveToState = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION} 
                variables={this.state}
                refetchQueries={[
                    { query: CURRENT_USER_QUERY }
                ]}
            >
                {(signin, { error, loading }) => {
                    return (
                        <Form method="post" onSubmit={async event => {
                            event.preventDefault();

                            await signin();
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign into your account</h2>
                                <Error error={error} />
                                <label htmlFor="email">
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        value={this.state.email}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <button type="submit">Sign in!</button>
                            </fieldset>
                        </Form>
                    );
                }}
            </Mutation>
        )
    }
}

export { SIGNIN_MUTATION };
