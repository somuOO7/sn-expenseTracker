import Color from "@/constants/Color";
import CommonStyles from "@/constants/CommonStyles";
import Icon from "@/constants/Icons";
import Size from "@/constants/Size";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Label from "./Label";

interface HorizontalSelectorProps {
  title: string;
  data: Array<{ id: number; title: string; icon: string; isSelected: boolean }>;
}

const HorizontalSelector = (props: HorizontalSelectorProps) => {
  return (
    <View>
      <Label variant="semibold" style={{ color: Color.secondary }}>
        {props.title}
      </Label>

      {props.data.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: Size.padding,
            paddingBottom: Size.padding / 2,
          }}
        >
          {props.data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.itemContainer,
                CommonStyles.shadowStyle,
                {
                  backgroundColor: item.isSelected
                    ? Color.primary
                    : Color.white,
                },
              ]}
            >
              <Image
                source={item.icon}
                style={[
                  styles.icon,
                  {
                    tintColor: item.isSelected ? Color.white : Color.gray,
                  },
                ]}
              />
              <Label
                numberOfLines={1}
                style={{
                  textAlign: "center",
                  color: item.isSelected ? Color.white : Color.gray,
                }}
              >
                {item.title}
              </Label>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: Size.padding,
          }}
        >
          <Image
            source={Icon.calendarOutline}
            style={[styles.icon, { tintColor: Color.gray }]}
          />
          <Label style={CommonStyles.subtitleText}>
            Add category to continue
          </Label>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 72,
    width: 120,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: Size.padding,
  },
  icon: { height: Size.iconSize, width: Size.iconSize },
});

export default HorizontalSelector;
