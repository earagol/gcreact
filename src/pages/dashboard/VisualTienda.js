import React, {Component} from "react"
import{
    View,
    StyleSheet,
    Text,
    FlatList
} from "react-native"


export default class VisualTienda extends Component {
    constructor(props){
        super(props);
    }

    _renderItem(item){
        return(
            <View style={{alignItems:'center',width: 115,height: 80}}>
                <Text style={{fontSize:15,color:item.color}}>{item.cantidad}</Text>
                <Text style={{fontSize:11,color:'black',marginTop:10}}>{item.nombre}</Text>
            </View>
        )
    }

    render(){
        const {nombre} = this.props.datos;
        const {estadisticas,reportes_implementados,reportes_sin_implementar,promedio,total_reportes} = this.props.datos.data;
        return(
            <View style={{padding:10,height:'50%',width:'100%'}}>
                <Text>{nombre}</Text>

                <FlatList
                        numColumns={3}
                        columnWrapperStyle={{marginTop:3,marginLeft:5}}
                        data={estadisticas}
                        renderItem={({item}) => this._renderItem(item)}
                    />

                <Text style={{padding:20,alignItems:'center',width:'100%'}}>Campañas Implementadas: { reportes_implementados } de { total_reportes }</Text>
                
            </View>
            
        )
    }
}