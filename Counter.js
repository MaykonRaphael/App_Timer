import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

export default function Counter(props) {
    var done = false;
    
    useEffect(()=> {
        const timer = setInterval(()=> {
            props.setSeconds(props.seconds-1);

            if( props.seconds <= 0 ) {
                if( props.minutes > 0 ) {
                    props.setMinutes(minutes-1);
                    props.setSeconds(59);
                } else {
                    if( !done ) {
                        done = true;
                        props.setState('selecionar');
                        props.setMinutes(0);
                        props.setSeconds(0);
                        playAlarmsSound();
                    }
                }
            }
        }, 1000)

        return() => clearInterval(timer);
    })

    async function playAlarmsSound() {
        const soundObject = new Audio.Sound();
        try {
            var alarm;
            props.alarms.map(function(val) {
                if( val.selected ) {
                    alarm = val.file;
                }
            })
            await soundObject.loadAsync(alarm);
            await soundObject.playAsync();
        } catch(error) {
            alert('Error to get alarm');
        }
    }

    function reset() {
        props.setState('selecionar');
        props.setMinutes(0);
        props.setSeconds(0);
    }

    function formatNumber(number) {
        var finalNumber = "";
        if( number < 10 ) {
            finalNumber = "0"+number;
        } else {
            finalNumber = number;
        }
        return finalNumber;
    }

    var seconds = formatNumber(props.seconds);
    var minutes = formatNumber(props.minutes);

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
                <Text style={styles.textCounter} >{minutes} : </Text>
                <Text style={styles.textCounter} >{seconds}</Text>
            </View>
            <TouchableOpacity onPress={()=> reset()} style={styles.resetButton} ><Text style={styles.textReset} >Iniciar</Text></TouchableOpacity>
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