import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheet, HeaderBack } from "../components";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { COLORS, images } from "../constants";
import { useEffect, useRef } from "react";
import useSpecialities from "../hooks/useSpecialities";
import usePosts from "../hooks/usePosts";

export const Articles = ({ navigation }) => {
  const refRBSheet = useRef();

  const [postsHook, firstPost, fourPosts, loading] = usePosts();
  const [specialitiesHook] = useSpecialities();

  const handleSpecialityChange = (region, specialty, sortBy) => {};

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Tin tức" />

      <View style={styles.searchContainer}>
        <View style={styles.searchButton}>
          <FontAwesome
            name="search"
            size={16}
            color={COLORS.silver}
            style={styles.btnSearch}
          />
          <TextInput style={styles.textInput} placeholder="Search" />
        </View>

        <TouchableOpacity
          style={styles.btnFilter}
          onPress={() => refRBSheet.current.open()}>
          <FontAwesome
            name="filter"
            size={20}
            color={COLORS.white} // Thay đổi màu sắc nếu cần
          />
        </TouchableOpacity>
      </View>

      {!loading ? (
        <FlatList
        //   style={styles.list}
          data={postsHook}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => {
            return (
              <Text style={{ padding: 10 }}>{item.post_title}</Text>
              // <TouchableOpacity
              //   style={styles.postContainer}
              //   onPress={() =>
              //     navigation.navigate("ViewArticle", { post: item })
              //   }>
              //   <Image source={images.poster} style={styles.imagePost} />
              //   <Text style={styles.titlePost} numberOfLines={2}>
              //     {item.post_title}
              //   </Text>
              //   <Text style={[styles.datePost, { alignSelf: "flex-start" }]}>
              //     Thuộc {item.speciality_id?.name}
              //   </Text>
              //   <View style={styles.datePostContainer}>
              //     <FontAwesome5
              //       name="calendar-alt"
              //       size={18}
              //       color={COLORS.gray}
              //     />
              //     <Text style={styles.datePost}>{item.createdAt}</Text>
              //   </View>
              // </TouchableOpacity>
            );
          }}
          ListHeaderComponent={<View style={{ height: 10 }} />}
          ListFooterComponent={<View style={{ height: 10 }} />}
        />
      ) : <Text>dang loading</Text>}

      <BottomSheet
        bottomSheetRef={refRBSheet}
        onSelected={handleSpecialityChange}
        specialtyList={specialitiesHook}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingHorizontal: 12,
  },
  searchContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.PersianGreen,
    paddingBottom: 25,
    borderBottomStartRadius: 18,
    borderBottomEndRadius: 18,
  },
  searchButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.silver,
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
  },
  btnSearch: {
    marginHorizontal: 8,
  },
  btnFilter: {
    backgroundColor: COLORS.Light50PersianGreen,
    borderRadius: 8,
    marginStart: 5,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  postContainer: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  imagePost: {
    height: 150,
    resizeMode: "cover",
    width: "100%",
  },
  titlePost: {
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
    color: COLORS.blue,
    textAlign: "justify",
    marginTop: 5,
  },
  datePostContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    margin: 5,
  },
  datePost: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 5,
  },
});
