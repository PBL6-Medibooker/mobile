import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BottomSheet, HeaderBack } from "../components"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { COLORS, images } from "../constants"
import { useCallback, useEffect, useRef, useState } from "react"
import useSpecialities from "../hooks/useSpecialities"
import useArticles from "../hooks/useArticles"
import { useFocusEffect } from "@react-navigation/native"
import Article_API from "../API/Article_API"
import { formatToDDMMYYYY, formatToHHMMSS } from "../utils/ConvertDate"

export const Articles = ({ navigation }) => {
    const refRBSheet = useRef()

    const [
        articlesHook,
        firstArticle,
        fourArticles,
        loading,
        getArticlesBySpecialty,
        getArticlesByDoctor,
        filterArticles,
    ] = useArticles()

    const [specialitiesHook] = useSpecialities()

    const [articleList, setArticleList] = useState([])
    const [searchQuery, setSearchQuery] = useState(null)

    const handleSpecialityChange = async (region, specialty, sortBy) => {
        setSearchQuery(null)
        if (specialty?.name) {
            const filter = await getArticlesBySpecialty(specialty.name, sortBy)
            setArticleList(filter)
        } else if (!specialty?.name && sortBy) {
            const sort = articlesHook.slice().sort((a, b) => {
                if (sortBy === "A-Z") {
                    return a.article_title.localeCompare(b.article_title) // Sắp xếp A-Z
                } else if (sortBy === "Z-A") {
                    return b.article_title.localeCompare(a.article_title) // Sắp xếp Z-A
                }
                return 0
            })
            setArticleList(sort)
        } else if (!specialty && !sortBy) {
            setArticleList(articlesHook)
        }
    }

    const handleSearch = async (search_query) => {
        setSearchQuery(search_query)
        try {
            const searchPosts = await Article_API.search_Article(search_query)
            setArticleList(searchPosts)
        } catch (error) {
            console.error(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            setArticleList(articlesHook)
        }, [articlesHook])
    )

    return (
        <SafeAreaView style={[styles.container, { flex: 1 }]}>
            <HeaderBack navigation={navigation} title="Tin tức" />
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
                    <FontAwesome
                        name="filter"
                        size={20}
                        color={COLORS.white} // Thay đổi màu sắc nếu cần
                    />
                </TouchableOpacity>
            </View>

            {!loading ? (
                articleList && articleList.length > 0 ? (
                    <FlatList
                        style={styles.list}
                        data={articleList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item._id}
                        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    style={styles.postContainer}
                                    onPress={() =>
                                        navigation.navigate("ViewArticle", { post: item })
                                    }>
                                    <Image
                                        source={
                                            item?.article_image
                                                ? { uri: item.article_image }
                                                : images.poster
                                        }
                                        style={styles.imagePost}
                                    />
                                    <Text style={styles.titlePost} numberOfLines={2}>
                                        {item.article_title}
                                    </Text>
                                    <Text style={styles.specialtyPost}>
                                        Đăng bởi: {item.doctor_id?.email}
                                    </Text>
                                    <View style={styles.datePostContainer}>
                                        <FontAwesome5
                                            name="calendar-alt"
                                            size={18}
                                            color={COLORS.gray}
                                        />
                                        <Text style={styles.datePost}>
                                            {formatToHHMMSS(item.date_published)}{" "}
                                            {formatToDDMMYYYY(item.date_published)}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        ListHeaderComponent={<View style={{ height: 10 }} />}
                        ListFooterComponent={<View style={{ height: 10 }} />}
                    />
                ) : (
                    <Text style={{ marginHorizontal: 10, marginTop: 5 }}>
                        Không có bài báo nào!
                    </Text>
                )
            ) : (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size="large" color={COLORS.PersianGreen} />
                </View>
            )}

            <BottomSheet
                bottomSheetRef={refRBSheet}
                onSelected={handleSpecialityChange}
                specialtyList={specialitiesHook}
                height={330}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    list: {
        paddingHorizontal: 15,
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
        height: 38,
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
    postContainer: {
        borderRadius: 10,
        padding: 10,
        elevation: 3,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.PersianGreen,
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.Light20PersianGreen,
    },
    imagePost: {
        height: 120,
        resizeMode: "cover",
        width: "100%",
    },
    titlePost: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: COLORS.blue,
        textAlign: "justify",
        marginTop: 5,
        alignSelf: "flex-start",
    },
    datePostContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
    },
    datePost: {
        color: COLORS.gray,
        marginLeft: 5,
    },
    specialtyPost: {
        fontSize: 14,
        color: COLORS.gray,
        alignSelf: "flex-start",
    },
})
