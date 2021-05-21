import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, SearchBar, TabBar } from "@ant-design/react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { WebView } from "react-native-webview";

export default function App() {
  const [loaded] = useFonts({
    antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
    antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
  });

  const [selectedTab, setSelectedTab] = useState("detect");

  const renderContent = (pageText) => {
    const url = "https://lit-mesa-73764.herokuapp.com/mobile";
    switch (selectedTab) {
      case "user":
        return (
          <WebView source={{ uri: url + "/user" }} style={{ margin: 20 }} />
        );
      case "report":
        return (
          <WebView source={{ uri: url + "/report" }} style={{ margin: 20 }} />
        );
      default:
        return (
          <WebView source={{ uri: url + "/detect" }} style={{ margin: 20 }} />
        );
    }
  };

  const onChangeTab = (tabName) => {
    setSelectedTab(tabName);
  };

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="#f5f5f5"
    >
      <TabBar.Item
        icon={<Icon name="user" />}
        title="User"
        selected={selectedTab === "user"}
        onPress={() => onChangeTab("user")}
      >
        {renderContent("My Tab")}
      </TabBar.Item>
      <TabBar.Item
        title="Detect history"
        icon={<Icon name="home" />}
        selected={selectedTab === "detect"}
        onPress={() => onChangeTab("detect")}
      >
        {renderContent("Detect")}
      </TabBar.Item>
      <TabBar.Item
        icon={<Icon name="ordered-list" />}
        title="Report"
        selected={selectedTab === "report"}
        onPress={() => onChangeTab("report")}
      >
        {renderContent("Report")}
      </TabBar.Item>
    </TabBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
