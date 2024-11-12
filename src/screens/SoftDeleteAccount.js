import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useAuth } from '../AuthProvider';
import Account_API from '../API/Account_API'; 
import { useNavigation } from '@react-navigation/native'; // Thêm import này

const SoftDeleteAccount = () => {
    const { accountInfo, logout } = useAuth(); // Lấy hàm logout từ AuthProvider
    const account_Ids = [accountInfo?._id];
    const [is_deleted, setIsDeleting] = useState(false);
    const navigation = useNavigation(); // Khởi tạo navigation

    const handleSoftDelete = async () => {
        // Cảnh báo xác nhận trước khi xóa
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa tài khoản không?",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Hủy bỏ"),
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        setIsDeleting(true);
                        try {
                            const response = await Account_API.softDeleteAccount(account_Ids);
                            Alert.alert("Thành công", "Tài khoản đã được xóa mềm.", [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        logout(); // Gọi hàm logout
                                        navigation.navigate('Login'); // Điều hướng về màn hình Login
                                    }
                                }
                            ]);
                        } catch (error) {
                            console.error(error);
                            Alert.alert("Lỗi", "Không thể xóa tài khoản. Vui lòng thử lại.");
                        } finally {
                            setIsDeleting(false);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quản Lý Tài Khoản</Text>
            <Button 
                title={is_deleted ? "Đang xóa..." : "Xóa tài khoản"}
                onPress={handleSoftDelete}
                disabled={is_deleted}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default SoftDeleteAccount;
