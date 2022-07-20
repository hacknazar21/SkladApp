import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function Audit({ navigation, route }) {
    const [number, setNumber] = useState(0);
    const loadScreen = (Screen, cell) => {
        navigation.navigate(Screen, { cell });
    }
    const loadScan = (Screen, ID) => {
        const type = "audit"
        navigation.navigate(Screen, {
            onGoBack: (isReal) => { console.debug(number); setNumber(number + parseInt(isReal)) },
            ID,
            type
        });
    }
    const scan = route.params.product["IMEI"] == '1' ? (
        <View style={styles.inputBox} onTouchEnd={() => { loadScan('ScanIMEI', route.params.product) }}>
            <Image
                style={styles.scan}
                source={require('../assets/scanIMEI.png')}
            />
        </View>
    ) : null
    const scanLabel = route.params.product["IMEI"] == '1' ? (
        <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Количество отсканированного IMEI</Text>
            <Text style={styles.input}>{number}</Text>
            <Text style={styles.inputUnits}> ед</Text>
        </View>
    ) : null
    const getClientsFromApiAsync = async () => {
        try {
            const response = await fetch(
                `https://sklad.onedevelop.kz/mobileReq.php?number=${number}&ID=${route.params.product["ID"]}`
            );
            const json = await response.json();

            return json;
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
            <ScrollView bounces={false} style={styles.container}>
                {scan}
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Склад - ряд</Text>
                    <Text style={styles.input} >{route.params.product["Расположение"]}</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Артикул</Text>
                    <Text style={styles.input}>{route.params.product["Артикул"]}</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Наименование товара</Text>
                    <Text style={styles.input}>{route.params.product["Название"]}</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Количество фактического товара</Text>
                    <TextInput value={number} onChangeText={(value) => { setNumber(value) }} keyboardType="number-pad" style={styles.input} placeholder={route.params.product["Фактическое количество"]}></TextInput>
                    <Text style={styles.inputUnits}> ед</Text>
                </View>
                {scanLabel}
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Масса всей позиции</Text>
                    <Text style={styles.input}>{route.params.product["Масса"]}</Text>
                    <Text style={styles.inputUnits}> кг</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Примечание</Text>
                    <Text style={styles.input}>{route.params.product["Примечание"]}</Text>
                </View>
                <View style={styles.buttonBox} onTouchEnd={() => {
                    number != '' ? getClientsFromApiAsync().then(
                        (response) => {
                            console.debug(response)
                            if (response.status == 'ok') {
                                loadScreen('Cell', route.params.product["Расположение"])
                            }
                        }
                    ) : null
                }}>
                    <Text style={styles.button} >Сохранить</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
    },
    button: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    },
    buttonBox: {
        paddingVertical: 21.5,
        marginTop: 150,
        marginBottom: 50,
        backgroundColor: '#3A57E8',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropDown: {
        borderColor: '#DFDFDF',
        borderRadius: 5,
        borderWidth: 1,
        zIndex: 2
    },
    inputBox: {
        marginBottom: 14,
        width: '100%',
        zIndex: 0,
        position: 'relative'
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#D9D9D9'
    },
    inputLabel: {
        marginBottom: 10,
        color: '#000000',
        zIndex: 0,
        fontSize: 18,
        fontWeight: '600'
    },
    scan: {
        maxWidth: '100%',
        height: 99,
        marginBottom: 7
    },
    input: {
        fontSize: 16,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        color: '#343A40'
    },
    arrow: {
        width: 24,
        height: 24,
    },
    inputUnits: {
        flex: 1,
        color: '#7E8795',
        position: 'absolute',
        right: 30,
        top: '60%',
    },
    productsBox: {
        width: '100%',
    },
    productBox: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        borderRadius: 5,
        marginBottom: 10
    },
    productBoxTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productTitle: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
        maxWidth: '80%'
    },
    productBodyItem: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productBodyItemName: {
        color: '#7E8795',
        fontSize: 14,
        lineHeight: 35
    },
    productBodyItemValue: {
        color: '#343A40',
        fontSize: 14,
        lineHeight: 35
    }
});