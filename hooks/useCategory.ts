import { db } from "@/config/firebaseConfig";
import { Icon, SecureStoreKey } from "@/constants";
import FirestoreCollectionName from "@/constants/FirestoreCollectionName";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const getIconName = (iconValue: keyof typeof Icon): string => {
  const entry = Object.entries(Icon).find(
    ([key, value]) => value === iconValue
  );
  return entry ? entry[0] : "homeOutline";
};

interface Category {
  title: string;
  icon: keyof typeof Icon;
}

const addCategory = async (category: Category) => {
  try {
    const userId = await SecureStore.getItemAsync(SecureStoreKey.userId);
    if (userId) {
      const docRef = doc(db, FirestoreCollectionName.categories, userId);
      const docSnap = await getDoc(docRef);

      const newCategory = {
        id: Crypto.randomUUID(),
        title: category.title,
        icon: getIconName(category.icon),
      };

      if (docSnap.exists()) {
        await updateDoc(docRef, { list: arrayUnion(newCategory) });
      } else {
        // Create new document with the category
        await setDoc(docRef, { list: [newCategory] });
      }
    }
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

const getCategory = async () => {
  try {
    const userId = await SecureStore.getItemAsync(SecureStoreKey.userId);
    if (userId) {
      const docRef = doc(db, FirestoreCollectionName.categories, userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().list : [];
    }
  } catch (error) {
    console.error("Error getting category:", error);
  }
};

export { addCategory, getCategory };
