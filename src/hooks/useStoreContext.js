import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";

function useStoreContext() {
  return useContext(StoreContext);
}

export default useStoreContext;
