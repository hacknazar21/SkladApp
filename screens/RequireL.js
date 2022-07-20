import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Alert, ScrollView } from 'react-native';


export default function RequireL({ navigation, route }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);

    const loadScreen = (screen, product) => {
        const name = route.params.ID.name
        const ID = route.params.ID.ID
        navigation.navigate(screen, { product, name, ID });
    }
    const getClientsFromApiAsync = async () => {
        try {
            const response = await fetch(
                'https://sklad.onedevelop.kz/mobileReq.php?type=getLeave'
            );
            const json = await response.json();

            return json;
        } catch (error) {
            console.error(error);
        }
    };
    getClientsFromApiAsync().then((clients) => {
        const newProducts = []
        for (const product of clients['Products']) {
            if (product["ID_Клиента"] == route.params.ID.ID) {
                newProducts.push(
                    <View style={styles.productBox} key={product["ID"]}>
                        <View style={styles.productBoxTitle} onTouchEnd={() => { loadScreen('Leave', product) }}>
                            <Text style={styles.productTitle}>{product["Название"]}</Text>
                            <Image
                                style={styles.arrow}
                                source={require('../assets/arrow.png')}
                            />
                        </View>
                        <View style={styles.productBoxBody}>
                            <View style={styles.productBodyItem}>
                                <Text style={styles.productBodyItemName}>Склад:</Text>
                                <Text style={styles.productBodyItemValue}>{product["Расположение"]}</Text>
                            </View>
                            <View style={styles.separator}></View>
                            <View style={styles.productBodyItem}>
                                <Text style={styles.productBodyItemName}>Количество:</Text>
                                <Text style={styles.productBodyItemValue}>{product["Фактическое количество"]} ед</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        }
        setProducts(newProducts)
    });
    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Пользователь</Text>
                <Text style={styles.input}>{route.params.ID.name}</Text>
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Запрос на выдачу товара</Text>
            </View>
            <ScrollView style={styles.productsBox}>
                {products}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10,
        paddingTop: 30
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
        top: '53%',
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