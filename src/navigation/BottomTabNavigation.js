import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StyleSheet, Text, View } from "react-native";
import { SpecialtyDetail } from "../screens";
import { COLORS } from "../constants";
import { HeaderBack } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const Information_Specialty = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title="dfghj"
        screenName="Specialty"
      />
      <Text>Giới thiệu</Text>
    </SafeAreaView>
  );
};

const DoctorList_Specialty = ({ route, navigation }) => {
  const { specialty } = route.params || {};
  return <SpecialtyDetail navigation={navigation} specialty={specialty} />;
};

const Services_Specialty = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title="dfghj"
        screenName="Specialty"
      />
      <Text>Dịch vụ</Text>
    </SafeAreaView>
  );
};

export default BottomTabNavigation = ({ route, navigation }) => {
  const { specialty } = route.params || {};
  //   if (specialty) console.log(specialty.value);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Giới thiệu") {
            iconName = "circle-info";
          } else if (route.name === "Bác sĩ") {
            iconName = "user-doctor";
          } else if (route.name === "Dịch vụ") {
            iconName = "briefcase-medical";
          }
          return <FontAwesome6 name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: COLORS.PersianGreen,
        tabBarInactiveTintColor: COLORS.gray,
      })}>
      <Tab.Screen name="Giới thiệu" component={Information_Specialty} />
      <Tab.Screen
        name="Bác sĩ"
        component={DoctorList_Specialty}
        initialParams={{ specialty }}
      />
      <Tab.Screen name="Dịch vụ" component={Services_Specialty} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
