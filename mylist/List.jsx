import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";

const App = ({ newItem }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [iseUse, setIsUse] = useState(false);
  const [render, setRender] = useState([]);

  useEffect(() => {
    if (render.length === 0 || newItem) {
      AsyncStorage.getItem("myDeal").then((res) => {
        const resJ = JSON.parse(res);
        if (resJ.text.length === 0) {
        } else {
          setRender(resJ.text);
        }
      });
    }
  }, [render, newItem]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsUse(true);
  };

  const handleLive = () => {
    setSelectedItem("");
    setIsUse(false);
  };

  const deleteItem = () => {
    setIsUse(false);
    AsyncStorage.getItem("myDeal").then(async (res) => {
      const result = JSON.parse(res);

      await AsyncStorage.setItem(
        "myDeal",
        JSON.stringify({
          text: result.text.filter((item) => item.id !== selectedItem.id),
        })
      );

      setRender(result.text.filter((item) => item.id !== selectedItem.id));
    });
  };

  const renderItem = ({ item }) => {
    console.log(selectedItem)
    const isSelected = selectedItem && selectedItem.id === item.id;
    const textStyle = { backgroundColor: isSelected ? "red" : "white" };

    return (
      <TouchableOpacity
        style={[{ alignItems: "center", marginTop: 20 }, textStyle]}
        onLongPress={() => handleSelectItem(item)}
      >
        <Text>{item.inputValue}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, width: "100%", marginTop: 50 }}>
      <FlatList
        data={render}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {iseUse && (
        <>
          <Button onPress={deleteItem} title="Удалить?"></Button>
          <Button onPress={handleLive} title="Оставить"></Button>
        </>
      )}
    </SafeAreaView>
  );
};

export default App;
