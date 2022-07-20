import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';


export default function Search({ navigation, route }) {

    const newProducts = []

    for (const product of route.params.products) {
        newProducts.push(
            <View style={styles.productBox} key={product["ID"]}>
                <View style={styles.productBoxTitle} >
                    <Text style={styles.productTitle}>{product["Название"]}</Text>
                </View>
                <View style={styles.productBoxBody}>
                    <View style={styles.productBodyItem}>
                        <Text style={styles.productBodyItemName}>Расположение:</Text>
                        <Text style={styles.productBodyItemValue}>{product["Расположение"]}</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.productBodyItem}>
                        <Text style={styles.productBodyItemName}>Артикул:</Text>
                        <Text style={styles.productBodyItemValue}>{product["Артикул"]}</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.productBodyItem}>
                        <Text style={styles.productBodyItemName}>Штрих-код:</Text>
                        <Text style={styles.productBodyItemValue}>{product["Штрих-код"]}</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.productBodyItem}>
                        <Text style={styles.productBodyItemName}>Фактическое количество:</Text>
                        <Text style={styles.productBodyItemValue}>{product["Фактическое количество"]} ед</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Результат поиска по слову:</Text>
                <Text style={styles.input}>{route.params.search}</Text>
            </View>
            <ScrollView style={styles.productsBox}>
                {newProducts}
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