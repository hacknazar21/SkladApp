import React from "react";
import Client from "./screens/Client";
import Main from "./screens/Main";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Scan from "./screens/Scan";
import ScanIMEI from "./screens/ScanIMEI";
import Require from "./screens/Require";
import Add from "./screens/Add";
import RequireL from "./screens/RequireL";
import Leave from "./screens/Leave";
import Cells from "./screens/Cells";
import Cell from "./screens/Cell";
import Audit from "./screens/Audit";
import Search from "./screens/Search";



const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
                options={{ title: 'Главная' }}
            />
            <Stack.Screen
                name="Client"
                component={Client}
                options={{ title: 'Клиенты' }}
            />
            <Stack.Screen
                name="Cells"
                component={Cells}
                options={{ title: 'Ячейки' }}
            />
            <Stack.Screen
                name="Cell"
                component={Cell}
                options={{ title: 'Ячейка' }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{ title: 'Поиск' }}
            />
            <Stack.Screen
                name="Audit"
                component={Audit}
                options={{ title: 'Ревизия' }}
            />
            <Stack.Screen
                name="Require"
                component={Require}
                options={{ title: 'Клиент' }}
            />
            <Stack.Screen
                name="RequireL"
                component={RequireL}
                options={{ title: 'Клиент' }}
            />
            <Stack.Screen
                name="Scan"
                component={Scan}
                options={{ title: 'Сканирование' }}
            />
            <Stack.Screen
                name="ScanIMEI"
                component={ScanIMEI}
                options={{ title: 'Сканирование' }}
            />
            <Stack.Screen
                name="Add"
                component={Add}
                options={{ title: 'Прием' }}
            />
            <Stack.Screen
                name="Leave"
                component={Leave}
                options={{ title: 'Прием' }}
            />
        </Stack.Navigator>
    </NavigationContainer>;
}