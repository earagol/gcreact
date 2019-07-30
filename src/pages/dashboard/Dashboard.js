import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    BackHandler
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import Loading from '../../components/Loading';

import VisualTienda from "./VisualTienda"

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            dashboard:null,
            loading:true
        }
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        return true;
    };

    _loadInitialState = async () => {
        let token = JSON.parse(await AsyncStorage.getItem('token'));
        let usuario = JSON.parse(await AsyncStorage.getItem('usuario'));
        autorizacion = token+'-'+usuario.id+'-'+null;

        fetch('http://certificacion.ripley.gcapp.cl/api/estadisticas',{
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':autorizacion
          }
        })
        .then( (response) => response.json() )
        .then( (res) => {

            this.setState({
                dashboard: res,
                loading:false
            });
    
        });
    }

    _renderDashboard(){
        
        if(this.state.dashboard){
            let modulos = Object.keys(this.state.dashboard.data);

            return modulos.map( (modulo,i) => {
                
                switch(modulo){
                    case 'visual':
                        datos = this.state.dashboard.data.visual;
                        return <VisualTienda key={i} datos={datos} />
                    default:
                        return null
                }
            
            });
        }else{
            return null;
        }
        
    }
      
    render(){ 
        if(this.state.loading){
            return (<Loading />)
        }
        return(
            <View style={{flex:1}} >
                {this._renderDashboard()}
            </View>
        );
    }
}