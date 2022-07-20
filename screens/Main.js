import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Button, Alert, Image, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Search from '../assets/search.png';
import Load from '../assets/search.gif';

export default function Main({ navigation }) {
    const [search, setSearch] = useState('')
    const [iconsearch, setIconsearch] = useState(Search)
    const loadScreen = (screen, type) => {
        navigation.navigate(screen, { type });
    }

    const searchAction = (search) => {
        const getClientsFromApiAsync = async () => {
            try {
                setIconsearch(Load)
                const response = await fetch(
                    `https://sklad.onedevelop.kz/mobileReq.php?type=search&value=${search}`
                );
                const json = await response.json();
                return json;
            } catch (error) {
                setIconsearch(Search)
                Alert.alert(
                    "Введенные вами данные не найдены в БД"
                )
            }
        };
        if (search != '') {
            getClientsFromApiAsync().then((response) => {
                setIconsearch(Search)
                const products = response.Products
                if (response.ok) {
                    navigation.navigate('Search', { products, search });
                }
                else {
                    Alert.alert(
                        "Введенные вами данные не найдены в БД"
                    )
                }
            })
        }
    }
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <Image
                        style={styles.searchBtn}
                        source={iconsearch}
                        onTouchEnd={() => { searchAction(search) }}
                    />
                    <TextInput style={styles.input} placeholder="Артикул, Штрихкод, Наименование" value={search} onChangeText={(value) => { setSearch(String(value)) }}></TextInput>
                </View>
                <View style={[styles.button, styles.mainButton]} onTouchEnd={() => { loadScreen('Client', 'Прием') }}>
                    <Text style={[styles.mainTitle, { fontWeight: '800', fontSize: 18 }]}>
                        Принять товар
                    </Text>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/get.png')}
                    />
                    <Text style={styles.mainTitle}>
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                    </Text>
                </View>
                <View style={styles.button} onTouchEnd={() => { loadScreen('Client', 'Выдача') }}>
                    <Text style={[styles.titleText, { fontWeight: '800', fontSize: 18 }]}>
                        Отдать товар
                    </Text>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/leave.png')}
                    />
                    <Text style={styles.titleText}>
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                    </Text>
                </View>
                <View style={styles.button} onTouchEnd={() => { loadScreen('Cells', 'Ревизия') }}>
                    <Text style={styles.titleText}>
                        Ревизия
                    </Text>
                </View>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        flexGrow: 3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    searchBtn: {
        position: 'absolute',
        top: 14,
        left: 10,
        width: 24,
        height: 24,
        zIndex: 5
    },
    inputBox: {
        marginBottom: 14,
        width: '100%',
        zIndex: 0,
        position: 'relative'
    },
    inputLabel: {
        marginBottom: 10,
        color: '#000000',
        zIndex: 0,
        fontSize: 18,
        fontWeight: '600'
    },
    input: {
        fontSize: 16,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        color: '#343A40'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        fontSize: 18,
        width: '100%',
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#3A57E8',
    },
    mainButton: {
        backgroundColor: '#3A57E8',
    },
    mainTitle: {
        color: '#fff',
        textAlign: 'center',
    },
    tinyLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 40,
        marginTop: 40,
        width: 30
    },
    titleText: {
        color: '#3A57E8',
        textAlign: 'center',
    }
});