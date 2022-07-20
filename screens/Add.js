import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


export default function Add({ navigation, route }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [comment, setComment] = useState('');
    const [place, setPlace] = useState('');
    const [number, setNumber] = useState('');
    const [shift, setShift] = useState('');
    const loadScreen = (Screen, ID) => {
        const type = "add"
        navigation.navigate(Screen, {
            onGoBack: () => refresh(),
            ID,
            type
        });
    }
    const getClientsFromApiAsync = async () => {
        try {
            const response = await fetch(
                `https://sklad.onedevelop.kz/mobileReq.php?place=${place}&number=${number}&shift=${shift}&ID=${route.params.product["ID"]}&comment=${comment}`
            );
            const json = await response.json();

            return json;
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        refresh()
    }, []);
    const refresh = () => {
        if (route.params.product["IMEI"] == '1') {
            const getIMEIsFromApiAsync = async () => {
                try {
                    const response = await fetch(
                        `https://sklad.onedevelop.kz/mobileReq.php?type=getIMEI&article=${route.params.product["Артикул"]}`
                    );
                    const json = await response.json();
                    return json;
                } catch (error) {
                    console.error(error);
                }
            };
            getIMEIsFromApiAsync().then((resp) => {
                setNumber(resp['IMEI'].length.toString())
            })
        }
    }
    const col = route.params.product["IMEI"] == '1' ? 'Количество отсканированного IMEI' : 'Количество фактического товара'
    const scan = route.params.product["IMEI"] == '1' ? (
        <View style={styles.inputBox} onTouchEnd={() => { loadScreen('ScanIMEI', route.params.product) }}>
            <Image
                style={styles.scan}
                source={require('../assets/scanIMEI.png')}
            />
        </View>
    ) : null
    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
            <ScrollView bounces={false} style={styles.container}>
                {scan}
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Склад - ряд</Text>
                    <TextInput style={styles.input} value={place} onChangeText={(value) => { setPlace(value) }}></TextInput>
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
                    <Text style={styles.inputLabel}>Количество заявленного товара</Text>
                    <Text style={styles.input}>{route.params.product["Количество"]}</Text>
                    <Text style={styles.inputUnits}> ед</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>{col}</Text>
                    <TextInput keyboardType={'numeric'} value={number} onChangeText={(value) => { setNumber(value) }} style={styles.input}></TextInput>
                    <Text style={styles.inputUnits}> ед</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Масса всей позиции</Text>
                    <Text style={styles.input}>{route.params.product["Масса"]}</Text>
                    <Text style={styles.inputUnits}> кг</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Срок годности товара</Text>
                    <TextInput keyboardType={'numeric'} value={shift} onChangeText={(value) => { setShift(value) }} style={styles.input} placeholder={route.params.product["Срок годности"]}></TextInput>
                    <Text style={styles.inputUnits}>мес</Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Комментарий к товару</Text>
                    <TextInput style={styles.input} value={comment} onChangeText={(value) => { setComment(value) }} placeholder={route.params.product["Примечание"]}></TextInput>
                </View>
                <View style={styles.buttonBox} onTouchEnd={() => {
                    place != '' && number != '' && shift != '' ? getClientsFromApiAsync().then(
                        (response) => {
                            if (response.status == 'ok') {
                                loadScreen('Require', { 'name': route.params.name, 'ID': route.params.ID })
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
        height: 114,
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