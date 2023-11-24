import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from '@react-native-async-storage/async-storage';



const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const accountTypes = ["buyer", "seller"];

  const handleRegister = () => {
    if(phone.length <= 0){
      Alert.alert('Phone Number', 'Phone Number is require')
    }else if(password.length <= 0){
      Alert.alert('Password', 'Password is require')
    }else if(password !== confirmPassword){
      Alert.alert('Password', 'Password must match')
    }else{
      
      setIsLoading(true)
      const body = {
        "name": fullName,
        "address": address,
        "phone": phone,
        "email":email,
        "password": password,
        "role": selectedAccountType //seller, buyer
    }
      console.log(body)
      axios.post('https://mml-backend.vercel.app/createuser', body)
        .then(async(res) => {
          console.log(res.data.data.role)
          await AsyncStorage.setItem('userData', JSON.stringify(res.data.data));
          if(res.data.data.role == 'buyer'){
            navigation.navigate("Buyer");
          }else if(res.data.data.role == 'seller'){
            navigation.navigate("Seller");
          }
        }).catch(e => {
          console.log(e)
          if(e.response?.data?.status == 404){
            Alert.alert('Account Not Found', 'The user account does not exist')
          }else{
            Alert.alert('Unknown Error', 'Failed to login, try again')
          }
        }).finally(() => setIsLoading(false))
    }
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ color: "orange", fontSize: 32 }}>Register</Text>
          <Text>Create your new account</Text>
          <TextInput
            style={styles.input}
            placeholder="Fullname"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
          />
          <SelectDropdown
            buttonStyle={{
              backgroundColor: "#d3d3d3",
              width: "100%",
              borderRadius: 10,
            }}
            defaultButtonText="Choose Account Type"
            data={accountTypes}
            onSelect={(selectedItem, index) =>
              setSelectedAccountType(selectedItem)
            }
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            defaultValueByIndex={0}
          />
          <TouchableOpacity onPress={handleRegister} style={styles.button}>
          {isLoading ? (
            <ActivityIndicator color={'#fff'} size={30} />
          ):(
            <Text style={{ color: "white", fontSize: 18 }}>Register</Text>

          )}
            
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginTop: 12,
            }}
          >
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "orange" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#d3d3d3",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "orange",
    width: "100%",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
});
