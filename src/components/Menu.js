import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { Thumbnail } from 'native-base';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';

const {width,height} = Dimensions.get('window');

export default class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            menu:null,
            nombre: null,
            apellido: null,
            cargo:null,
            email:null,
            nombreDespliegue: null
        }

        this.accion = null;

        //this._redirectPages = this._redirectPages.bind(this);
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        await AsyncStorage.getItem('usuario').then( (value) => {
            usuario = JSON.parse(value)
            this.setState({
                menu:usuario.modulos,
                nombre:usuario.nombre,
                apellido:usuario.apellidos,
                cargo:usuario.cargo_nombre,
                email:usuario.email,
                nombreDespliegue:usuario.nombre+' '+usuario.apellidos
            })
        });
        
    }
    
    icono(icon){
        color = 'black';
        size = 28;
        switch(icon){
            case 'ion-home':
                return (
                    <Fontisto 
                        style={style.iconWithText}
                        name='home'
                        color={color}
                        size={size}
                    />
                )
            case 'ion-android-checkmark-circle':
                return (
                    <Ionicons 
                        style={style.iconWithText}
                        name='ios-checkmark-circle'
                        color={color}
                        size={size}
                    />
                )
            case 'ion-arrow-graph-up-right':
                    return (
                        <Foundation 
                            style={style.iconWithText}
                            name='graph-pie'
                            color={color}
                            size={size}
                        />
                    )
            case 'ion-speedometer':
                return (
                    <Ionicons 
                        style={style.iconWithText}
                        name='md-speedometer'
                        color={color}
                        size={size}
                    />
                )
            case 'ion-stats-bars':
                    return (
                        <Foundation 
                            style={style.iconWithText}
                            name='graph-bar'
                            color={color}
                            size={size}
                        />
                    )
            case 'ion-android-checkbox':
                    return (
                        <Ionicons 
                            style={style.iconWithText}
                            name='md-checkmark-circle-outline'
                            color={color}
                            size={size}
                        />
                    )
            case 'ion-speakerphone':
                    return (
                        <Ionicons 
                            style={style.iconWithText}
                            name='md-megaphone'
                            color={color}
                            size={size}
                        />
                    )
            case 'ion-ribbon-a':
                    return (
                        <Ionicons 
                            style={style.iconWithText}
                            name='ios-ribbon'
                            color={color}
                            size={size}
                        />
                    )
            case 'ion-folder':
                    return (
                        <Entypo 
                            style={style.iconWithText}
                            name='folder'
                            color={color}
                            size={size}
                        />
                    )
            default:
                return null;
        }
    }

    _redirectPages(data){
        accion =  null;
        switch(data.url_prefix){
            case 'inicio':
                Actions.dashboard();
                break;
            case 'visual':
                Actions.visualTienda();
                break;
            default:
                return  null;
        }
        return accion;
    }
    

    renderMenu(){
        if(this.state.menu){
            return this.state.menu.map( (data,i) => {
                return(
                    <TouchableWithoutFeedback key={i} onPress={ () => this._redirectPages(data)}>
                        <View  style={style.textWithIcon}>
                            <View style={style.withIcon}>
                                {this.icono(data.icon)}
                                <Text style={style.text}>{data.nombre}</Text>
                            </View>
                            <Icon 
                                style={style.rightIcon}
                                name='angle-right'
                                color='black'
                                size={25}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )
            });
        }else{
            return null
        }
    }

    cerrarSesion(){
        AsyncStorage.removeItem('usuario');
        AsyncStorage.removeItem('token');
        Actions.app();//envia al login que esta en app
    }

    render(){
        return(
            
                <View style={{flex:1}}>
                    <ScrollView>
                        <ImageBackground
                                style={style.containerTop}
                                source={require('../images/login/fondomenu.jpg')}
                            >

                            <Thumbnail
                                source={require('../images/resources/avatar.png')}
                                large
                            />
                            <Text style={{color:'#fff',fontSize: 18,marginTop: 10}}>{this.state.nombreDespliegue}</Text>
                            <Text style={{color:'#fff',fontSize: 15, marginTop: 10}}>{this.state.cargo}</Text>
                            <Text style={{color:'#fff',fontSize: 15}}>TIENDA FICTICIA</Text>
                            <Text style={{color:'#fff',fontSize: 13}}>{this.state.email}</Text>
                                
                        </ImageBackground>

                        <View style={{flex:2}}>
                            {this.renderMenu()}
                            <View  style={style.textWithIcon}>
                                <View style={style.withIcon}>
                                    <Foundation 
                                        style={style.iconWithText}
                                        name='key'
                                        color='black'
                                        size={28}
                                    />
                                    <Text style={style.text}>Cambiar de Clave</Text>
                                </View>
                                <Icon 
                                    style={style.rightIcon}
                                    name='angle-right'
                                    color='black'
                                    size={25}
                                />
                            </View>

                            <TouchableWithoutFeedback onPress={ () => this.cerrarSesion() }>
                                <View style={style.textWithIcon}>
                                    <View style={style.withIcon}>
                                        <AntDesign 
                                            style={style.iconWithText}
                                            name='logout'
                                            color='black'
                                            size={28}
                                        />
                                        <Text style={style.textSesion}>Cerrar Sesión</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={style.textWithIcon}>
                                <View style={style.iconWithText}>
                                    <Text style={style.text}>Versión: 6.2.26</Text>
                                </View>
                            </View>
                            
                        </View>
                    </ScrollView>
                </View>
            
        );
    }
}

const style = StyleSheet.create({
    containerTop:{
        flex:1,
        width:width,
        height:(height/3),
        alignItems: 'center',
        justifyContent:'center'
    },
    textWithIcon:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical: 15,
        borderColor: 'grey',
        borderBottomWidth:0.7,
        backgroundColor:'white',
        height:60
    },
    withIcon:{
        flexDirection:'row',
        alignItems:'center',
    },
    rightIcon:{
        paddingRight:20
    },
    iconWithText:{
        marginRight:20,
        paddingLeft:20,
        backgroundColor:'white'
    },
    text:{
        fontSize:15,
        color:'black',
        fontWeight:'100'
    },
    textSesion:{
        fontSize:15,
        color:'red',
        fontWeight:'100'
    }
});