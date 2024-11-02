import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet, HeaderBack, QandAItem } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useRef, useState } from "react";
import useSpecialities from "../hooks/useSpecialities";
import usePosts from "../hooks/usePosts";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useAuth } from "../AuthProvider";

const Forum = ({ navigation }) => {
  const [specialty, setSpecialty] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const { accountInfo } = useAuth();

  const [specialitiesHook] = useSpecialities();
  const [postsHook] = usePosts();

  const [specialtyList, setSpecialtyList] = useState([]);
  const [postList, setPostList] = useState([]);

  const refRBSheet = useRef();

  useEffect(() => {
    setPostList(postsHook);
  }, [postsHook]);

  const handleSpecialityChange = (region, specialty, sortBy) => {
    // if (specialty) {
    //   setSpecialty(specialty);
    //   console.log(specialty.name);
    // }
    // if (sortBy) setSortBy(sortBy);
    // console.log(sortBy);
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
          style={styles.list}
          data={postList}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => {
            return <QandAItem item={item} navigation={navigation} />;
          }}
          ListHeaderComponent={<View style={{ height: 10 }} />}
          ListFooterComponent={<View style={{ height: 15 }} />}
        />
      ) : (
        <Text>K co bai post nao</Text>
      )}

      {!accountInfo?.__t && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            /* Thêm hành động cho nút */
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
