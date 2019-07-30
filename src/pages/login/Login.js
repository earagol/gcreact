import React, {Component} from "react";
import {
    View,
    TextInput,
    Image,
    StyleSheet,
    ImageBackground,
    Text,
    TouchableHighlight,
    AsyncStorage,
    ActivityIndicator
} from "react-native";

//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import Loading from '../../components/Loading';

export default class Login extends Component{
    constructor(){
        super()
        this.state = {
            usuario:'',
            clave:'',
            opacidad:0.5,
            editar:false,
            loading:true
        }
    }

    componentDidMount(){
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        await AsyncStorage.getItem('token').then( valor => {
            console.log('siii',valor);
            this.setState({loading:false});
            if(valor != null){
                console.log('dash',valor);
                Actions.dashboard();
            }else{
                console.log('app',valor);
            }
        });
    }

    _handlePressUsuario(text){
        editar = false;
        if(text !== ''){
            editar = true;
        }
        this.setState({
            usuario:text,
            editar:editar
        });
    }

    _handlePressClave(text){
        opacidad= 0.5;
        if(text !== ''){
            opacidad = 1;
        }
        this.setState({
            clave:text,
            opacidad:opacidad
        });
    }

    login(){
        this.setState({loading:true});
        fetch('http://certificacion.ripley.gcapp.cl/front/api/usuarios/login',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            usuario: this.state.usuario,
            clave: this.state.clave
          })
        })
        .then( (response) => response.json() )
        .then( (res) => {
          this.setState({

          });

          if(res.status){
            AsyncStorage.setItem('token', JSON.stringify(res.sessionid));
            AsyncStorage.setItem('usuario', JSON.stringify(res.usuario));
            Actions.dashboard({prueba:"chaoooo"});
          }else{
            this.setState({loading:false});
            console.log('error de usuario o clave, programar est funcion');
          }
    
        });
    }//Fin login

    render(){
        if(this.state.loading){
            return (
                <Loading />
            )
        }
        return(
            <ImageBackground
                    style={{width:'100%',height:'100%',flex:1}}
                    source={require('../../images/login/fondo_login.jpg')}
                >
                    <View style={style.container}>
                        <View style={{flex:1}}>
                            <Image 
                                source={require('../../images/login/logotipo-login.png')}
                            />
                        </View>
                        

                        <View style={style.inputsContainer}>
                            <TextInput 
                                style={style.input}
                                placeholder='Usuario'
                                placeholderTextColor='black'
                                onChangeText={ (text) => this._handlePressUsuario(text) }
                            />

                            <TextInput 
                                style={style.input}
                                placeholder='Clave'
                                placeholderTextColor='black'
                                editable={ this.state.editar }
                                onChangeText={ (text) => this._handlePressClave(text) }
                            />
                        </View>

                        <View style={style.botonContainer}>
                            <TouchableHighlight onPress={ () => this.login() } >
                                <View>
                                    <Text style={[style.textButton,{opacity:this.state.opacidad}]}>INGRESAR</Text>
                                </View>
                            </TouchableHighlight>
                            <View style={style.recoveryContainer}>
                                <Text style={style.olvidaste}>¿Olvidaste tu clave?</Text>
                                <Text style={style.recuperar}> Recuperar clave</Text>
                            </View>
                        </View>

                    </View>
            </ImageBackground>
            
        );
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        flexDirection:'column',
        alignItems:'center',
        padding:15,
        marginTop:40
    },
    inputsContainer:{
        flex:2,
        width:'100%',
        flexDirection:'column',
        marginTop:30
    },
    input:{
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'black',
        fontSize:15
    },
    botonContainer:{
        width:'100%',
        marginBottom:20
    },
    textButton:{
        width:'100%',
        backgroundColor:'black',
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        padding:7
    },
    recoveryContainer:{
        width:'100%',
        marginTop:10,
        flexDirection:'row'
    },
    olvidaste:{
        width:'50%',
        color:'black',
        fontSize:15
    },
    recuperar:{
        width:'50%',
        color:'black',
        fontWeight:'bold',
        fontSize:15
    }
});