import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BookingHistory,
  Forum,
  Home,
  Login,
  Logout,
  Myappointment,
  UserProfile,
} from "../screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DrawerContent } from "../components";
import { useAuth } from "../AuthProvider";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <DrawerContent
              navigation={props.navigation}
              isLoggedIn={isLoggedIn}
            />
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          marginTop: 32,
          backgroundColor: COLORS.white,
          width: 250,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
        },
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerShown: false,
        drawerActiveTintColor: COLORS.PersianGreen, // Màu của icon và label khi selected
        drawerInactiveTintColor: COLORS.black, // Màu của icon và label khi không selected
      }}>
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          headerShadowVisible: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
        component={Home}
      />
      {isLoggedIn && (
        <Drawer.Screen
          name="BookingHistory"
          options={{
            drawerLabel: "Hồ sơ khám bệnh",
            title: "Myappointment",
            headerShadowVisible: false,
            drawerIcon: ({ color }) => (
              <MaterialIcons name="calendar-month" size={24} color={color} />
            ),
          }}
          component={Myappointment}
        />
      )}

      <Drawer.Screen
        name="Forum"
        options={{
          drawerLabel: "Diễn đàn",
          title: "Forum",
          headerShadowVisible: false,
          drawerIcon: ({ color }) => (
            <MaterialIcons name="forum" size={24} color={color} />
          ),
        }}
        component={Forum}
      />

      <Drawer.Screen
        name="Noticed"
        options={{
          drawerLabel: "Thông báo",
          title: "Noticed",
          headerShadowVisible: false,
          drawerIcon: ({ color }) => (
            <MaterialIcons
              name="circle-notifications"
              size={24}
              color={color}
            />
          ),
        }}
        component={UserProfile}
      />

      {isLoggedIn ? (
        <>
          <Drawer.Screen
            name="User"
            options={{
              drawerLabel: "Tài khoản",
              title: "UserProfile",
              headerShadowVisible: false,
              drawerIcon: ({ color }) => (
                <MaterialIcons name="account-circle" size={24} color={color} />
              ),
            }}
            component={UserProfile}
          />
          <Drawer.Screen
            name="Logout"
            options={{
              drawerLabel: "Đăng xuất",
              title: "Logout",
              headerShadowVisible: false,
              drawerIcon: ({ color }) => (
                <MaterialIcons name="logout" size={24} color={color} />
              ),
              // drawerLabelPress: ({ navigation }) => handleLogout(navigation),
            }}
            component={Logout} // Sử dụng component Logout vừa tạo
          />
        </>
      ) : (
        <Drawer.Screen
          name="Login"
          options={{
            drawerLabel: "Đăng nhập",
            title: "Login",
            headerShadowVisible: false,
            drawerIcon: ({ color }) => (
              <MaterialIcons name="account-circle" size={24} color={color} />
            ),
          }}
          component={Login}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
