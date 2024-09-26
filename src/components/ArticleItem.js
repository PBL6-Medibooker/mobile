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
    <TouchableOpacity>
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
    margin: 10,
    flexDirection: "row",
  },
  image: {
    height: 70,
    width: 90,
    resizeMode: "cover",
    borderRadius: 10,
    borderColor: COLORS.black,
    padding: 10,
    borderWidth: 1,
    backgroundColor: COLORS.silver,
  },
  item: {
    flex: 1, // This allows the content to fill the remaining space
    marginLeft: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textDecorationLine: "underline",
    color: COLORS.blue,
    textAlign: 'justify'
  },
  content: {
    flex: 1, // Let the content take up the available space
    marginTop: 5,
    marginEnd: 5,
    textAlign: 'justify'
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 5
  },
});
