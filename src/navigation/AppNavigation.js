import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import { Booking, DoctorInfo, Doctors, Home, Login, QADetail, Register, Specialties, SpecialtyDetail, UpdateUser, UserProfile, VerifyBooking } from "../screens";
import BottomTabNavigation from "./BottomTabNavigation";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Main">
            <Stack.Screen name="Main" component={DrawerNavigation} />
            <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Specialty" component={Specialties} />
            <Stack.Screen name="Booking" component={Booking} />
            <Stack.Screen name="VerifyBooking" component={VerifyBooking} />
            <Stack.Screen name="SpecialtyDetail" component={SpecialtyDetail} />
            <Stack.Screen name="DoctorInfo" component={DoctorInfo} />
            <Stack.Screen name="Doctor" component={Doctors} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="QADetail" component={QADetail} />
            <Stack.Screen name="UpdateUser" component={UpdateUser} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;