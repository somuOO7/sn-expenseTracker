import { Color, CommonStyles, Size } from "@/constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Label from "./Label";

interface InputProps extends TextInputProps {
  title: string;
  placeholder: string;
  prefixIcon?: React.ReactNode | string;
  variant: "large" | "small" | "datepicker";
  containerStyle?: ViewStyle;
  isDropdown?: boolean;
  dropDownData?: { type: "mutual-fund"; data: any };
  onDropdownItemSelect?: (item: any) => void;
}

const Input = (props: InputProps) => {
  const [showDateSelector, setShowDateSelector] = useState(false);

  return (
    <View style={props.containerStyle}>
      <Label variant="semibold" style={styles.title}>
        {props.title}
      </Label>
      <View
        style={[
          props.variant === "large"
            ? styles.largeInputContainer
            : styles.smallInputContainer,
          CommonStyles.shadowStyle,
        ]}
      >
        {props.prefixIcon &&
          (typeof props.prefixIcon === "string" ? (
            <Label
              variant="medium"
              style={
                props.variant === "large"
                  ? styles.largePrefixText
                  : styles.smallPrefixText
              }
            >
              {props.prefixIcon}
            </Label>
          ) : (
            props.prefixIcon
          ))}

        {props.variant === "datepicker" ? (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setShowDateSelector(true);
            }}
            activeOpacity={0.7}
          >
            <TextInput
              {...props}
              editable={false}
              placeholder={props.placeholder}
              placeholderTextColor={Color.white}
              style={[styles.smallInput, { fontFamily: "Regular" }]}
              pointerEvents="none"
            />
          </TouchableOpacity>
        ) : (
          <TextInput
            {...props}
            placeholder={props.placeholder}
            placeholderTextColor={
              props.variant === "small" ? Color.white : Color.gray
            }
            style={[
              props.variant === "large" ? styles.largeInput : styles.smallInput,
              props.variant === "large" &&
                props.value && {
                  width: Math.max(100, props.value.length * 20 + 30),
                },
              { fontFamily: props.variant === "large" ? "Bold" : "Regular" },
            ]}
          />
        )}
      </View>

      {/* Dropdown */}
      {props.isDropdown && (
        <View style={[styles.dropDownContainer, CommonStyles.shadowStyle]}>
          <FlatList
            data={props.dropDownData?.data}
            keyExtractor={(item) => item.schemeCode}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  props.onChangeText?.(item.schemeName);
                  props.onDropdownItemSelect?.(item);
                }}
              >
                <Label numberOfLines={0}>{item.schemeName}</Label>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {props.variant === "datepicker" && showDateSelector && (
        <View style={[styles.datePickerContainer, CommonStyles.shadowStyle]}>
          <DateTimePicker
            mode="date"
            display="inline"
            value={new Date(props.value || new Date())}
            onChange={(text) => {
              const date: string = new Date(text.nativeEvent.timestamp)
                .toISOString()
                .split("T")[0];
              props.onChangeText?.(date);
              setShowDateSelector(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Color.secondary,
  },
  largeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: Color.white,
    borderRadius: Size.borderRadius,
  },
  largePrefixText: {
    color: Color.secondary,
    fontSize: 30,
  },
  largeInput: {
    fontSize: 30,
    color: Color.primary,
    fontFamily: "Bold",
    paddingHorizontal: Size.padding,
    minWidth: 100,
    maxWidth: 200,
  },
  smallInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.gray,
    borderRadius: 13,
    padding: Size.padding,
    gap: Size.padding / 2,
  },
  smallPrefixText: { color: Color.white },
  smallInput: { color: Color.white, fontSize: Size.fontSize, flex: 1 },
  dropDownContainer: {
    position: "absolute",
    backgroundColor: Color.white,
    padding: Size.padding,
    borderRadius: Size.borderRadius,
    left: 0,
    right: 0,
    top: 2 * Size.padding + 2 * Size.fontSize + 12,
    zIndex: 1000,
    maxHeight: 150,
  },
  dropdownItem: {
    paddingVertical: Size.padding / 2,
    borderBottomWidth: 1,
    borderColor: Color.gray,
  },
  datePickerContainer: {
    backgroundColor: Color.white,
    position: "absolute",
    top: 2 * Size.padding + 2 * Size.fontSize + 12,
    zIndex: 1000,
    borderRadius: Size.borderRadius,
    padding: Size.padding,
  },
});

export default Input;
