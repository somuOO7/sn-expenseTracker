import Color from "@/constants/Color";
import Icon from "@/constants/Icons";
import Size from "@/constants/Size";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Label from "./Label";

const bottomTabItems = [
  {
    id: 0,
    title: "Home",
    selectedIcon: Icon.homeFill,
    unselectedIcon: Icon.homeOutline,
  },
  {
    id: 1,
    title: "Reports",
    selectedIcon: Icon.chartFill,
    unselectedIcon: Icon.chartOutline,
  },
  {
    id: 2,
    title: "Cash+",
    selectedIcon: Icon.walletFill,
    unselectedIcon: Icon.walletOutline,
  },
  {
    id: 3,
    title: "Profile",
    selectedIcon: Icon.profileFill,
    unselectedIcon: Icon.profileOutline,
  },
];

const BottomTab = () => {
  const renderTabs = () => {
    const tabs = [];
    for (let i = 0; i < bottomTabItems.length; i++) {
      const item = bottomTabItems[i];

      // Empty spacer at the middle
      if (i === bottomTabItems.length / 2) {
        tabs.push(<View key="middle-spacer" style={styles.icon} />);
      }

      tabs.push(
        <TouchableOpacity key={item.id} style={styles.buttons}>
          <Image
            source={item.unselectedIcon}
            style={[styles.icon, { tintColor: Color.gray }]}
            contentFit="contain"
          />
          <Label style={{ color: Color.gray }}>{item.title}</Label>
        </TouchableOpacity>
      );
    }
    return tabs;
  };

  return (
    <View style={styles.container}>
      {renderTabs()}

      {/* Middle Icon */}
      <View style={styles.middleBump}>
        <TouchableOpacity style={styles.middleIcon}>
          <Image
            source={Icon.plus}
            style={[styles.icon, { tintColor: Color.white }]}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    position: "absolute",
    bottom: 2 * Size.padding,
    left: Size.padding,
    right: Size.padding,
    height: 60,
    borderRadius: 30,

    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  middleBump: {
    backgroundColor: Color.white,
    position: "absolute",
    top: -20,
    alignSelf: "center",
    height: 68,
    width: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  middleIcon: {
    backgroundColor: Color.gray,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  icon: {
    height: 28,
    width: 28,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomTab;
