import { db } from "@/config/firebaseConfig";
import { FireStoreCollectionName, SecureStoreKey } from "@/constants";
import { useUiStore } from "@/store";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

interface ExpenseFormData {
  amount: string;
  categoryId: string;
  note: string;
  date: string;
}

const addExpense = async (expense: ExpenseFormData) => {
  try {
    useUiStore.getState().setShowLoader(true);
    const userId = await SecureStore.getItemAsync(SecureStoreKey.userId);

    if (userId) {
      const docRef = doc(db, FireStoreCollectionName.expenses, userId);
      const docSnap = await getDoc(docRef);

      const amount = parseFloat(expense.amount);
      const newExpense = { ...expense, id: Crypto.randomUUID(), amount };

      if (docSnap.exists()) {
        await updateDoc(docRef, { list: arrayUnion(newExpense) });
      } else {
        await setDoc(docRef, { list: [newExpense] });
      }

      useUiStore.getState().showToast({
        message: "Expense added successfully.",
        visible: true,
        variant: "success",
      });
    }
  } catch (error) {
    useUiStore.getState().showToast({
      message: "Failed to add expense.",
      visible: true,
      variant: "failure",
    });
  } finally {
    useUiStore.getState().setShowLoader(false);
  }
};

export { addExpense };
