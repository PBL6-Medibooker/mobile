import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { SafeAreaView } from "react-native-safe-area-context"
import { COLORS, images } from "../constants"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "../AuthProvider"
import { InputPassword } from "../components"
import Account_API from "../API/Account_API"

const Login = ({ navigation }) => {
    const [account, setAccount] = useState({ email: "", password: "123qwe!@#QWE" })
    const [loadingStatus, setLoadingStatus] = useState(false)

    const { fetchUserAndAccount } = useAuth()

    useEffect(() => {
        const getLoginHistory = async () => {
            const userString = await AsyncStorage.getItem("myEmail")
            setAccount({ ...account, email: userString })
        }
        getLoginHistory()
    }, [])

    const handleLogin = async () => {
        try {
            setLoadingStatus(true)
            const res = await Account_API.userLogin(account)
            if (typeof res === "object" && res.token) {
                await fetchUserAndAccount()
                setLoadingStatus(false)

                Alert.alert("Thông báo", "Đăng nhập thành công.", [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate("Home")
                        },
                    },
                ])
            }
        } catch (error) {
            setLoadingStatus(false)
            Alert.alert("Đăng nhập thất bại", error, [{ text: "OK" }])
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {loadingStatus && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 100,
                    }}>
                    <ActivityIndicator size="large" color={COLORS.PersianGreen} />
                </View>
            )}

            <View style={styles.backButtonContainer}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons
                        onPress={() => {
                            navigation.navigate("Home")
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
                            setAccount({ ...account, email: value })
                        }}
                    />
                    <Text style={styles.label}>Mật khẩu</Text>
                    <InputPassword
                        value={account.password}
                        onChangeText={(value) => {
                            setAccount({ ...account, password: value })
                        }}
                    />

                    <Pressable
                        onPress={() => {
                            handleLogin()
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

                    <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
                        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>

                <Text>Bạn chưa có tài khoản?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.registerText}>Tạo tài khoản</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login

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
        paddingVertical: 7,
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
})
