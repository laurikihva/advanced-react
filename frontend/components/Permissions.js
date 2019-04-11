import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY {
        users {
            id
            name
            email
            permissions
        }
    }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId: ID!) {
        updatePermissions(permissions: $permissions, userId: $userId) {
            id
            permissions
            name
            email
        }
    }
`;

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({data, loading, error}) => {
            if (error) return <Error error={error} />;

            return (
                <div>
                    <h2>Manage Permissions</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                {possiblePermissions.map((permission, i) => <th key={i}>{permission}</th>)}
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map((user, i) => <UserPermissions key={i} user={user} />)}
                        </tbody>
                    </Table>
                </div>
            );
        }}
    </Query>
);

class UserPermissions extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            id: PropTypes.string,
            permissions: PropTypes.array,
        }).isRequired,
    };

    state = {
        permissions: this.props.user.permissions,
    }

    handlePermissionChange = (e) => {
        const checkbox = e.target;
        let updatedPermissions = [...this.state.permissions];

        if (checkbox.checked) {
            updatedPermissions.push(checkbox.value);
        } else {
            updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
        }

        this.setState({
            permissions: updatedPermissions,
        });
    }

    render() {
        const user = this.props.user;

        return (
            <Mutation
                mutation={UPDATE_PERMISSIONS_MUTATION}
                variables={{
                    permissions: this.state.permissions,
                    userId: this.props.user.id
                }}
            >
                {(updatePermissions, { loading, error }) => (
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        {possiblePermissions.map((permission, i) => (
                            <td key={i}>
                                <label htmlFor={`${user.id}-permission-${permission}`}>
                                    <input
                                        id={`${user.id}-permission-${permission}`}
                                        type="checkbox"
                                        checked={this.state.permissions.includes(permission)}
                                        value={permission}
                                        onChange={this.handlePermissionChange}
                                    />
                                </label>
                            </td>
                        ))}
                        <td>
                            <SickButton
                                type="button"
                                disabled={loading}
                                onClick={updatePermissions}
                            >
                                Updat{loading ? 'ing' : 'e'}
                            </SickButton>
                        </td>
                    </tr>
                )}
            </Mutation>
        );
    }
}

export default Permissions;
export { ALL_USERS_QUERY, UPDATE_PERMISSIONS_MUTATION };
