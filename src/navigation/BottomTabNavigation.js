import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SpecialtyDetail } from "../screens";
import { COLORS } from "../constants";
import { HeaderBack } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const Information_Specialty = ({ route, navigation }) => {
  const { specialty } = route.params || {};
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title={specialty.name}
        screenName="Specialty"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.descriptionSpecialty}>{specialty.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const DoctorList_Specialty = ({ route, navigation }) => {
  const { specialty } = route.params || {};
  return <SpecialtyDetail navigation={navigation} specialty={specialty} />;
};

const Services_Specialty = ({ route, navigation }) => {
  const { specialty } = route.params || {};
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title={specialty.name}
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
      <Tab.Screen
        name="Giới thiệu"
        component={Information_Specialty}
        initialParams={{ specialty }}
      />
      <Tab.Screen
        name="Bác sĩ"
        component={DoctorList_Specialty}
        initialParams={{ specialty }}
      />
      <Tab.Screen
        name="Dịch vụ"
        component={Services_Specialty}
        initialParams={{ specialty }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  descriptionSpecialty: {
    textAlign: 'justify',
    margin: 15
  }
});
