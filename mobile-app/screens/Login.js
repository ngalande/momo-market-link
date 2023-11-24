import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../assets/mml.png";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      // await AsyncStorage.removeItem('userData');
        AsyncStorage.getItem('userData').then(value => {
          const jsonObject = JSON.parse(value);
          // console.log(jsonObject);
          setData(jsonObject)
          if(jsonObject){
            if(jsonObject.role == 'buyer'){
              navigation.navigate("Buyer");
            }else{
              navigation.navigate("Seller");
            }

          }

          // setData(jsonObject)

        }).catch(e => {
          console.log(e)
        })
       

    };
    getData()
  }, [data])
  
  const onLogin = async() => { 
    if(phone.length <= 0){
      Alert.alert('Phone Number', 'Phone Number is require')
    }else if(password.length <= 0){
      Alert.alert('Password', 'Password is require')
    }else{
      
      setIsLoading(true)
      const body = {
        phone: phone,
        password: password
      }
      console.log(body)
      axios.post('https://mml-backend.vercel.app/loginuser', body)
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
   }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flex:1,alignItems:"center",gap:12,justifyContent:"center"}}>
        <Text style={{ color: "orange", fontSize: 32 }}>Sign in</Text>
        <Image source={Logo} style={{ objectFit:"cover",width:120,height:120,marginTop:18}} />
        <Text style={{fontSize:18,marginTop:12}}>Log into your acount</Text>
        <TextInput style={styles.input} value={phone}
            onChangeText={(text) => setPhone(text)}  placeholder="Phone" />
        <TextInput style={styles.input} value={password} secureTextEntry
            onChangeText={(text) => setPassword(text)} placeholder="Password" />
        <View style={styles.forgot}>
          <TouchableOpacity>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
        style={styles.button}
        onPress={onLogin}
        disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={'#fff'} size={30} />
          ):(
            <Text style={{ color: "white", fontSize: 18 }}>Login</Text>

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
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "orange" }}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#d3d3d3",
    width: "100%",
    padding: 12,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "orange",
    width: "100%",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  forgot: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
  },
});
