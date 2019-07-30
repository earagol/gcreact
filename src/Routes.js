import React, {Component} from 'react';
import {
  Text
} from 'react-native';

import {Router, Stack, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';

import App from '../App';
import Menu from './components/Menu';
import Dashboard from './pages/dashboard/Dashboard';
import VisualTienda from './pages/Visual/VisualTienda'

const MenuIcon = () => {
	return (
		<Icon name="menu" size={30} color="black" />
	)
}


export default class Routes extends Component {
    render(){
        return(
            <Router>
                <Scene key="root" hideNavBar = {true}>
                  <Scene type="reset" key="app" component={App}  title="App"  initial={true}  />
                  <Scene 
                    key='drawer'
                    drawer
                    contentComponent={Menu}  
                    drawerIcon={MenuIcon}
                    drawerWidth={300}
                    hideNavBar={true}
                  >
                    <Scene key="dashboard" component={Dashboard} title="Dashboard" hideNavBar={false}   />
                    <Scene key="visualTienda" component={VisualTienda} title="GVM" hideNavBar={false}  />
                  </Scene>
                </Scene>
            </Router>
        )
    }
}

