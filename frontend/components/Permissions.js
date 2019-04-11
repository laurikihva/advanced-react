import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
                                {possiblePermissions.map(permission => <th>{permission}</th>)}
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map(user => <User user={user} />)}
                        </tbody>
                    </Table>
                </div>
            );
        }}
    </Query>
);

class User extends React.Component {
    render() {
        const user = this.props.user;

        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {possiblePermissions.map(permission => (
                    <td>
                        <label htmlFor={`${user.id}-permission-${permission}`}>
                            <input
                                id={`${user.id}-permission-${permission}`}
                                type="checkbox"
                            />
                        </label>
                    </td>
                ))}
                <td>
                    <SickButton>Update</SickButton>
                </td>
            </tr>
        );
    }
}

export default Permissions;
export { ALL_USERS_QUERY };
