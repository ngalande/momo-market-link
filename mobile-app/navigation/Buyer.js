import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/BuyerHome/Home";
import Transactions from "../screens/BuyerHome/Transactions";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export function BuyerNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 14 } }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Transactions"
        options={{
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" color={color} size={size} />
          ),
        }}
        component={Transactions}
      />
    </Tab.Navigator>
  );
}
