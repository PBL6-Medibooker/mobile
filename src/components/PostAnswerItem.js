import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { COLORS, images } from "../constants"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useEffect, useState } from "react"
import Account_API from "../API/Account_API"
import Post_API from "../API/Post_API"

const PostAnswerItem = ({
    item,
    myAccountEmail,
    // key,
    answerKey,
    post_id,
    navigation,
    onDeleted,
    onUpdated,
}) => {
    const [replier, setReplier] = useState(null)
    const [content, setContent] = useState(item.comment_content)

    const [edit, setEdit] = useState(false)

    const handleEditAnswer = async () => {
        try {
            const updatePost = await Post_API.update_Comment(content, item._id, post_id)
            if (typeof updatePost === "object") {
                setEdit(false)
                onUpdated(null)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteAnswer = async () => {
        try {
            const updatePost = await Post_API.delete_Comment(post_id, item._id)
            if (updatePost?.post) {
                Alert.alert("Thông báo", "Đã xoá bình luận.", [
                    {
                        text: "OK",
                        onPress: async () => {
                            onDeleted(item._id)
                        },
                    },
                ])
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteAnswer = () => {
        Alert.alert("", "Bạn có chắc chắn muốn xoá bình luận này không?", [
            { text: "No", style: "cancel" },
            {
                text: "Yes",
                onPress: async () => {
                    deleteAnswer()
                },
            },
        ])
    }

    useEffect(() => {
        const getReplierNameById = async () => {
            if (item.replier?._id) {
                const replierRes = await Account_API.get_Account_By_Id(item.replier._id)
                setReplier(replierRes)
            }
        }
        getReplierNameById()
    }, [item])

    return (
        <View style={styles.answer} key={answerKey}>
            <View
                style={[
                    styles.doctorInfo,
                    myAccountEmail !== item?.replier?.email && { marginRight: 5 },
                ]}>
                <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() => {
                        if (replier?.__t) {
                            const doctorToSend = {
                                ...replier,
                                name: replier.username,
                            }
                            navigation.navigate("DoctorInfo", {
                                doctorSelected: doctorToSend,
                            })
                        }
                    }}>
                    <Image
                        source={
                            replier?.profile_image
                                ? { uri: replier?.profile_image }
                                : images.doctor_default
                        }
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <View style={styles.commentContainer}>
                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <Text style={styles.usernameComment}>{item.replier?.username}</Text>
                            {item.replier?.__t && (
                                <Text style={{ fontSize: 12, marginLeft: 2 }}>(Bác sĩ)</Text>
                            )}
                        </View>
                        {!edit && <Text style={styles.contentComment}>{content}</Text>}
                    </View>
                </View>

                {myAccountEmail === item?.replier?.email && (
                    <View style={{ marginLeft: 5, marginTop: 5 }}>
                        {!edit && (
                            <TouchableOpacity
                                style={{ marginBottom: 6 }}
                                onPress={() => {
                                    setEdit(true)
                                    console.log(item._id)
                                    onUpdated(item._id)
                                }}>
                                <FontAwesome name="edit" size={18} color={COLORS.gray} />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={{}} onPress={() => handleDeleteAnswer()}>
                            <FontAwesome name="trash" size={20} color={COLORS.gray} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {edit && (
                <View>
                    <TextInput
                        multiline
                        numberOfLines={3}
                        style={styles.inputAnswer}
                        value={content}
                        onChangeText={(value) => setContent(value)}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginEnd: 10,
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                setEdit(false)
                                onUpdated(null)
                                setContent(item.comment_content)
                            }}>
                            <FontAwesome name="close" size={25} color={COLORS.gray} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleEditAnswer()}>
                            <FontAwesome
                                name="check"
                                size={25}
                                color={COLORS.PersianGreen}
                                style={{ marginStart: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

export default PostAnswerItem

const styles = StyleSheet.create({
    content: {
        textAlign: "justify",
    },
    answer: {
        paddingHorizontal: 10,
        marginBottom: 10,
        paddingTop: 15,
        width: "100%",
    },
    imageContainer: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        borderRadius: 999,
        borderColor: COLORS.Light20PersianGreen,
        borderWidth: 1,
        marginEnd: 10,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        borderRadius: 999,
        borderColor: COLORS.Light20PersianGreen,
        borderWidth: 1,
        marginEnd: 10,
    },
    doctorInfo: {
        flexDirection: "row",
        marginBottom: 10,
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
    contentComment: {
        marginHorizontal: 2,
    },
    inputAnswer: {
        borderWidth: 1,
        borderRadius: 15,
        height: 100,
        borderColor: COLORS.silver,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: "top",
    },
    deleteIcon: {
        position: "absolute",
        bottom: -17,
        right: 20,
    },
})
