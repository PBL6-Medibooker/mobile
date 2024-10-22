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
    <TouchableOpacity  style={styles.imageButton}>
      <Image source={images.poster} style={styles.image} />
    </TouchableOpacity>
    <View style={styles.item}>
      <TouchableOpacity>
        <Text style={styles.title}>{data.title}</Text>
      </TouchableOpacity>
      <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
        {data.content}
      </Text>
      <View style={styles.dateContainer}>
        <FontAwesome5 name="calendar-alt" size={15} color={COLORS.gray} />
        <Text style={styles.date}>{data.date}</Text>
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
  },
  imageButton: {
    height: 70,
    width: 90,
    overflow: "hidden",
  },
  image: {
    height: '100%',
    width: '100%',
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
