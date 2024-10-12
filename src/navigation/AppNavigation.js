import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import { Booking, DoctorInfo, DoctorRegister, Doctors, Home, Login, Register, Specialties, SpecialtyDetail, UserRegister, VerifyBooking } from "../screens";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Main">
            <Stack.Screen name="Main" component={DrawerNavigation} />
            {/* <Stack.Screen name="Home" component={Home} /> */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="UserRegister" component={UserRegister} />
            <Stack.Screen name="DoctorRegister" component={DoctorRegister} />
            <Stack.Screen name="Specialty" component={Specialties} />
            <Stack.Screen name="Booking" component={Booking} />
            <Stack.Screen name="VerifyBooking" component={VerifyBooking} />
            <Stack.Screen name="SpecialtyDetail" component={SpecialtyDetail} />
            <Stack.Screen name="DoctorInfo" component={DoctorInfo} />
            <Stack.Screen name="Doctor" component={Doctors} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;