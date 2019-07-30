import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';


function Loading(){
        return (
            <View style={[style.activity]}>
                <ActivityIndicator size="large" color="black" />
            </View>
        )
}

style = StyleSheet.create({
    activity:{
        flex:1,
        justifyContent:'center'
    }
});

export default Loading;