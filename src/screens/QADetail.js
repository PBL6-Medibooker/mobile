// import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "../components";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

const QADetail = ({ navigation, route }) => {
  const { QA } = route.params || {};
  //   if (QA) console.log(QA);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Q&A" />

      <ScrollView style={{padding: 12}} showsVerticalScrollIndicator={false}>
        <View style={styles.question}>
          <Text style={styles.title}>{QA.title}</Text>
          <View style={styles.userInfo}>
            <AntDesign name="message1" size={18} color={COLORS.PersianGreen} />
            <Text style={styles.userName}>{QA.user}</Text>
          </View>
          <View style={styles.specialty}>
            <Text>#{QA.specialty.replace(/\s/g, "")}</Text>
          </View>
          <Text style={styles.content}>{QA.question}</Text>
          {/* <Pressable
            onPress={() => {
              setIsViewAnswer(!isViewAnswer);
            }}
            style={{ alignSelf: "flex-end" }}>
            <Text style={styles.viewText}>Xem câu trả lời</Text>
          </Pressable> */}
        </View>

        <View style={styles.answer}>
          <View style={styles.doctorInfo}>
            <Image source={images.user_default} style={styles.image} />
            <View>
              <Text>{QA.answer.doctor}</Text>
              <Text>Bác sĩ</Text>
            </View>
          </View>
          <Text style={styles.content}>{QA.answer.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QADetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    // zIndex: 100,
    // shadowOffset: {
    //   width: 10,
    //   height: 10,
    // },
    // shadowColor: COLORS.Concrete,
    // shadowOpacity: 0.3,
    // elevation: 5,
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
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: COLORS.Concrete,
    marginBottom: 10,
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
