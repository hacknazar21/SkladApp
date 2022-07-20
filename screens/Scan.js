import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';


export default function Scan({ navigation, route }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned')
    const [code, setCode] = useState({})
    Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true
    });
    const loadScreen = (screen, product) => {
        if (route.params.forscan)
            navigation.navigate(route.params.forscan, { product });
        else {
            const name = route.params.name
            const ID = route.params.ID
            navigation.navigate(screen, { product, name, ID });
        }
    }
    this.sound = new Audio.Sound();

    const status = Audio.Sound.createAsync(
        { shouldPlay: true }
    );
    this.sound.loadAsync(require('../assets/sounds/beep.mp3'))
    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }
    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);
    const getClientsFromApiAsync = async (code) => {
        try {
            const response = await fetch(
                `https://sklad.onedevelop.kz/mobileReq.php?scan=${code}`
            );
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    };
    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data)
        this.sound.playAsync()
        getClientsFromApiAsync(data).then((res) => {
            setCode(res)
        })
        console.log('Type: ' + type + '\nData: ' + data)
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    // Return the View
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }} />
            </View>
            <Text style={styles.maintext}>{text}</Text>

            {scanned && <Button title={'Сканировать еще раз'} onPress={() => setScanned(false)} color='tomato' />}
            {scanned && <Button title={'Подтвердить'} onPress={() => loadScreen('Add', code)} color='tomato' />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    }
});