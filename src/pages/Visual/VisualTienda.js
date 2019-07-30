import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Thumbnail } from 'native-base';

import Loading from '../../components/Loading';


export default class VisualTienda extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            data:null,
            estados: []
        };
    }

    componentDidMount(){
        this._estadosVisual().done();
        this._loadInitialState().done();
    }

    _estadosVisual = async () => {

        await fetch('http://certificacion.ripley.gcapp.cl/front/api/visuales/estados',{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':autorizacion
                    }
                })
                .then( (response) => response.json() )
                .then( (res) => {
                    // console.log(res.data);

                    this.setState({
                        estados: res.data
                    });
            
                });
    }

    _loadInitialState = async () => {
        let token = JSON.parse(await AsyncStorage.getItem('token'));
        let usuario = JSON.parse(await AsyncStorage.getItem('usuario'));
        autorizacion = token+'-'+usuario.id+'-'+null;
        fetch('http://certificacion.ripley.gcapp.cl/front/api/visuales/reportes',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':autorizacion
            }
        })
        .then( (response) => response.json() )
        .then( (res) => {
            console.log(res.data);
            reporte = new Array();

            let reportes = Object.keys(res.data);
            data = reportes.map( (element) => {
                return res.data[element];
            });

            data.pop();

            console.log(data);
            this.setState({
                data: data,
                loading:false
            });
    
        });
    }

    _renderItem(item){
        estado = this.state.estados.filter( element => element.id == item.estado).map( element => element.nombre);
        dayTermino = item.fecha_termino.day.real ? item.fecha_termino.day.real : null;
        monthTermino = item.fecha_termino.month.string ? item.fecha_termino.month.string : null;
        dayReporte = item.fecha_reporte.day.real ? item.fecha_reporte.day.real : null;
        monthReporte = item.fecha_reporte.month.string ? item.fecha_reporte.month.string : null;
        horaReporte = item.fecha_reporte.time ? item.fecha_reporte.time : null;
        lectura = item.fecha_lectura ? 'Leído' : 'No leído';
        nota = item.nota ? item.nota : 'no evaluado';

        return (<View  style={style.textWithIcon}>
                    <Thumbnail
                            style={style.thumbnail}
                            source={{uri:item.banner}}
                            large
                        />

                    <View style={{justifyContent:'center'}}>
                        
                        <Text style={style.text}>{item.nombre}</Text>
                        <Text style={style.text}>Estado: {estado[0]}</Text>
                        <Text style={style.text}>Término: {dayTermino} - {monthTermino}</Text>
                        <Text style={style.text}>Reporte: {dayReporte} - {monthReporte} {horaReporte}</Text>
                        <Text style={style.text}>Lectura: {lectura}</Text>
                        <Text style={style.text}>Nota: {nota}</Text>
                    </View>
                    <Icon 
                        style={style.rightIcon}
                        name='angle-right'
                        color='black'
                        size={25}
                    />
                </View>
        );
    }
    render(){

        if(this.state.loading){
            return (<Loading />)
        }

        return(
            <ScrollView>
                <View style={style.container}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => this._renderItem(item)}
                    />
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    textWithIcon:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical: 20,
        borderColor: 'grey',
        borderBottomWidth:0.7,
        backgroundColor:'white',
        height:180
    },
    withIcon:{
    },
    rightIcon:{
        paddingRight:20
    },
    iconWithText:{
        marginRight:20,
        paddingLeft:20,
        backgroundColor:'white'
    },
    thumbnail:{
        padding:15,
        marginRight:5
    }
});