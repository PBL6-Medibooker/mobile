import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import { useCallback, useRef, useState } from "react";
import { RadioButton } from "../components";
import User from "../models/User_Model";
import Account_API from "../API/Account_API";

const options = [
  { label: "Bác sĩ", value: "doctor" },
  { label: "Người dùng", value: "user" },
];

const Register = ({ navigation }) => {
  const [fullname, setFullname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const isBlank = () => {
    if (!fullname) {
      setMessage("fullname");
      return;
    }
    if (!email) {
      setMessage("email");
      return;
    }
    if (!phone) {
      setMessage("phone");
      return;
    }
    if (!password) {
      setMessage("password");
      return;
    }
    if (!confirmPassword) {
      setMessage("confirmPassword");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("notMatch");
      return;
    }
    if (!type) {
      setMessage("type");
      return;
    }

    setMessage(null); // Nếu không có lỗi nào thì xóa thông báo
  };

  const handleRegister = async () => {
    setIsVerified(true);
    isBlank();
    const user = new User(email, password, phone, fullname, type);
    
    const res = await Account_API.userSignup(user);
    console.log(res);
    Alert.alert(
      "Thông báo",
      typeof res === "string" ? res : "Đăng ký tài khoản thành công.", //JSON.stringify(res)
      [
        {
          text: "OK",
          onPress: () => {
            if (typeof res !== "string") navigation.navigate("Login");
          },
        },
      ]
    );
    // navigation.navigate("Login")
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons
              onPress={() => {
                navigation.goBack();
              }}
              name="arrow-back-outline"
              size={48}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <Text style={styles.title}>ĐĂNG KÝ TÀI KHOẢN</Text>
        </View>

        <View style={{ flex: 1, marginHorizontal: 20, marginTop: 10 }}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Fullname"
            value={fullname}
            onChangeText={(value) => {
              setFullname(value);
            }}
            onFocus={() => {
              if (message === "fullname") setMessage(null);
            }}
          />
          {isVerified && message === "fullname" ? (
            <Text style={styles.message}>* Chưa nhập họ tên</Text>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            inputMode="email"
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
            }}
            onFocus={() => {
              if (message === "email") setMessage(null);
            }}
          />
          {isVerified && message === "email" ? (
            <Text style={styles.message}>* Chưa nhập email</Text>
          ) : null}

          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            onFocus={() => {
              if (message === "phone") setMessage(null);
            }}
          />
          {isVerified && message === "phone" ? (
            <Text style={styles.message}>* Chưa nhập số điện thoại</Text>
          ) : null}

          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => {
              if (message === "password") setMessage(null);
            }}
          />
          {isVerified && message === "password" ? (
            <Text style={styles.message}>* Chưa nhập mật khẩu</Text>
          ) : null}

          <Text style={styles.label}>Xác nhận lại mật khẩu</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => {
              if (message === ("confirmPassword" || "notMatch"))
                setMessage(null);
            }}
          />
          {isVerified && message === "confirmPassword" ? (
            <Text style={styles.message}>* Chưa nhập mật khẩu xác thực</Text>
          ) : null}
          {isVerified && message === "notMatch" ? (
            <Text style={styles.message}>* Mật khẩu không trùng khớp</Text>
          ) : null}

          <Text style={styles.label}>Loại tài khoản</Text>
          <RadioButton
            options={options}
            selectedOption={type}
            onSelect={setType}
            onFocus={() => {
              if (message === "type") setMessage(null);
            }}
          />
          {isVerified && message === "type" ? (
            <Text style={styles.message}>* Chưa nhập loại tài khoản</Text>
          ) : null}

          <Pressable
            onPress={() => {
              handleRegister();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? COLORS.Light50PersianGreen
                  : COLORS.PersianGreen,
              },
              styles.button,
            ]}>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 15,
              }}>
              Đăng ký
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: COLORS.PersianGreen,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  title: {
    marginVertical: 15,
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  label: {
    color: COLORS.PersianGreen,
    marginTop: 10,
    marginBottom: 4,
  },
  button: {
    marginTop: 12,
    borderRadius: 999,
    color: COLORS.PersianGreen,
    padding: 7,
  },
  message: {
    color: COLORS.red,
    fontSize: 12,
  },
});
