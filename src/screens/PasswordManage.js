import {
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
  } from "react-native";
  import React, { useState } from 'react';
  import { useAuth} from "../AuthProvider";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { HeaderBack } from "../components";
  import { COLORS} from "../constants";
  import { InputPassword } from "../components"
  import Account_API from "../API/Account_API"; // Đường dẫn tùy thuộc vào cấu trúc thư mục của bạn

  
 
  const PasswordManage = ({ navigation }) => {
    const { accountInfo } = useAuth();
    const email = accountInfo?.email;
    
    const [password, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }
    
        // Thực hiện logic để thay đổi mật khẩu ở đây
        console.log('Mật khẩu hiện tại:', password);
        console.log('Mật khẩu mới:', newPassword);
    
        // Gửi yêu cầu đến API để thay đổi mật khẩu
        try {
            // Giả sử bạn có một hàm gọi API là changePassword
            await Account_API.change_password(email, newPassword);
            alert("Thay đổi mật khẩu thành công!");
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
            alert("Không thể thay đổi mật khẩu. Vui lòng thử lại.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack navigation={navigation} title="Quản Lý Mật Khẩu" />
            <View style={styles.inputContainer}>
                
                <Text style={styles.label}>Mật khẩu hiện tại</Text>
                <InputPassword
                    value={password}
                    onChangeText={setCurrentPassword}
                />
                <Text style={styles.forgotPassword}>Forgot Password?</Text>

                <Text style={styles.label}>Mật khẩu mới</Text>
                <InputPassword
                    value={newPassword}
                    onChangeText={setNewPassword}
                />

                <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
                <InputPassword
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />


            <Pressable
            onPress={handleChangePassword}
              style={({pressed})  => [
              {
                backgroundColor: pressed
                ? COLORS.Light50PersianGreen
                : COLORS.PersianGreen,
              },
              styles.button,
            ]}
            >
            <Text style={styles.buttonText}>Thay đổi mật khẩu</Text>
          </Pressable>   
          </View>
        </SafeAreaView>
    );
};

export default PasswordManage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    inputContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 5,
    },
    forgotPassword: {
        fontSize: 14,
        color: COLORS.PersianGreen,
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    button: {
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});


  