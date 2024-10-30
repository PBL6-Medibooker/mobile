import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const ArticleItem = ({ data }) => (
  <View style={styles.itemContainer}>
    <View style={styles.imageButton}>
      <Image source={images.poster} style={styles.image} />
    </View>
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{data.post_title}</Text>
      </View>
      <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
        {data.post_content}
      </Text>
      <View style={styles.dateContainer}>
        <FontAwesome5 name="calendar-alt" size={15} color={COLORS.gray} />
        <Text style={styles.date}>{data.createdAt}</Text>
      </View>
    </View>
  </View>
);

export default ArticleItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.silver,
    margin: 5,
    marginHorizontal: 12,
    flexDirection: "row",
    padding: 10
  },
  imageButton: {
    height: 70,
    width: 90,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.silver,
  },
  item: {
    flex: 1,
    marginLeft: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textDecorationLine: "underline",
    color: COLORS.blue,
    textAlign: "justify",
  },
  content: {
    flex: 1, // Let the content take up the available space
    marginTop: 5,
    // marginEnd: 5,
    textAlign: "justify",
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 5,
  },
});
