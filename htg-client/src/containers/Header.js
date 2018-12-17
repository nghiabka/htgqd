import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Toolbar, AppBar, IconButton} from 'material-ui';
import { Menu, Home} from 'material-ui-icons';

class Header extends Component {
  render() {
    return (

        <AppBar position="static" title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more">

        </AppBar>

    );
  }
}

export default Header;
