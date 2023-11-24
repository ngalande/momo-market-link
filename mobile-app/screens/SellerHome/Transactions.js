import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';



const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    const uid = getData()
    // console.log(uid)
    getTransactions();
  }, []);
  const getData = async () => {
    // await AsyncStorage.removeItem('userData');
      AsyncStorage.getItem('userData').then(value => {
        const jsonObject = JSON.parse(value);
        console.log(jsonObject);
        if(jsonObject){
          setData(jsonObject)
        }

        // setData(jsonObject)

      }).catch(e => {
        console.log(e)
      })
     

  };


  const getTransactions = async () => {
    // console.log(data.uid)
    try {
      setLoading(true);
      const response = await axios.get(
        `https://mml-backend.vercel.app/getallsellertransactions?uid=mGOzBNbWvrPzI1rxJ0iIb2wi2dFaELjc`
      );
      if (response.status === 200) {
        setTransactions(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  // filter transactions by status
  const filteredTransactions = transactions.filter(
    (item) => item.status.toLowerCase() !== "completed"
  );

  const handleConfirmTransaction = () => {
    // Add your logic for confirming the transaction with the PIN
    // For now, just close the modal
    const body = {
      "referenceId" : selectedTransaction.referenceId,//required
      "confirmationPin": pin,//required
      "externalId": "kssad34jdnfd",//required
      "payerMessage": "MoMo",//required
      "payeeNote": "string"//required
  }
    console.log(selectedTransaction)
    axios.post('https://mml-backend.vercel.app/confirmdelivery', body).then(res => {
      console.log(res.data)
      setModalVisible(false);
      if(res.data.status == 202){

        Alert.alert('Successful', 'Transaction completed successful')
      }else{
        Alert.alert('Error', 'Pin confirmation failed')
      }
    }).catch(e => {
      setModalVisible(false);
      Alert.alert('Error', 'An error occured while processing your request please try again')
      console.log(e)
    }).finally(() => setIsLoading(false))
    // setModalVisible(false);
  };

  const handleTransactionPress = (transaction) => {
    setSelectedTransaction(transaction);
    // console.log(transaction)
    toggleModal();
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, gap: 8 }}>
      <Text>Seller Transactions</Text>
      <View>
        {loading ? (
          <ActivityIndicator size={100} color="orange" />
        ) : (
          filteredTransactions.map((item, i) => (
            <View key={i}>
              <View style={styles.transactionsCard}>
                <View style={{ gap: 4 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Ionicons name="person" />
                    <Text style={styles.userName}>{item.sellerData.name}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Ionicons name="navigate" color={"green"} />
                    <Text style={styles.userAddress}>
                      {item.sellerData.address}
                    </Text>
                  </View>
                  <Text style={{ color: "green" }}>K {item.debitAmount}</Text>
                </View>
                <Text
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  {item.status}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => handleTransactionPress(item)}
              >
                <Text style={styles.confirmButtonText}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Confirm Transaction</Text>
          <Text>{selectedTransaction?.sellerData.name}</Text>
          <Text>{selectedTransaction?.sellerData.address}</Text>
          <Text>K {selectedTransaction?.debitAmount}</Text>
          <TextInput
            style={styles.pinInput}
            value={pin}
            onChangeText={(text) => setPin(text)}
            placeholder="Enter PIN"
            secureTextEntry
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
  userName: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "600",
    color: "#696969",
  },
  userAddress: {
    textTransform: "capitalize",
    fontSize: 18,
    color: "gray",
  },
  transactionsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 4,
    marginBottom: 8,
    borderColor: "#d3d3d3",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  pinInput: {
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "aquamarine",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  confirmButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Transactions;
