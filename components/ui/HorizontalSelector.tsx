import { Color, CommonStyles, Icon, ModalCategory, Size } from "@/constants";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Label from "./Label";

interface HorizontalSelectorProps {
  title: string;
  data: Array<{ id: number; title: string; icon: string; isSelected: boolean }>;
}

const HorizontalSelector = (props: HorizontalSelectorProps) => {
  const router = useRouter();

  return (
    <View style={{ gap: Size.padding / 2 }}>
      <View style={styles.titleContainer}>
        <Label variant="semibold" style={{ color: Color.secondary }}>
          {props.title}
        </Label>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: "/modal",
              params: { type: ModalCategory.ADD_CATEGORY },
            })
          }
        >
          <Label style={{ color: Color.white }}>Add</Label>
          <Image
            source={Icon.plus}
            style={{ tintColor: Color.white, width: 16, height: 16 }}
          />
        </TouchableOpacity>
      </View>

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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.secondary,
    borderRadius: Size.borderRadius,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  itemContainer: {
    height: 72,
    width: 120,
    borderRadius: Size.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    padding: Size.padding,
  },
  icon: { height: Size.iconSize, width: Size.iconSize },
});

export default HorizontalSelector;
