import { useContext } from "react";
import { ITEM_TYPES, ITEM_TITLES } from "../constants/addItem.constants";
import { GlobalContext } from "../providers/global.provider";

export function FILTERS_ARRAY() {
  const { cities } = useContext(GlobalContext);
  return (
    cities && [
      { array: ["all", ...ITEM_TITLES], name: "title" },
      { array: ["all", ...ITEM_TYPES], name: "type" },
      { array: ["all", ...cities], name: "city" },
    ]
  );
}
