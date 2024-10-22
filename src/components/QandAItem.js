import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

const QandAItem = ({ item, navigation }) => {
  const [isViewAnswer, setIsViewAnswer] = useState(false);

  const toggleShowFullText = () => {
    navigation.navigate("QADetail", { QA: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.userInfo}>
          <AntDesign name="message1" size={18} color={COLORS.PersianGreen} />
          <Text style={styles.userName}>{item.user}</Text>
        </View>
        <View style={styles.specialty}>
          <Text>#{item.specialty.replace(/\s/g, "")}</Text>
        </View>
        <Text style={styles.content}>{item.question}</Text>
        <Pressable
          onPress={() => {
            setIsViewAnswer(!isViewAnswer);
          }}
          style={{ alignSelf: "flex-end" }}>
          <Text style={styles.viewText}>Xem câu trả lời</Text>
        </Pressable>
      </View>

      {isViewAnswer && (
        <View style={styles.answer}>
          <View style={styles.doctorInfo}>
            <Image source={images.user_default} style={styles.image} />
            <View>
              <Text>{item.answer.doctor}</Text>
              <Text>Bác sĩ</Text>
            </View>
          </View>
          <Text numberOfLines={4} style={styles.content}>
            {item.answer.content}
          </Text>

          {item.answer.content.length > 100 && (
            <TouchableOpacity onPress={toggleShowFullText} style={{alignSelf: 'flex-start'}}>
              <Text style={styles.viewText}>Xem thêm</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default QandAItem;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // backgroundColor: COLORS.white,
  },
  question: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    zIndex: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    // shadowColor: COLORS.Concrete,
    // shadowOpacity: 0.5,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  user: {
    flexDirection: "row",
    paddingVertical: 3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 3,
  },
  userName: {
    color: COLORS.PersianGreen,
    marginStart: 5,
  },
  content: {
    textAlign: "justify",
  },
  specialty: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: COLORS.silver,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  viewText: {
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  answer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: COLORS.Concrete,
    marginBottom: 10,
    marginTop: -10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 999,
    borderColor: COLORS.gray,
    borderWidth: 0.5,
    marginEnd: 15,
  },
  doctorInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
