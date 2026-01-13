import { db } from "@/config/firebaseConfig";
import { Icon, SecureStoreKey } from "@/constants";
import FirestoreCollectionName from "@/constants/FirestoreCollectionName";
import { useCategoryStore, useUiStore } from "@/store";
import { CategoryType } from "@/types";
import * as SecureStore from "expo-secure-store";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const getIconName = (iconValue: keyof typeof Icon): string => {
  const entry = Object.entries(Icon).find(
    ([key, value]) => value === iconValue
  );
  return entry ? entry[0] : "homeOutline";
};

const addCategory = async (category: CategoryType) => {
  try {
    useUiStore.getState().setShowLoader(true);
    const userId = await SecureStore.getItemAsync(SecureStoreKey.userId);
    if (userId) {
      const docRef = doc(db, FirestoreCollectionName.categories, userId);
      const docSnap = await getDoc(docRef);

      const newCategory = {
        ...category,
        icon: getIconName(category.icon),
      };

      if (docSnap.exists()) {
        await updateDoc(docRef, { expenseList: arrayUnion(newCategory) });
      } else {
        // Create new document with the category
        await setDoc(docRef, { expenseList: [newCategory] });
      }

      useCategoryStore
        .getState()
        .setExpenseCategories([
          ...(docSnap.exists() ? docSnap.data()?.expenseList : []),
          newCategory,
        ]);

      useUiStore.getState().showToast({
        message: "Category added successfully",
        visible: true,
        variant: "success",
      });
    }
  } catch (error: any) {
    useUiStore.getState().showToast({
      message: error.code || "",
      visible: true,
      variant: "failure",
    });
  } finally {
    useUiStore.getState().setShowLoader(false);
  }
};

const getCategory = async () => {
  try {
    useUiStore.getState().setShowLoader(true);
    const userId = await SecureStore.getItemAsync(SecureStoreKey.userId);
    if (userId) {
      const docRef = doc(db, FirestoreCollectionName.categories, userId);
      const docSnap = await getDoc(docRef);
      const result = docSnap.exists() ? docSnap.data().expenseList : [];
      useCategoryStore.getState().setExpenseCategories(result);
      return result;
    }
  } catch (error: any) {
    useUiStore.getState().showToast({
      message: error.code || "",
      visible: true,
      variant: "failure",
    });
  } finally {
    useUiStore.getState().setShowLoader(false);
  }
};

export { addCategory, getCategory };
