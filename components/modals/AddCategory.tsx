import { CategoryIcons, Color, CommonStyles, Size } from "@/constants";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Input, Label } from "../ui";

const AddCategory = () => {
  const router = useRouter();
  const [selectedIcon, setSelectedIcon] = useState("catIcon_1");

  return (
    <View style={styles.container}>
      <Label variant="bold" style={styles.title}>
        Add New Category
      </Label>

      <Input
        placeholder="Type your category name"
        title="Category name"
        variant="small"
      />

      <View>
        <Label variant="semibold" style={{ color: Color.secondary }}>
          Select Icon
        </Label>
        <View style={styles.iconListContainer}>
          {CategoryIcons.map((icon) => (
            <TouchableOpacity
              key={icon.id}
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    selectedIcon === icon.id ? Color.primary : Color.gray,
                },
                selectedIcon === icon.id && CommonStyles.shadowStyle,
              ]}
              onPress={() => setSelectedIcon(icon.id)}
            >
              <Image source={icon.icon} style={styles.icon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Button title="Add" variant="primary" />
      <Button
        title="Cancel"
        variant="secondary"
        onPress={() => router.back()}
      />
    </View>
  );
};

const iconContainerSize = Size.iconSize + 16;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    height: "auto",
    borderRadius: Size.borderRadius,
    padding: Size.padding,
    gap: Size.padding,
  },
  title: { color: Color.primary, fontSize: 18 },
  iconListContainer: {
    gap: Size.padding / 2,
    height: 2 * iconContainerSize + Size.padding / 2,
    flexWrap: "wrap",
  },
  iconContainer: {
    height: iconContainerSize,
    width: iconContainerSize,
    borderRadius: iconContainerSize / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { width: Size.iconSize, height: Size.iconSize, tintColor: Color.white },
});

export default AddCategory;
