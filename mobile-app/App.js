import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { SellerNavigation } from "./navigation/Seller";
import { BuyerNavigation } from "./navigation/Buyer";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Seller" component={SellerNavigation} />
          <Stack.Screen name="Buyer" component={BuyerNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
