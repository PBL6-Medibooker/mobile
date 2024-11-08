import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "../components";

import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { tr, vi } from "date-fns/locale";
import { useAuth } from "../AuthProvider";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const QADetail = ({ navigation, route }) => {
  const { QA, replier } = route.params || {};

  const { accountInfo } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} backgroundColor={true} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.question}>
          <Text style={styles.title}>{QA.post_title}</Text>
          <View style={styles.userInfo}>
            <AntDesign name="message1" size={18} color={COLORS.PersianGreen} />
            <Text style={styles.userName}>{QA.user_id.email}</Text>
          </View>
          <View style={styles.specialty}>
            <Text style={{ fontSize: 12 }}>
              #{QA.speciality_id?.name?.replace(/\s/g, "")}
            </Text>
          </View>
          <Text style={styles.content}>{QA.post_content}</Text>
          <Text style={styles.createdDate}>
            Đăng lúc:{" "}
            {formatDistanceToNow(new Date(QA.createdAt), {
              addSuffix: true,
              locale: vi,
            })}
          </Text>
        </View>

        {QA.post_comments?.length > 0 && (
          <View style={styles.answer}>
            <View style={styles.doctorInfo}>
              <Image
                source={
                  replier.profile_image
                    ? { uri: `data:image/png;base64,${replier.profile_image}` }
                    : images.doctor_default
                }
                style={styles.image}
              />
              <View>
                <View
                  style={styles.commentContainer}>
                  <Text style={styles.usernameComment}>
                    {replier?.username}
                  </Text>
                  <Text style={styles.content}>
                    {QA.post_comments[0].comment_content}
                  </Text>
                </View>
                {accountInfo.email === replier.email && (
                  <View style={styles.editIcon}>
                  <FontAwesome name="edit" size={15} color={COLORS.gray} />
                  </View>
                )}
              </View>
            </View>
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
    paddingBottom: 10,
    borderBottomWidth: 1,
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
    backgroundColor: COLORS.Concrete,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  answer: {
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10,
    paddingTop: 15,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 999,
    borderColor: COLORS.Light20PersianGreen,
    borderWidth: 0.5,
    marginEnd: 10,
  },
  doctorInfo: {
    flexDirection: "row",
    marginBottom: 10,
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderColor: COLORS.PersianGreen
  },
  createdDate: {
    fontSize: 12,
    textAlign: "right",
    paddingTop: 5,
    marginTop: 5,
    color: COLORS.gray,
  },
  commentContainer: {
    backgroundColor: COLORS.silver,
    padding: 8,
    borderRadius: 10,
    position: "relative",
  },
  usernameComment: {
    fontWeight: "bold",
  },
  editIcon: {
    position: "absolute",
    bottom: -18,
    right: 0,
  },
});
