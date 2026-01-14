import { BaseUrl, Endpoint } from "@/constants";
import { useUiStore } from "@/store";
import axios from "axios";

export const getMutualFund = async (query: { q: string }) => {
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
