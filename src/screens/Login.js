import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import User from "../models/User_Model";
import Account_API from "../API/Account_API";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../AuthProvider";
import { InputPassword } from "../components";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // const [message, setMessage] = useState(null);
  // const [isVerified, setIsVerified] = useState(false);

  const { storedToken, updateToken } = useAuth();
  // const [storedEmail, setStoredEmail] = useState(null);

  useEffect(() => {
    const getLoginHistory = async () => {
      const mail = await AsyncStorage.getItem("myEmail");
      setEmail(mail);
    };
    getLoginHistory();
  }, []);

  // const isBlank = () => {
  //   if (!email) {
  //     setMessage("email");
  //     return;
  //   }
  //   if (!password) {
  //     setMessage("password");
  //     return;
  //   }

  //   setMessage(null); // Nếu không có lỗi nào thì xóa thông báo
  // };

  const handleLogin = async () => {
    // setIsVerified(true);
    // isBlank();
    const user = new User(email, password);
    const res = await Account_API.userLogin(user);

    Alert.alert(
      "Thông báo",
      typeof res === "string" ? res : "Đăng nhập thành công.", //JSON.stringify(res)
      [
        {
          text: "OK",
          onPress: async () => {
            if (typeof res !== "string")
              if (res.token) {
                updateToken(res.token);
                await AsyncStorage.setItem("myEmail", email);
                navigation.navigate("Home");
              }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons
            onPress={() => {
              navigation.navigate("Home");
            }}
            name="arrow-back-outline"
            size={48}
            color={COLORS.PersianGreen}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.title}>ĐĂNG NHẬP</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập email."
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Mật khẩu</Text>
          <InputPassword
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            onPress={() => {
              handleLogin();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? COLORS.Light50PersianGreen
                  : COLORS.PersianGreen,
              },
              styles.buttonLogin,
            ]}>
            <Text style={styles.loginText}>Đăng nhập</Text>
          </Pressable>

          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <Text>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Tạo tài khoản</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButtonContainer: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  backButton: {
    height: 48,
    width: 48,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: 100,
  },
  title: {
    color: COLORS.PersianGreen,
    fontWeight: "bold",
    fontSize: 26,
    margin: 20,
  },
  formContainer: {
    margin: 20,
    width: "80%",
  },
  label: {
    color: COLORS.PersianGreen,
    marginVertical: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  buttonLogin: {
    marginTop: 12,
    borderRadius: 999,
    padding: 7,
  },
  loginText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  forgotPasswordText: {
    color: COLORS.blue,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  registerPrompt: {
    marginTop: 10,
  },
  registerText: {
    color: COLORS.blue,
  },
});
