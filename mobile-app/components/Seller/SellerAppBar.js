import { View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SellerAppBar = ({navigation}) => {
  const navigate = useNavigation()
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            AsyncStorage.removeItem("userData")
            navigate.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <TouchableOpacity>
        <Ionicons name="notifications" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Ionicons name="log-out" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default SellerAppBar;
