import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { COLORS, images } from "../constants"
import { useEffect, useState } from "react"
import { useAuth } from "../AuthProvider"
import { SafeAreaView } from "react-native-safe-area-context"

const DrawerContent = ({ navigation, isLoggedIn }) => {
    const [myAccount, setMyAccount] = useState(null)
    const { account } = useAuth()
    // const [, , account] = useAccount();

    const handleManagerAccount = () => {
        if (!isLoggedIn) {
            navigation.navigate("Login")
        } else {
            navigation.navigate("UserProfile")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => handleManagerAccount()}>
                <Image
                    source={
                        account?.profile_image
                            ? { uri: account.profile_image }
                            : images.user_default
                    }
                    style={styles.image}
                />
            </Pressable>
            <Text
                style={{
                    color: COLORS.PersianGreen,
                    fontWeight: "bold",
                    fontSize: 16,
                }}>
                {isLoggedIn && account ? account.username : "Khách"}
            </Text>
            {isLoggedIn && account && (
                <Text style={{ color: COLORS.black, fontSize: 12 }}>{account.email}</Text>
            )}

            {isLoggedIn && account?.__t && (
                <Text style={{ color: COLORS.black, fontSize: 12 }}>(Bác sĩ)</Text>
            )}
            {!isLoggedIn && (
                <Text
                    onPress={() => handleManagerAccount()}
                    style={{ color: COLORS.black, fontSize: 12 }}>
                    Đăng nhập/đăng kí
                </Text>
            )}
            <View style={styles.separate}></View>
        </SafeAreaView>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        height: 180,
        width: "100%",
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        height: 90,
        width: 90,
        resizeMode: "cover",
        borderRadius: 999,
        borderColor: COLORS.PersianGreen,
        padding: 10,
        borderWidth: 3,
        backgroundColor: COLORS.silver,
    },
    separate: {
        backgroundColor: COLORS.PersianGreen,
        height: 1,
        marginVertical: 10,
        width: "80%",
    },
})
