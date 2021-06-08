import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Counter(props) {
    return(
        <View style={styles.container} >
            <StatusBar style='light' />

            <LinearGradient
                colors={['rgba(59,29,105,1)', 'rgba(59,29,105,0.7)']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '100%'
                }}
            />
            <View style={{flexDirection:'row'}}>
                <Text style={styles.textCounter} >{props.minutes} : </Text>
                <Text style={styles.textCounter} >{props.seconds}</Text>
            </View>
            <TouchableOpacity onPress={()=> props.setState('selecionar')} style={styles.resetButton} ><Text style={styles.textReset} >Iniciar</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textCounter: {
        color: '#FFF',
        fontSize: 40,
    },
    resetButton: {
        backgroundColor: 'rgb(116, 67, 191)',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        marginTop: 40,
        borderColor: '#FFF',
        borderWidth: 2,
    },
    textReset: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20
    },
});