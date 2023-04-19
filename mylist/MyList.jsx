import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import List from "./List";

const MyComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [deal, setDeal] = useState([]);
  const [yesClick, setYesClick] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  // useEffect(() => {
  //   AsyncStorage.getItem("myDeal").then((res) => {
  //     const resJ = JSON.parse(res);

  //     if ((res !== null && resJ.length !== deal.length) || isUpdate) {
  //       // console.log("NEW UPDDATE");
  //       setDeal(resJ);
  //       setIsUpdate(false);
  //     }
  //   });
  // }, [deal, yesClick]);

  const handleSaveData = async () => {
    const item = await AsyncStorage.getItem("myDeal");
    let arr = [];
    if (item !== null) {
      const res = JSON.parse(item);
      console.log(res, "item");

      if (res.text.length > 0) {
        arr = res.text;
        arr.push({ inputValue, id: arr[arr.length - 1].id + 1 });
        console.log("ssss");
      } else {
        arr.push({ inputValue, id: 0 });
      }
    } else {
      arr.push({ inputValue, id: 0 });
    }

    // if (deal.text.length > 0) {
    //   console.log("CIODA");
    //   arr = deal.text;
    //   arr.push({ inputValue, id: arr[arr.length - 1].id + 1 });
    // } else {
    //   arr.push({ inputValue, id: 0 });
    // }
    await AsyncStorage.setItem("myDeal", JSON.stringify({ text: arr }));

    setYesClick(true);
    // setDeal(arr);

    setTimeout(() => {
      setYesClick(false)
    }, 5000)
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
