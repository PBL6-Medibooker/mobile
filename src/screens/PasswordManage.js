import {
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
  } from "react-native";
  import React, { useState } from 'react';
  import { useAuth } from "../AuthProvider";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { HeaderBack } from "../components";
  import { COLORS} from "../constants";
  import { InputPassword } from "../components"
  
 
  const PasswordManage = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack navigation={navigation} title="Quản Lý Mật Khẩu" />
            <View style={styles.inputContainer}>
                
                <Text style={styles.label}>Mật khẩu hiện tại</Text>
                <InputPassword
                    value={currentPassword}
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


  