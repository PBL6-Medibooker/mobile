import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "../components";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

const QADetail = ({ navigation, route }) => {
  const { QA } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Q&A" />

      <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}>
        <View style={styles.question}>
          <Text style={styles.title}>{QA.post_title}</Text>
          <View style={styles.userInfo}>
            <AntDesign name="message1" size={18} color={COLORS.PersianGreen} />
            <Text style={styles.userName}>{QA.user_id.email}</Text>
          </View>
          <View style={styles.specialty}>
            <Text>#{QA.speciality_id.name.replace(/\s/g, "")}</Text>
          </View>
          <Text style={styles.content}>{QA.post_content}</Text>
        </View>

        {QA.post_comments?.length > 0 && (
          <View style={styles.answer}>
            <View style={styles.doctorInfo}>
              <Image source={images.user_default} style={styles.image} />
              <View>
                <Text>{QA.post_comments[0].replier}</Text>
                <Text>Bác sĩ</Text>
              </View>
            </View>
            <Text style={styles.content}>
              {QA.post_comments[0].comment_content}
            </Text>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default QADetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  question: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.Light20PersianGreen,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.PersianGreen,
    elevation: 3,
    zIndex: 1,
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
    alignItems: "center",
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
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: COLORS.Concrete,
    marginBottom: 10,
    marginTop: -10,
    paddingTop: 20,
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
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderColor: COLORS.PersianGreen
  },
});