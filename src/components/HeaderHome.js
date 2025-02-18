import { useNavigation } from "@react-navigation/native"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { COLORS, images } from "../constants"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useAuth } from "../AuthProvider"

const HeaderHome = ({ title, navigation }) => {
    // const navigation = useNavigation();
    const { account, storedToken, isLoggedIn } = useAuth()
    const handle = () => {
        if (!isLoggedIn) {
            navigation.navigate("Login")
        } else {
            navigation.navigate("UserProfile")
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={styles.iconContainer}>
                <Ionicons name="menu" size={48} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
            <TouchableOpacity onPress={() => handle()} activeOpacity={0.7}>
                <Image
                    source={
                        account?.profile_image
                            ? { uri: account.profile_image }
                            : images.user_default
                    }
                    style={styles.image}
                />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderHome

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 12,
        paddingVertical: 10,
        backgroundColor: COLORS.PersianGreen,
    },
    iconContainer: {
        height: 48,
        width: 48,
        borderRadius: 999,
    },
    image: {
        width: 48,
        height: 48,
        resizeMode: "cover",
        borderRadius: 999,
        borderWidth: 2,
        borderColor: COLORS.Light50PersianGreen,
        backgroundColor: COLORS.silver,
    },
    text: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
    },
})
