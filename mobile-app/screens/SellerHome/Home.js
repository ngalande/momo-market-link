import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SellerAppBar from "../../components/Seller/SellerAppBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({navigation}) => {
  const [Transactions, SetTransactions] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getTransactions = async () => {
    try {
      setLoading(true);
      const reponse = await axios.get(
        `https://mml-backend.vercel.app/getallsellertransactions?uid=mGOzBNbWvrPzI1rxJ0iIb2wi2dFaELjc`
      );
      if (reponse.status == 200) {
        SetTransactions(reponse.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTransactions();
    const uid = getData()
    console.log(uid)
  }, []);

  const getData = () => {
    // await AsyncStorage.removeItem('userData');
    AsyncStorage.getItem("userData").then((value) => {
        const jsonObject = JSON.parse(value);
        // console.log(jsonObject);
        setData(jsonObject);
        if (!jsonObject) {
          navigation.navigate("Login")
        }
        return jsonObject

        // setData(jsonObject)
      })
      .catch((e) => {
        console.log(e);
        return e
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, gap: 8 }}>
      <SellerAppBar />
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          marginVertical: 8,
          color: "gray",
        }}
      >
        Transcations
      </Text>
      {loading ? (
        <ActivityIndicator size={100} color={"orange"} />
      ) : (
        <View>
          {Transactions.map((item, i) => (
            <View key={i} style={styles.transactionsCard}>
              <View style={{gap:4}}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Ionicons name="person" />
                  <Text style={styles.userName}>{item.sellerData.name}</Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Ionicons name="navigate" color={"green"}/>
                  <Text style={styles.userAddress}>
                    {item.sellerData.address}
                  </Text>
                </View>
                <Text style={{color:"green"}}>K {item.debitAmount}</Text>
              </View>
              <Text
                style={{
                  backgroundColor:
                    item.status.toLowerCase() === "completed"
                      ? "green"
                      : "orange",
                  color: "white",
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                {item.status}
              </Text>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

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
});
