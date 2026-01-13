import { Color, Size } from "@/constants";
import Icon from "@/constants/Icons";
import { useCategoryStore } from "@/store";
import { formatAmount } from "@/utils/amountConverters";
import { formatShortDate } from "@/utils/dateConverters";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Label } from "../ui";

interface ListTileProps {
  variant: "analytic" | "detail";
  title: string;
  icon?: keyof typeof Icon;
  categoryId?: string;
  detail?: { amount: number; date: string };
}

const ListTile = (props: ListTileProps) => {
  const { expenseCategories } = useCategoryStore();

  const getIconSource = () => {
    let iconSource;
    if (props.categoryId) {
      const category = expenseCategories.find(
        (category) => category.id === props.categoryId
      );

      if (category && category.icon) {
        iconSource = Icon[category.icon];
      }
    } else if (props.icon) {
      iconSource = props.icon;
    }

    return iconSource;
  };

  return (
    <View style={styles.container}>
      <View style={styles.primaryContainer}>
        <Image
          source={getIconSource()}
          style={[styles.icon, { tintColor: Color.primary }]}
        />
      </View>

      <Label style={styles.title}>{props.title}</Label>

      {props.variant === "analytic" && (
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
      )}

      {props.variant === "detail" && (
        <>
          <View style={styles.detailsDate}>
            <Label style={{ fontSize: 12, color: Color.white }}>
              {formatShortDate(props.detail?.date || "")}
            </Label>
          </View>
          <View style={styles.primaryContainer}>
            <Label style={{ color: Color.primary }}>
              {formatAmount(props.detail?.amount || 0)}
            </Label>
          </View>
        </>
      )}
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
  primaryContainer: {
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
  detailsDate: {
    backgroundColor: Color.gray,
    borderRadius: 1000,
    paddingHorizontal: 4,
  },
});

export default ListTile;
