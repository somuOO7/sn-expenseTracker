import { db } from "@/config/firebaseConfig";
import { FireStoreCollectionName, SecureStoreKey } from "@/constants";
import { useUiStore } from "@/store";
import { ExpenseType } from "@/types";
import * as SecureStore from "expo-secure-store";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const addExpense = async (expense: ExpenseType) => {
  try {
    useUiStore.getState().setShowLoader(true);
    const userId = await SecureStore.getItemAsync(SecureStoreKey.userId);

    if (userId) {
      const docRef = doc(db, FireStoreCollectionName.expenses, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, { list: arrayUnion(expense) });
      } else {
        await setDoc(docRef, { list: [expense] });
      }

      useUiStore.getState().showToast({
        message: "Expense added successfully.",
        visible: true,
        variant: "success",
      });
    }
  } catch (error: any) {
    useUiStore
      .getState()
      .showToast({ message: error.code, visible: true, variant: "failure" });
  } finally {
    useUiStore.getState().setShowLoader(false);
  }
};

const getExpenses = async (): Promise<ExpenseType[]> => {
  try {
    useUiStore.getState().setShowLoader(true);
    const userId = await SecureStore.getItemAsync(SecureStoreKey.userId);

    if (userId) {
      const docRef = doc(db, FireStoreCollectionName.expenses, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().list as ExpenseType[];
      } else {
        return [];
      }
    } else {
      return [];
    }
  } catch (error: any) {
    useUiStore
      .getState()
      .showToast({ message: error.code, visible: true, variant: "failure" });
    return [];
  } finally {
    useUiStore.getState().setShowLoader(false);
  }
};

export { addExpense, getExpenses };
