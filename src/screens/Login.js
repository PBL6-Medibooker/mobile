import {
  Alert,
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
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../AuthProvider";
import { InputPassword } from "../components";
import Account_API from "../API/Account_API";

const Login = ({ navigation }) => {
  // const [message, setMessage] = useState(null);
  // const [isVerified, setIsVerified] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  useEffect(() => {
    const getLoginHistory = async () => {
      const mail = await AsyncStorage.getItem("myEmail");
      setAccount({ ...account, email: mail });
    };
    getLoginHistory();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await Account_API.userLogin(account);
      if (typeof res === "object" && res.token && res.role === "user") {
        Alert.alert("Thông báo", "Đăng nhập thành công.", [
          {
            text: "OK",
            onPress: async () => {
              login(res.token);
              await AsyncStorage.setItem("myEmail", res.email);
              console.log(res);

              navigation.navigate("Home");
            },
          },
        ]);
      } else {
        Alert.alert("Lỗi", res, [{ text: "OK" }]);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
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
            value={account.email}
            onChangeText={(value) => {
              setAccount({ ...account, email: value });
            }}
          />
          <Text style={styles.label}>Mật khẩu</Text>
          <InputPassword
            value={account.password}
            onChangeText={(value) => {
              setAccount({ ...account, password: value });
            }}
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
