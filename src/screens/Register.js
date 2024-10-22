import {
  ActivityIndicator,
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
import { COLORS } from "../constants";
import { useEffect, useState } from "react";
import { Dropdown, InputPassword, RadioButton } from "../components";
import User from "../models/User_Model";
import Account_API from "../API/Account_API";
import Entypo from "@expo/vector-icons/Entypo";
import { UploadPDF } from "../utils/Upload";
import useSpecialities from "../hooks/useSpecialities";

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
  const [accountType, setAccountType] = useState(null);
  const [message, setMessage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const [specialtyDoctor, setSpecialtyDoctor] = useState(null);
  const [proofDoctor, setProofDoctor] = useState(null);

  const [sortSpecialities] = useSpecialities();

  const handleRegister = () => {
    setIsVerified(true);
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
    if (!accountType) {
      setMessage("type");
      return;
    }
    setIsVerified(false);
    reqLogin();
  };

  const handleFocus = (field) => {
    if (message === field) {
      setIsVerified(false);
    }
  };

  const reqLogin = async () => {
    if (specialtyDoctor) console.log("spec:", specialtyDoctor.value);

    const user = new User(email, password, phone, fullname, accountType);

    const res = await Account_API.userSignup(user);
    console.log(res);
    // if (res !== "Email and password is required!") {
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
    // }
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const handleUploadFile = async () => {
    setLoading(true);
    const pdf = await UploadPDF();
    // setLoading(false);
    console.log("pdf", pdf);

    if (pdf && pdf !== "isLoading") {
      setLoading(false);
      setUploadedFiles((prevFiles) => [...prevFiles, pdf]);
    }
  };
  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
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
              // if (message === "fullname") setMessage(null);
              handleFocus("fullname");
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
              handleFocus("email");
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
              // if (message === "phone") setMessage(null);
              handleFocus("phone");
            }}
          />
          {isVerified && message === "phone" ? (
            <Text style={styles.message}>* Chưa nhập số điện thoại</Text>
          ) : null}

          <Text style={styles.label}>Mật khẩu</Text>
          <InputPassword
            value={password}
            onChangeText={setPassword}
            onFocus={() => {
              handleFocus("password");
            }}
          />
          {isVerified && message === "password" ? (
            <Text style={styles.message}>* Chưa nhập mật khẩu</Text>
          ) : null}

          <Text style={styles.label}>Xác nhận lại mật khẩu</Text>
          <InputPassword
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => {
              handleFocus("confirmPassword");
              handleFocus("notMatch");
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
            selectedOption={accountType}
            onSelect={setAccountType}
            onFocus={() => {
              // if (message === "type") setMessage(null);
              handleFocus("type");
            }}
          />
          {isVerified && message === "type" ? (
            <Text style={styles.message}>* Chưa nhập loại tài khoản</Text>
          ) : null}

          {accountType === "doctor" && (
            <View>
              <Text style={styles.label}>Chuyên khoa</Text>
              <Dropdown
                data={[...sortSpecialities].reverse()}
                onChange={setSpecialtyDoctor}
                placeholder="Chọn chuyên khoa"
                value={specialtyDoctor}
              />

              <View style={styles.import}>
                <Text style={styles.label}>Minh chứng (nếu có)</Text>
                <TouchableOpacity
                  onPress={() => handleUploadFile()}
                  style={styles.buttonImport}>
                  <Entypo name="upload" size={18} color={COLORS.gray} />
                </TouchableOpacity>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : null}
              </View>

              {uploadedFiles.map((file, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 20 }}>• </Text>
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      color: COLORS.blue,
                      marginEnd: 10,
                    }}>
                    {file.name}
                  </Text>
                  <TouchableOpacity onPress={() => handleRemoveFile(index)}>
                    <Ionicons name="close" size={24} color={COLORS.gray} />
                  </TouchableOpacity>
                </View>
              ))}
              {/* <View style={{height: 20}} /> */}
            </View>
          )}

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

          {accountType === "doctor" && <View style={{ height: 100 }} />}
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
  import: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  label: {
    color: COLORS.PersianGreen,
    marginVertical: 4,
  },
  buttonImport: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.silver,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 15,
  },
});
