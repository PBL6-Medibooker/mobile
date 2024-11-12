import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import { COLORS, images } from "../constants";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { HeaderBack } from "../components";
  import { formatToDDMMYYYY, formatToHHMMSS } from "../utils/ConvertDate";
  import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
  import { windowWidth } from "../utils/Dimentions";
  import useArticles from "../hooks/useArticles";
  import { useEffect, useRef, useState } from "react";
  
  const ViewArticle = ({ navigation, route }) => {
    const { post } = route.params || {};
  
    const [articlesByDoctor, setArticlesByDoctor] = useState([]);
  
    const [
      articlesHook,
      firstArticle,
      fourArticles,
      loading,
      getArticlesByDoctor,
    ] = useArticles();
  
    const scrollViewRef = useRef();
  
    useEffect(() => {
      const getArticlesByDoctorEmail = async () => {
        const articlesDoctor = await getArticlesByDoctor(
          post.doctor_id.email,
          post._id
        );
        // console.log(articlesDoctor);
        setArticlesByDoctor(articlesDoctor);
      };
  
      getArticlesByDoctorEmail();
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }, [post]);
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <HeaderBack navigation={navigation} backgroundColor={true} />
  
          {post ? (
            <View style={styles.articleContainer}>
              <Text style={styles.postTitle}>{post.article_title}</Text>
              <Text style={styles.postCreatedAt}>
                Đăng lúc: {formatToHHMMSS(post.date_published)}{" "}
                {formatToDDMMYYYY(post.date_published)}
              </Text>
              <Text style={styles.postContent}>{post.article_content}</Text>
              <Text style={styles.postSpecialty}>
                Bởi: {post.doctor_id.email}
              </Text>
            </View>
          ) : (
            <Text>Không nhận được dữ liệu</Text>
          )}
  
          <Text style={styles.relatedPost}>Bài viết liên quan</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginLeft: 15 }}>
            {articlesByDoctor.map((post) => (
              <View key={post._id}>
                <TouchableOpacity
                  style={styles.suggestedPost}
                  onPress={() =>
                    navigation.navigate("ViewArticle", { post: post })
                  }>
                  <Image
                    source={images.poster}
                    style={styles.imageSuggestedPost}
                  />
                  <Text style={styles.titleSuggestedPost} numberOfLines={2}>
                    {post.article_title}
                  </Text>
                  <View style={styles.dateSuggestedPostContainer}>
                    <FontAwesome5
                      name="calendar-alt"
                      size={15}
                      color={COLORS.gray}
                    />
                    <Text style={styles.dateSuggestedPost}>
                      {post.date_published}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
  
          <View style={{ height: 50 }} />
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ViewArticle;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    articleContainer: {
      marginHorizontal: 15,
    },
    postTitle: {
      color: COLORS.PersianGreen,
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: 10,
    },
    postSpecialty: {
      color: COLORS.gray,
      textAlign: "center",
      marginBottom: 10,
      textAlign: "right",
    },
    postContent: {
      fontSize: 16,
      textAlign: "justify",
    },
    postCreatedAt: {
      color: COLORS.gray,
      textAlign: "right",
      marginBottom: 5,
    },
    relatedPost: {
      color: COLORS.PersianGreen,
      fontSize: 16,
      marginBottom: 10,
      marginHorizontal: 15,
    },
    suggestedPost: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      backgroundColor: COLORS.white,
      shadowColor: COLORS.PersianGreen,
      alignItems: "center",
      width: (windowWidth / 4) * 3,
      borderWidth: 0.5,
      borderColor: COLORS.Light20PersianGreen,
      marginRight: 15,
      height: 210,
    },
    imageSuggestedPost: {
      height: 120,
      resizeMode: "cover",
      width: "100%",
    },
    titleSuggestedPost: {
      fontWeight: "bold",
      fontSize: 14,
      textDecorationLine: "underline",
      color: COLORS.blue,
      textAlign: "justify",
      marginTop: 5,
      alignSelf: "flex-start",
    },
    dateSuggestedPostContainer: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      marginVertical: 5,
    },
    dateSuggestedPost: {
      fontSize: 12,
      color: COLORS.gray,
      marginLeft: 5,
    },
  });