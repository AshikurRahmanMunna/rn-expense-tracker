import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
export type RootStackParamList = {};

// use this to get both the navigation and route
export type CustomStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

// use this to get the navigation not the route
export type CustomStackNavigationProp<Screen extends keyof RootStackParamList> =
  CustomStackScreenProps<Screen>["navigation"];

// use this to get the route
export type CustomStackRouteProp<Screen extends keyof RootStackParamList> =
  CustomStackScreenProps<Screen>["route"];

//   drawer
export type RootDrawerParamsList = {};

export type CustomDrawerScreenProps<Screen extends keyof RootDrawerParamsList> =
  DrawerScreenProps<RootDrawerParamsList, Screen>;

// use this to get the navigation not the route
export type CustomDrawerNavigationProp<
  Screen extends keyof RootDrawerParamsList
> = CustomDrawerScreenProps<Screen>["navigation"];

// use this to get the route
export type CustomDrawerRouteProp<Screen extends keyof RootDrawerParamsList> =
  CustomDrawerScreenProps<Screen>["route"];

//   drawer
export type RootBottomTabParamsList = {};

export type CustomBottomTabScreenProps<
  Screen extends keyof RootBottomTabParamsList
> = BottomTabScreenProps<RootBottomTabParamsList, Screen>;

// use this to get the navigation not the route
export type CustomBottomTabNavigationProp<
  Screen extends keyof RootBottomTabParamsList
> = CustomBottomTabScreenProps<Screen>["navigation"];

// use this to get the route
export type CustomBottomTabRouteProp<
  Screen extends keyof RootBottomTabParamsList
> = CustomBottomTabScreenProps<Screen>["route"];
