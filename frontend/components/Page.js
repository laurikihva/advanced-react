import React from 'react'

import Header from './Header';
import Meta from './Meta';

export default class Page extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Meta />
                <Header />
                {this.props.children}
            </React.Fragment>
        )
    } 
}
