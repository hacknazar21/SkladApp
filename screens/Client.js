import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-gesture-handler';


export default function Client({ navigation, route }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const loadScreen = (screen, ID) => {
        navigation.navigate(screen, { ID });
    }
    const getClientsFromApiAsync = async () => {
        try {

            const response = await fetch(
                route.params.type == 'Прием' ? 'https://sklad.onedevelop.kz/mobileReq.php?type=getAll' : 'https://sklad.onedevelop.kz/mobileReq.php?type=getLeave'
            );

            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Клиент</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onOpen={
                        () => {
                            getClientsFromApiAsync().then((result) => {
                                const clientsArray = [];
                                for (const client of result['Clients']) {
                                    console.debug(result['IDs'])
                                    if (client["ID"] in result['IDs'])
                                        clientsArray.push({
                                            'label': client["Имя"], 'value': client["ID"], 'containerStyle': {
                                                backgroundColor: "rgba(58, 87, 232, 0.2)"
                                            }
                                        });
                                    else
                                        clientsArray.push({
                                            'label': client["Имя"], 'value': client["ID"]
                                        });
                                }
                                setItems(clientsArray);
                            })
                        }}
                    onSelectItem={
                        (selected) => {

                            loadScreen(route.params.type == 'Прием' ? 'Require' : 'RequireL', { 'name': selected.label, 'ID': selected.value })
                        }
                    }
                    style={styles.dropDown}
                    placeholder="Выбрать клиента"
                    labelStyle={{
                        fontSize: 16,
                        color: '#343A40',
                        paddingLeft: 10
                    }}
                    dropDownContainerStyle={{
                        borderWidth: 0,
                        marginTop: 10,
                        backgroundColor: '#fff',
                    }}
                />
            </View>
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
    inputLabel: {
        marginBottom: 6.5,
        color: '#7E8795',
        zIndex: 0
    },
    input: {
        fontSize: 16,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#DFDFDF',

    },
    inputUnits: {
        flex: 1,
        color: '#7E8795',
        position: 'absolute',
        right: 30,
        top: '53%',

    }
});