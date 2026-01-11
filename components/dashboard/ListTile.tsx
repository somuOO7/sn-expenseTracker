import { Color, Size } from "@/constants";
import Icon from "@/constants/Icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Label } from "../ui";

interface ListTileProps {
  icon: keyof typeof Icon;
}

const ListTile = (props: ListTileProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={props.icon}
          style={[styles.icon, { tintColor: Color.primary }]}
        />
      </View>

      <Label style={styles.title}>ListTile</Label>

      <View style={styles.subtitleContianer}>
        <Image
          source={Icon.stockDown}
          style={[styles.icon, { tintColor: Color.green }]}
        />
        <Label
          variant="light"
          style={{ fontSize: 12, textAlign: "right", color: Color.green }}
        >
          5% less than previous month
        </Label>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    borderRadius: 100,
    padding: Size.padding,
    flexDirection: "row",
    alignItems: "center",
    gap: Size.padding,
  },
  iconContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: Color.primary,
    borderRadius: 100,
    backgroundColor: Color.accent,
  },
  icon: { width: Size.iconSize, height: Size.iconSize },
  title: { flex: 1 },
  subtitleContianer: {
    maxWidth: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default ListTile;
