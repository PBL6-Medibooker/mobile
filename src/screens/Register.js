import {
  ActivityIndicator,
  Alert,
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
import { useState } from "react";
import { Dropdown, InputPassword, RadioButton } from "../components";
import Entypo from "@expo/vector-icons/Entypo";
import { UploadPDF } from "../utils/Upload";
import useSpecialities from "../hooks/useSpecialities";
import Account_API from "../API/Account_API";

const options = [
  { label: "Bác sĩ", value: "doctor" },
  { label: "Người dùng", value: "user" },
];

const Register = ({ navigation }) => {
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const [account, setAccount] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    is_doc: null,
  });

  const [specialtyDoctor, setSpecialtyDoctor] = useState(null);
  const [proofDoctor, setProofDoctor] = useState(null);

  const [specialities, sortSpecialities] = useSpecialities();

  const handleRegister = () => {
    setIsVerified(true);
    if (!account.username) {
      setMessage("fullname");
      return;
    }
    if (!account.email) {
      setMessage("email");
      return;
    }
    if (!account.phone) {
      setMessage("phone");
      return;
    }
    if (!account.password) {
      setMessage("password");
      return;
    }
    if (!confirmPassword) {
      setMessage("confirmPassword");
      return;
    }
    if (account.password !== confirmPassword) {
      setMessage("notMatch");
      return;
    }
    if (account.is_doc === null) {
      setMessage("type");
      return;
    }
    setIsVerified(false);
    reqSignup();
  };

  const handleFocus = (field) => {
    if (message === field) {
      setIsVerified(false);
    }
  };

  const reqSignup = async () => {
    try {
      // if (specialtyDoctor) console.log("spec:", specialtyDoctor.value);

      // console.log(account);

      const res = await Account_API.userSignup(account);

      if (typeof res === "object" && res.token) {
        Alert.alert("Thông báo", "Đăng ký tài khoản thành công.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Login");
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
            value={account.username}
            onChangeText={(value) => {
              // setFullname(value);
              setAccount({ ...account, username: value });
            }}
            onFocus={() => {
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
            value={account.email}
            onChangeText={(value) => {
              // setEmail(value);
              setAccount({ ...account, email: value });
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
            value={account.phone}
            onChangeText={(value) => {
              // setPhone(value);
              setAccount({ ...account, phone: value });
            }}
            onFocus={() => {
              handleFocus("phone");
            }}
          />
          {isVerified && message === "phone" ? (
            <Text style={styles.message}>* Chưa nhập số điện thoại</Text>
          ) : null}

          <Text style={styles.label}>Mật khẩu</Text>
          <InputPassword
            value={account.password}
            onChangeText={(value) => {
              // setPassword(value);
              setAccount({ ...account, password: value });
            }}
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
            selectedOption={
              account.is_doc === 0
                ? "user"
                : account.is_doc === 1
                ? "doctor"
                : null
            }
            onSelect={(value) => {
              // setAccountType(value);
              setAccount({ ...account, is_doc: value === "doctor" ? 1 : 0 });
            }}
            onFocus={() => {
              handleFocus("type");
            }}
          />
          {isVerified && message === "type" ? (
            <Text style={styles.message}>* Chưa nhập loại tài khoản</Text>
          ) : null}

          {account.is_doc === 1 && (
            <View>
              <Text style={styles.label}>Chuyên khoa</Text>
              <Dropdown
                data={sortSpecialities}
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

          {account.is_doc === 1 && <View style={{ height: 100 }} />}
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
