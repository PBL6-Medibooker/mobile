// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// import { useAuth } from '../AuthProvider';
// import { COLORS, images } from "../constants";
// const ForgetPassword = () => {
//   const [email, setEmail] = useState('');
//   const { Forgot_Pass } = useAuth();
//   const handleForgotPassword = async () => {
//     if (!email) {
//       Alert.alert('Error', 'Please enter your email address');
//       return;
//     }
//     try {
//       const response = await Forgot_Pass(email);
//       if (response.error) {
//         Alert.alert('Error', response.error);
//       } else {
//         Alert.alert('Success', 'Password reset link sent to your email');
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Forgot Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
//         <Text style={styles.buttonText}>Reset Password</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 50,
//     borderColor: COLORS.silver,
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: COLORS.PersianGreen,
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: COLORS.white,
//     fontSize: 16,
//   },
// });
// export default ForgetPassword;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../AuthProvider';
import { COLORS, images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
 
 
const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { Forgot_Pass } = useAuth();
 
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Thông báo", "Vui lòng nhập địa chỉ email");
      return;
    }
 
    if (!isValidEmail(email)) {
      Alert.alert("Thông báo", "Sai cú pháp email");
      return;
    }
    setLoading(true);
    const response = await Forgot_Pass(email);
 
    if (response.error) {
      Alert.alert("Thông báo", response.error);
    } else {
      Alert.alert("Thông báo", "Password reset link sent to your email");
    }
    setLoading(false);
  };
 
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons
            onPress={() => {
              navigation.navigate("Login");
            }}
            name="arrow-back-outline"
            size={48}
            color={COLORS.PersianGreen}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.itemcontainer}>
        <Text style={styles.title}>Quên mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleForgotPassword()}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />  // Hiển thị biểu tượng loading khi đang xử lý
          ) : (
            <Text style={styles.buttonText}>Reset mật khẩu</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
 
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
  itemcontainer: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.PersianGreen
  },
  input: {
    height: 50,
    borderColor: COLORS.silver,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.PersianGreen,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold"
  },
});
 
export default ForgetPassword;