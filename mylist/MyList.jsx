import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import List from "./List";

const MyComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [yesClick, setYesClick] = useState(false);

  const handleSaveData = async () => {
    const item = await AsyncStorage.getItem("myDeal");
    let arr = [];
    if (item !== null) {
      const res = JSON.parse(item);

      if (res.text.length > 0) {
        arr = res.text;
        arr.push({ inputValue, id: arr[arr.length - 1].id + 1 });
      } else {
        arr.push({ inputValue, id: 0 });
      }
    } else {
      arr.push({ inputValue, id: 0 });
    }

    await AsyncStorage.setItem("myDeal", JSON.stringify({ text: arr }));

    setYesClick(true);

    setTimeout(() => {
      setYesClick(false);
    }, 5000);

    setInputValue("");
  };

  return (
    <>
      <List newItem={yesClick}></List>
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Enter data here"
      />
      <Button title="Save data" onPress={handleSaveData} />
    </>
  );
};

export default MyComponent;
