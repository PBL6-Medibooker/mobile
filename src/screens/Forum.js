import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
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
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useSpecialities from "../hooks/useSpecialities";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useAuth } from "../AuthProvider";
import QandAItem from "../components/PostItem";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import Post_API from "../API/Post_API";

const Forum = ({ navigation }) => {
  const { accountInfo, isLoggedIn } = useAuth();

  const [specialitiesHook] = useSpecialities();
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);

  const [specialty, setSpecialty] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  const refRBSheet = useRef();
  const refScroll = useRef();

  const route = useRoute();

  const getPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await Post_API.get_All_Post();
      setPostList([]);
      setPostList(allPosts);
      setLoading(false);

      // Scroll to top when data is refreshed
      // if (refScroll.current) {
      //   refScroll.current.scrollToIndex({ index: 0, animated: true });
      // }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPosts();
    }, [])
  );

  const updatePostByID = async (id) => {
    try {
      const updatedPost = await Post_API.get_Post_By_Id(id);
      if (updatedPost) {
        setPostList((prevList) =>
          prevList.map((post) => (post._id === id ? updatedPost : post))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (route.params?.refresh) {
      updatePostByID(route.params?.refresh);
    }
  }, [route.params?.refresh]);

  const handleSpecialityChange = async (region, specialty, sortBy) => {
    const filterPosts = await Post_API.get_Post_By_Specialty_Sort(
      specialty,
      sortBy
    );
    setPostList(filterPosts);
    setSpecialty(specialty);
    setSortBy(sortBy);
    setSearchQuery(null);
  };

  const handleSearch = async (search_query) => {
    setSearchQuery(search_query);
    try {
      const searchPosts = await Post_API.search_Post_By_Specialty_Sort(
        search_query,
        specialty,
        sortBy
      );
      // console.log(searchPosts);
      setPostList(searchPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPost = () => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("AddPost");
    }
  };

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await getPosts();
  //   setRefreshing(false);
  // };

  const renderQandAItem = useCallback(
    ({ item }) => <QandAItem item={item} navigation={navigation} />,
    [navigation]
  );

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={COLORS.PersianGreen} />
      </View>
    );
  }

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
          <TextInput
            style={styles.textInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(query) => handleSearch(query)}
            clearButtonMode="always"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={styles.btnFilter}
          onPress={() => refRBSheet.current.open()}>
          <FontAwesome name="filter" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {postList && postList.length > 0 ? (
        <FlatList
          ref={refScroll}
          style={styles.list}
          data={postList}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={renderQandAItem}
          ListHeaderComponent={<View style={{ height: 10 }} />}
          ListFooterComponent={<View style={{ height: 15 }} />}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        />
      ) : (
        <Text style={{marginHorizontal: 10, marginTop: 5}}>Không có bài post nào</Text>
      )}

      {!accountInfo?.__t && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
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
    borderRadius: 5,
    height: 38
  },
  textInput: {
    flex: 1,
    paddingBottom: 8,
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
