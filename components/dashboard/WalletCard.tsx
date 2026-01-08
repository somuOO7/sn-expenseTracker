import { Color, CommonStyles, Size } from "@/constants";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Label } from "../ui";

const WalletCard = () => {
  return (
    <View style={[styles.container, CommonStyles.shadowStyle]}>
      {/* Designs */}
      <View style={styles.leftBar} />
      <View style={[styles.rightClip, CommonStyles.shadowStyle]}>
        <View style={styles.clipButton} />
      </View>

      {/* Actual content */}
      <Label variant="bold" style={CommonStyles.pageTitle}>
        Your Wallet
      </Label>

      <View style={styles.balanceContainer}>
        <Label style={{ color: Color.accent }}>Available balance</Label>
        <Label variant="bold" style={styles.balanceAmount}>
          ₹2,10,000
        </Label>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity style={styles.addBtn}>
          <Label variant="light" style={{ color: Color.white }}>
            Add money
          </Label>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftBar: {
    backgroundColor: Color.gray,
    width: 8,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
  rightClip: {
    backgroundColor: Color.gray,
    height: 50,
    width: 50,
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -25 / 2 }],
    paddingLeft: Size.padding,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  clipButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Color.primary,
  },
  container: {
    backgroundColor: Color.white,
    borderRadius: Size.borderRadius,
    padding: Size.padding,
    overflow: "hidden",
    gap: Size.padding,
  },
  balanceContainer: {
    backgroundColor: Color.gray,
    marginHorizontal: "auto",
    borderRadius: 1000,
    paddingHorizontal: 2 * Size.padding,
    paddingVertical: Size.padding / 2,
    alignItems: "center",
  },
  balanceAmount: { color: Color.primary, fontSize: 32 },
  addBtn: {
    backgroundColor: Color.secondary,
    padding: Size.padding / 2,
    borderRadius: Size.borderRadius,
  },
});

export default WalletCard;
