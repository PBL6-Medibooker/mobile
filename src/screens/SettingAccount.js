import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import { useAuth } from "../AuthProvider";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { HeaderBack } from "../components";
  import { COLORS} from "../constants";
  import MaterialIcons from "@expo/vector-icons/MaterialIcons";
  import AntDesign from '@expo/vector-icons/AntDesign';


  
  const SettingAccount = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderBack navigation={navigation} title="Cài Đặt" />
        <View style={styles.mainContainer}>
          <View style={styles.item}>
            <Ionicons 
            name="notifications-outline" size={28} style={styles.iconItem} />
            <Text style={styles.textItem}>Cài Đặt Thông Báo</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SettingNotification')}> 
            <Ionicons
              name="chevron-forward"
              size={28}
              color={COLORS.PersianGreen}
            />
            </TouchableOpacity> 
          </View>
  
          <View style={styles.item}>
            <MaterialIcons
            name="password" size={28} style={styles.iconItem} />
            <Text style={styles.textItem}>Quản Lý Mật Khẩu</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PasswordManage')}>
            <Ionicons
              name="chevron-forward"
              size={28}
              color={COLORS.PersianGreen}
            />
            </TouchableOpacity>
          </View>
  
          <View style={styles.item}>
            <AntDesign
              name="deleteuser"
              size={28}
              style={styles.iconItem}
            />
            <Text style={styles.textItem}>Xóa Tài Khoản</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons
              name="chevron-forward"
              size={28}
              color={COLORS.PersianGreen}
            />
            </TouchableOpacity>
          </View>  
        </View>
      </SafeAreaView>
    );
  };
  
  export default SettingAccount;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    contentTitle: {
      backgroundColor: COLORS.PersianGreen,
      flexDirection: "row",
      paddingVertical: 20,
      paddingStart: 25,
    },
    myAvatar: {
      width: 120,
      aspectRatio: 1,
      resizeMode: "cover",
      borderRadius: 40,
      marginRight: 12,
      backgroundColor: COLORS.silver,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 40,
    },
    uploadAvatar: {
      position: "absolute",
      top: 91,
      start: 91,
      backgroundColor: COLORS.white,
      padding: 2,
      borderRadius: 999,
    },
    myBasicInformation: {
      justifyContent: "space-between",
      marginVertical: 15,
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      color: COLORS.white,
    },
    mainContainer: {
      flex: 1,
      margin: 20,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    iconItem: {
      color: COLORS.Light50PersianGreen,
      backgroundColor: COLORS.PersianGreen,
      padding: 14,
      borderRadius: 999,
    },
    textItem: {
      fontSize: 20,
      flex: 1,
      marginHorizontal: 10,
      paddingStart: 5,
    },
  });
  