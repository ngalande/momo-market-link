import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/SellerHome/Home";
import Transactions from "../screens/SellerHome/Transactions";
import Ionicons from "@expo/vector-icons/Ionicons";
import Users from "../screens/SellerHome/Users";

const Tab = createBottomTabNavigator();

export function SellerNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarLabel: "Users",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
