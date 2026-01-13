import { bottomTabItems, Color, CommonStyles, Icon, Size } from "@/constants";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Label from "./Label";

const BottomTab = ({ state, navigation }: BottomTabBarProps) => {
  const [isPlusClicked, setIsPlusClicked] = useState(false);

  const renderTabs = () => {
    const tabs = [];
    for (let i = 0; i < bottomTabItems.length; i++) {
      const item = bottomTabItems[i];
      const route = state.routes[i];
      const isFocused = state.index === i;

      const onPress = () => {
        if (isPlusClicked) {
          setIsPlusClicked(false);
        }
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      // Empty spacer at the middle
      if (i === bottomTabItems.length / 2) {
        tabs.push(<View key="middle-spacer" style={styles.icon} />);
      }

      tabs.push(
        <TouchableOpacity
          key={item.id}
          style={styles.buttons}
          onPress={onPress}
        >
          <Image
            source={isFocused ? item.selectedIcon : item.unselectedIcon}
            style={[
              styles.icon,
              { tintColor: isFocused ? Color.primary : Color.gray },
            ]}
            contentFit="contain"
          />
          <Label style={{ color: isFocused ? Color.primary : Color.gray }}>
            {item.title}
          </Label>
        </TouchableOpacity>
      );
    }
    return tabs;
  };

  const isAddExpenseFocused = state.routes[state.index].name === "addExpense";

  return (
    <View style={[styles.container, CommonStyles.shadowStyle]}>
      {renderTabs()}

      {/* Middle Icon */}
      <View style={styles.middleBump}>
        <TouchableOpacity
          style={[
            styles.middleIcon,
            CommonStyles.shadowStyle,
            {
              backgroundColor: isAddExpenseFocused ? Color.primary : Color.gray,
            },
          ]}
          onPress={() => setIsPlusClicked(!isPlusClicked)}
        >
          <Image
            source={Icon.plus}
            style={[styles.icon, { tintColor: Color.white }]}
            contentFit="contain"
          />
        </TouchableOpacity>

        {isPlusClicked && (
          <>
            <TouchableOpacity
              style={[styles.optionIcon, { left: -2 * Size.padding }]}
              onPress={() => {
                navigation.navigate("addExpense", { type: "expense" });
                setIsPlusClicked(false);
              }}
            >
              <Image
                source={Icon.expense}
                style={[styles.icon, { tintColor: Color.white }]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionIcon, , { right: -2 * Size.padding }]}
              onPress={() => {
                navigation.navigate("addExpense", { type: "invest" });
                setIsPlusClicked(false);
              }}
            >
              <Image
                source={Icon.invest}
                style={[styles.icon, { tintColor: Color.white }]}
              />
            </TouchableOpacity>
          </>
        )}
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
  },
  icon: {
    height: Size.iconSize,
    width: Size.iconSize,
  },
  optionIcon: {
    position: "absolute",
    top: -2 * Size.padding,
    backgroundColor: Color.secondary,
    borderRadius: 100,
    padding: Size.padding / 2,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomTab;
