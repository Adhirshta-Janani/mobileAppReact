import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import HomeComponent from "../../screens/landingPage";
import DSPListView from "./dropdown";
import CheckInScreen from "../../screens/checkin";
import CheckOutScreen from "../../screens/checkout";
import ListingScreen from "../../screens/listingscreen";


const DrawerNav = () => {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Landing" component = {HomeComponent}/>
        <Drawer.Screen name="DSPList" component = {DSPListView}/>
        <Drawer.Screen name="CheckIn" component = {CheckInScreen}/>
        <Drawer.Screen name="CheckOut" component = {CheckOutScreen}/>
        <Drawer.Screen name="ListingScreen" component = {ListingScreen}/>
      </Drawer.Navigator>
    );
  };

  export {DrawerNav};