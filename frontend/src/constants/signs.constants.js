import {
  HOME_PATH,
  DASHBOARD_PATH,
  SEARCH_PRODUCTS_PATH,
} from "../routes/routes.constants";

export const INPUT_ATTRIBUTES = [
  { id: "name", name: "name", type: "text" },
  { id: "email", name: "email", type: "email" },
  { id: "password", name: "password", type: "password" },
];

export const NAVLINK_NAMES = [
  { name: "Home", route: HOME_PATH },
  { name: "Dashboard", route: DASHBOARD_PATH },
  { name: "Search", route: SEARCH_PRODUCTS_PATH },
];

export function UPDATE_BUTTONS(array) {
  return [
    { function: array[0], text: "UPDATE" },
    { function: array[1], text: "LOG OUT" },
    { function: array[2], text: "LOG OUT FROM ALL DEVICES" },
  ];
}
