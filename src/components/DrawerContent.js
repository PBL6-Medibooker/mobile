import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, images } from "../constants";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";

const DrawerContent = ({ navigation, isLoggedIn }) => {
  const [myAccount, setMyAccount] = useState(null);
  const { accountInfo } = useAuth();
  // const [, , accountInfo] = useAccount();

  const handleManagerAccount = () => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("UserProfile");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleManagerAccount()}>
        <Image
          source={
            accountInfo?.profile_image
              ? { uri: `data:image/png;base64,${accountInfo.profile_image}` }
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
        {isLoggedIn && accountInfo ? accountInfo.username : "Khách"}
      </Text>
      {isLoggedIn && accountInfo && (
        <Text style={{ color: COLORS.black, fontSize: 12 }}>
          {accountInfo.email}
        </Text>
      )}

      {isLoggedIn && accountInfo?.__t && (
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
    </View>
  );
};

export default DrawerContent;

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
});