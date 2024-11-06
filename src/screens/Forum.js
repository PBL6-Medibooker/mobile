import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet, HeaderBack } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCallback, useEffect, useRef, useState } from "react";
import useSpecialities from "../hooks/useSpecialities";
import usePosts from "../hooks/usePosts";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useAuth } from "../AuthProvider";
import QandAItem from "../components/QandAItem";

const Forum = ({ navigation }) => {
  const { accountInfo, isLoggedIn } = useAuth();

  const [specialitiesHook] = useSpecialities();
  const [postsHook, filterPosts] = usePosts();

  const [postList, setPostList] = useState([]);

  const refRBSheet = useRef();
  const refScroll = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      filterPosts();
      if (refScroll.current) {
        refScroll.current.scrollToIndex({ index: 0, animated: true });
      }
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, [navigation, filterPosts]);

  useEffect(() => {
    setPostList(postsHook);
  }, [postsHook]);

  const handleSpecialityChange = (region, specialty, sortBy) => {
    const filterPosts = specialty
      ? postsHook.filter((item) => item.speciality_id._id === specialty._id)
      : postsHook;
    if (Array.isArray(filterPosts)) {
      const sortPosts = filterPosts.slice().sort((a, b) => {
        if (sortBy === "A-Z") {
          return a.post_title.localeCompare(b.post_title);
        } else if (sortBy === "Z-A") {
          return b.post_title.localeCompare(a.post_title);
        }
        return 0;
      });
      setPostList(sortPosts);
    } else setPostList([]);
  };

  const handleAddPost = () => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("AddPost");
    }
  };

  const renderQandAItem = useCallback(
    ({ item }) => <QandAItem item={item} navigation={navigation} />,
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Forum" />

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

      {postList && postList.length > 0 ? (
        <FlatList
          ref={refScroll}
          style={styles.list}
          data={postList}
          keyExtractor={(item) => item._id}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index,
          })}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={renderQandAItem}
          ListHeaderComponent={<View style={{ height: 10 }} />}
          ListFooterComponent={<View style={{ height: 15 }} />}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
        />
      ) : (
        <Text>K co bai post nao</Text>
      )}

      {!accountInfo?.__t && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            handleAddPost();
          }}>
          <FontAwesome6 name="add" size={42} color={COLORS.white} />
        </TouchableOpacity>
      )}

      <BottomSheet
        bottomSheetRef={refRBSheet}
        onSelected={handleSpecialityChange}
        specialtyList={specialitiesHook}
        height={330}
      />
    </SafeAreaView>
  );
};

export default Forum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  list: {
    paddingHorizontal: 12,
    // marginTop: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 25, // Khoảng cách từ đáy màn hình
    right: 25,
    // transform: [{ translateX: -50 }], // Đưa nút về giữa
    backgroundColor: COLORS.PersianGreen,
    borderRadius: 999,
    height: 55,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
