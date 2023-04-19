import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, Button } from "react-native";
import { useEffect, useCallback, useState } from "react";
import MyList from "./mylist/MyList";

export default function App() {
  const [bol, setBol] = useState(false);
  const [fontsLoaded] = Font.useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Inter-SemiBoldItalic":
      "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
  });

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }

  //   prepare();
  // }, []);

  useEffect(() => {
    
  }, [bol]);

  function handle() {
    setBol(!bol);
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onLayout={onLayoutRootView}
    >
      {/* <Text style={{fontSize: 30}}>Список моих дел</Text>
      <Text style={{ fontFamily: "Inter-Black" }}>G</Text> */}
      {bol === false ? (
        <Text style={{ marginBottom: 10 }}>Todo List</Text>
      ) : (
       <MyList></MyList>
      )}
      <Button onPress={handle} title="Посмотреть список"></Button>
      {/* <Text style={{ fontFamily: "Inter-SemiBoldItalic" }}>
        Inter SemiBoldItalic
      </Text> */}
    </View>
  );
}
