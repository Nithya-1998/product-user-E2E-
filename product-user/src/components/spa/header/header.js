import React from 'react';
import NavigationBar from './navbar';
import './header.css';

class Header extends React.Component {

    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
            </div>
        );
    }
}

export default Header;