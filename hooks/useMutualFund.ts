import { db } from "@/config/firebaseConfig";
import {
  BaseUrl,
  Endpoint,
  FireStoreCollectionName,
  SecureStoreKey,
} from "@/constants";
import { useCashPlusStore, useUiStore } from "@/store";
import { MutualFundType } from "@/types";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const getMutualFundByQuery = async (query: { q: string }) => {
  try {
    // useUiStore.getState().setShowLoader(true);

    const result = await axios({
      baseURL: BaseUrl.mutualfundBase,
      url: Endpoint.mutualFundSearch,
      method: "get",
      params: query,
    });

    return result.data;
  } catch (error) {
    useUiStore.getState().showToast({
      message: error as string,
      variant: "failure",
      visible: true,
    });
  } finally {
    // useUiStore.getState().setShowLoader(false);
  }
};

export const getMutualFundDetailsBySchemeCode = async (schemeCode: string) => {
  try {
    useUiStore.getState().setShowLoader(true);

    const result = await axios({
      baseURL: BaseUrl.mutualfundBase,
      url: `${schemeCode}`,
      method: "get",
    });

    return result.data;
  } catch (error) {
    useUiStore.getState().showToast({
      message: error as string,
      variant: "failure",
      visible: true,
    });
  } finally {
    useUiStore.getState().setShowLoader(false);
  }
};

export const getMutualFundStore = async () => {
  const userId = await SecureStore.getItemAsync(SecureStoreKey.userId);

  if (userId) {
    const docRef = doc(db, FireStoreCollectionName.cashPlus, userId);
    const updatedResult = await getDoc(docRef);
    if (updatedResult.exists()) {
      const mutualFundStoreData = updatedResult.data()
        .mutualFunds as Array<MutualFundType>;
      useCashPlusStore.getState().setMutualFundStore(mutualFundStoreData);
    } else {
      useCashPlusStore.getState().setMutualFundStore([]);
    }
  }
};

export const addMutualFund = async (data: MutualFundType) => {
  try {
    useUiStore.getState().setShowLoader(true);
    const userId = await SecureStore.getItemAsync(SecureStoreKey.userId);
    if (userId) {
      const docRef = doc(db, FireStoreCollectionName.cashPlus, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let mutualFundData = docSnap.data().mutualFunds as Array<any>;
        const existingMfIdx = mutualFundData?.findIndex(
          (fund) => fund.schemeCode === data.schemeCode
        );

        if (existingMfIdx === -1 || existingMfIdx === undefined) {
          await updateDoc(docRef, { mutualFunds: arrayUnion(data) });
        } else {
          mutualFundData[existingMfIdx].data.push(...data.data);
          await updateDoc(docRef, { mutualFunds: mutualFundData });
        }
      } else {
        await setDoc(docRef, { mutualFunds: [data] });
      }

      await getMutualFundStore();

      useUiStore.getState().showToast({
        message: "Fund added successfully",
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

export const getNavByDate = async (
  schemeCode: string,
  date: string
): Promise<{ nav: string; date: string } | null> => {
  try {
    useUiStore.getState().setShowLoader(true);
    const result = await getMutualFundDetailsBySchemeCode(schemeCode);

    const navData = result.data as Array<any>;

    let navByDate = null;
    const targetDate = new Date(date);
    const navOnOrAfterDate = navData
      .map((nav) => ({
        ...nav,
        parsedDate: new Date(nav.date.split("-").reverse().join("-")),
      }))
      .filter((nav) => nav.parsedDate >= targetDate)
      .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

    if (navOnOrAfterDate.length > 0) {
      navByDate = navOnOrAfterDate[0];
    }

    return { nav: navByDate.nav, date: navByDate.date };
  } catch (error) {
    console.error("Error fetching NAV by date:", error);
    useUiStore.getState().showToast({
      message: "Something went wrong while fetching NAV",
      visible: true,
      variant: "failure",
    });
    return null;
  } finally {
    useUiStore.getState().setShowLoader(false);
  }
};