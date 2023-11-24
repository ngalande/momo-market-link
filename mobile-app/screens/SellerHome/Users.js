import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    const getData = async () => {
      // await AsyncStorage.removeItem('userData');
        AsyncStorage.getItem('userData').then(value => {
          const jsonObject = JSON.parse(value);
          // console.log(jsonObject);
          if(jsonObject){
            setData(jsonObject)


          }

          // setData(jsonObject)

        }).catch(e => {
          console.log(e)
        })
       

    };
    getData()
  }, [data])

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://mml-backend.vercel.app/getallbuyers"
      );
      if (response.status === 200) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleTransactionPress = (user) => {
    setSelectedUser(user);
    toggleModal();
  };

  const handleConfirmTransaction = () => {
    // Add your logic for confirming the transaction
    // For now, just close the modal
    setIsLoading(true)
    const body = {
      "buyerId": selectedUser.uid,
      "sellerId": data.uid,
      "sellerPhone": data.phone,
      "debitAmount": transactionAmount, //required
      "externalId": "ksjdnfd",//required
      "buyerPhone": selectedUser.phone,
      "payerMessage": "MoMo",//required
      "payeeNote": "string",//required
      "deliveryDuration": 7, //days
      "serviceType": "Mobile",
      "city": "Lusaka"
  }
    axios.post('https://mml-backend.vercel.app/requesttopay', body).then(res => {
      console.log(res.data)
      setModalVisible(false);
      Alert.alert('Successful', 'Transaction completed successful')
    }).catch(e => {
      setModalVisible(false);
      Alert.alert('Error', 'An error occured while processing your request please try again')
      console.log(e)
    }).finally(() => setIsLoading(false))
    // console.log(data)
    // setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Users</Text>
      <ScrollView scrollEventThrottle={16}>
        <View>
          {loading ? (
            <ActivityIndicator size={100} color="orange" />
          ) : (
            users.map((item, i) => (
              <View key={i} style={styles.card}>
                <View style={styles.userInfo}>
                  <Text style={styles.cardText}>Name: {item.name}</Text>
                  <Text style={styles.cardText}>Address: {item.address}</Text>
                  <Text style={styles.cardText}>Phone: {item.phone}</Text>
                  <Text style={styles.cardText}>Email: {item.email}</Text>
                  <Text style={styles.cardText}>Role: {item.role}</Text>
                </View>
                <TouchableOpacity
                  style={styles.transactionButton}
                  onPress={() => handleTransactionPress(item)}
                >
                  <Text style={styles.buttonText}>Transact</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Make Transaction</Text>
          <Text>{selectedUser?.name}</Text>
          <TextInput
            style={styles.amountInput}
            value={transactionAmount}
            onChangeText={(text) => setTransactionAmount(text)}
            placeholder="Enter Amount"
            keyboardType="numeric"
          />
          <View style={styles.modalButtons}>
          {isLoading ? (
            <ActivityIndicator color={'#000'} size={30} />
          ):(
            <>
              <Button title="Confirm" onPress={handleConfirmTransaction} />
              <Button title="Cancel" onPress={toggleModal} />
            </>

          )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "gray",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  userInfo: {
    flex: 1,
  },
  cardText: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
  },
  transactionButton: {
    backgroundColor: "orange",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  amountInput: {
    borderBottomWidth: 1,
    marginBottom: 16,
    width: "100%",
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Users;
