import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Home from "./Screens/Home";
import Details from "./Screens/Details";
import Point from "./Screens/Point";

const App = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <App.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: { backgroundColor: "#f0f0f5" },
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <App.Screen component={Home} name="Home" />
        <App.Screen component={Point} name="Point" />
        <App.Screen component={Details} name="Details" />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
