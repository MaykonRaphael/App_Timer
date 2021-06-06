import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

    const [ state, setState ] = useState('selecionar');

    const [ seconds, setSeconds ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);

    const [ alarm, setAlarm ] = useState([
        {
            id:1,
            selected: true,
            sound: 'alarm 1',
            file: 'alarm1.mp3',
        },
        {
            id:2,
            selected: false,
            sound: 'alarm 2',
            file: 'alarm2.mp3',
        },
    ]);

    var numbers = [];
    for(var i = 1; i <= 60; i++) {
        numbers.push(i);
    }

    function setAlarmSelected(id) {
        let alarms = alarm.map(function(val){
            if(id != val.id )
                val.selected = false;
            else
                val.selected = true;
            return val;
        });

        setAlarm(alarms);
    }
    if( state == 'selecionar' ) {
        return (
            <View style={styles.container}>
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
                <Text style={{color: '#FFF', fontSize:30}} >Selecione o seu tempo</Text>
                {
                Platform.OS === 'android' ?
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#FFF', paddingTop: 16}} >Min:</Text>
                        <Picker
                            selectedValue={minutes}
                            style={{ width: 100, color: '#FFF' }}
                            mode="dropdown"
                            onValueChange={(itemValue, itemIndex) => setMinutes(itemValue)}
                        >
                            
                            {
                                numbers.map(function(val){
                                    return(<Picker.Item label={val.toString()} value={val.toString()} />);
                                })
                            }
                        </Picker>

                        <Text style={{color: '#FFF', paddingTop: 16}} >Seg:</Text>
                        <Picker
                            selectedValue={seconds}
                            style={{ width: 100, color: '#FFF'}}
                            mode="dropdown"
                            onValueChange={(itemValue, itemIndex) => setSeconds(itemValue)}
                        >
                            <Picker.Item label="0" value="0"/>
                            {
                                numbers.map(function(val){
                                    return(<Picker.Item label={val.toString()} value={val.toString()} />);
                                })
                            }
                        </Picker>
                    
                    </View>
                :
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#FFF', paddingTop: 97}} >Min:</Text>
                        <Picker
                            selectedValue={minutes}
                            itemStyle={{ width: 100, color: '#FFF' }}
                            onValueChange={(itemValue, itemIndex) => setMinutes(itemValue)}
                        >
                            {
                                numbers.map(function(val){
                                    return(<Picker.Item label={val.toString()} value={val.toString()} />)
                                })
                            }
                        </Picker>

                        <Text style={{color: '#FFF', paddingTop: 97 }} >Seg:</Text>
                        <Picker
                            selectedValue={seconds}
                            itemStyle={{ width: 100, color: '#FFF' }}
                            onValueChange={(itemValue, itemIndex) => setSeconds(itemValue)}
                        >
                            <Picker.Item label="0" value="0"/>
                            {
                                numbers.map(function(val){
                                    return(<Picker.Item label={val.toString()} value={val.toString()} />)
                                })
                            }
                        </Picker>
                    
                    </View>
                }

                <View style={{flexDirection: 'row'}} >
                    {
                        alarm.map(function(val){
                            if(val.selected) {
                                return(
                                    <TouchableOpacity onPress={()=> setAlarmSelected(val.id)} style={styles.buttonSelected} >
                                        <Text style={{color: '#FFF', }}>{val.sound}</Text>
                                    </TouchableOpacity>
                                )
                            } else {
                                return(
                                    <TouchableOpacity onPress={()=> setAlarmSelected(val.id)} style={styles.button} >
                                        <Text style={{color: '#FFF'}}>{val.sound}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                </View>
                <TouchableOpacity style={styles.startButton} ><Text style={styles.textStart} >Iniciar</Text></TouchableOpacity>
            </View>
        );
    } else if( state == 'iniciar' ) {
        //nada nao
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelected: {
        marginRight: 10,
        padding: 8,
        backgroundColor: 'rgba(116, 67, 191, 0.4)',
        borderRadius: 10,
        borderColor: '#FFF',
        borderWidth: 1,
    },
    button: {
        marginRight: 10,
        padding: 8,
        backgroundColor: 'rgb(116, 67, 191)',
        borderRadius: 10,
    },
    startButton: {
        backgroundColor: 'rgb(116, 67, 191)',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        marginTop: 40,
        borderColor: '#FFF',
        borderWidth: 2,
    },
    textStart: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20
    }
});
