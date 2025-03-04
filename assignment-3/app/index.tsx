import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import credentials from "../credentials.json";
import DropDownPicker from "react-native-dropdown-picker";

export default function Home() {
  const [data, setData] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      label: "Jan",
      value: "1",
      containerStyle: { backgroundColor: "#f0f0f5" },
    },
    { label: "Feb", value: "2" },
    { label: "Mar", value: "3" },
    { label: "Apr", value: "4" },
    { label: "May", value: "5" },
    { label: "Jun", value: "6" },
    { label: "Jul", value: "7" },
    { label: "Aug", value: "8" },
    { label: "Sep", value: "9" },
    { label: "Oct", value: "10" },
    { label: "Nov", value: "11" },
    { label: "Dec", value: "12" },
  ]);

  const url = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`;
  const fetchData = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": credentials.key,
        "x-rapidapi-host": credentials.host,
      },
    });
    const res = await response.text();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, [month, day]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>{month && day && <Text style={styles.text}>{data}</Text>}</View>
      <View style={styles.inputLayout}>
        <Text style={styles.title}>Month</Text>
        <DropDownPicker
          style={styles.dropdown}
          dropDownContainerStyle={{
            width: 200,
            borderRadius: 15,
            borderColor: "#ccc",
          }}
          placeholder=" " 
          open={open}
          setOpen={setOpen}
          value={month}
          setValue={setMonth}
          items={items}
          setItems={setItems}
        />
        <Text style={styles.title}>Day</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDay(text)}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "90%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  text: {
    color: "red",
    fontStyle: "italic",
    overflow: "scroll",
  },
  inputLayout: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#cc0000",
    padding: 20,
    borderRadius: 15,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  title: {
    fontSize: 16,
    fontWeight: "semibold",
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  dropdown: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
});
