import {
  FlatList,
  StyleSheet,
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

const list = [
  {
    id: "cjdx",
    user: "Kiều Diễm",
    title: "Vàng da sinh lý có cần chiếu đèn không? Một số lưu ý quan trọng",
    specialty: "Chuyên khoa sơ sinh",
    question:
      "Thưa bác sĩ, vàng da sinh lý có cần chiếu đèn không ạ? Con em được 3 ngày tuổi, có biểu hiện vàng da  ở vùng mặt và cổ. Bác sĩ bảo con bị vàng da sinh lý nên không cần điều trị, tình trạng này sẽ tự khỏi sau ít ngày. Tuy nhiên, đến nay đã gần 1 tuần em thấy da bé vẫn vàng nên lo lắng quá. Mong bác sĩ tư vấn ạ.",
    answer: {
      doctor: "BS.CKI NGUYỄN VĂN TOẢN",
      content:
        "Không phải tất cả trẻ sơ sinh vàng da đều cần phải chiếu đèn. Vàng da sơ sinh được chia làm hai nhóm thường gặp là vàng da sinh lý và vàng da bệnh lý. Vậy vàng da sinh lý có cần chiếu đèn không? Vàng da sinh lý có cần chiếu đèn không? Vàng da sinh lý là hiện tượng phổ biến ở trẻ sơ sinh, thường không cần phải chiếu đèn. Tình trạng này sẽ dần cải thiện và hết hẳn trong khoảng 1- 2 tuần, khi trẻ được chăm sóc đúng cách, bú đủ sữa tại nhà.",
    },
  },
  {
    id: "qsdf",
    user: "Ánh Trâm",
    title: "Trẻ bị viêm phế quản có được tắm không? Lưu ý gì khi tắm gội?",
    specialty: "Chuyên khoa nhi",
    question:
      "Con em bị viêm phế quản, được bác sĩ kê thuốc uống và bảo theo dõi tại nhà. Bác sĩ cho em hỏi trẻ bị viêm phế quản có được tắm không? Nếu được, cần lưu ý gì khi tắm gội cho trẻ? Mong bác sĩ giải đáp ạ.",
    answer: {
      doctor: "BS.CKI NGÔ HÀ LỆ CHI",
      content:
        'Trẻ bị viêm phế quản có được tắm không? Đây là thắc mắc chung của nhiều bố mẹ khi chăm sóc trẻ mắc phải bệnh lý này. Bài viết dưới đây sẽ giúp bố mẹ hiểu rõ hơn về bệnh viêm phế quản cũng như trả lời cho câu hỏi trên. Viêm phế quản là gì? Trước khi tìm hiểu về "Trẻ bị viêm phế quản có được tắm không?" thì trước tiên tìm hiểu về "Viêm phế quản là gì?". Viêm phế quản là một bệnh lý nhiễm trùng đường hô hấp dưới, thường gặp ở trẻ sơ sinh và',
    },
  },
  {
    id: "hg",
    user: "Michelle Ho",
    title: "Tiền sử viêm gan C uống nhiều rượu bia ảnh hưởng thế nào?",
    specialty: "Trung tâm Nội soi và Phẫu thuật nội soi tiêu hóa",
    question:
      "Chồng tôi năm nay 64 tuổi. 15 năm trước phát hiện ra bị viêm gan C dương tính ( đã điều trị 6 tháng bằng chích thuốc vào bụng) tóc rụng hết, giờ virus âm tính nhưng vẫn còn là viêm gan C, nhưng hàng ngày chồng tôi vẫn uống 3,4 chai Henneken loại lớn, 365 ngày không thiếu một ngày. Vậy con hỏi có nguy hiểm tính mạng ông ấy không?",
    answer: {
      doctor: "THS.BSNT LÊ MINH THÙY",
      content:
        "Chào chị! \n" +
        "Viêm gan và xơ gan có thể xuất phát từ nhiều nguyên nhân khác nhau. Tại Việt Nam, viêm gan siêu vi B và C, cùng với việc tiêu thụ rượu bia quá mức là các nguyên nhân phổ biến. \n" +
        "Để bảo vệ sức khỏe gan, gia đình nên khuyến khích người thân hạn chế sử dụng rượu bia. Một lượng tối đa khuyến nghị cho người lớn là dưới 3 chai bia 330ml mỗi tuần. \n" +
        "Để đánh giá chức năng gan và có kế hoạch điều trị phù hợp, chị nên đưa chồng thăm khám trực tiếp với bác sĩ chuyên khoa Nội tiêu hóa để được đánh giá và tư vấn chi tiết hơn. \n" +
        "Nếu còn bất kỳ thắc mắc nào khác, chị có thể gọi tổng đài của Hệ thống Bệnh viện Đa khoa Tâm Anh 028.7102.6789 – 093.180.6858 để được hỗ trợ. Hoặc chị có thể đặt lịch hẹn với chuyên gia và bác sĩ BVĐK Tâm Anh tại website để chúng tôi có thể trực tiếp thăm khám và tư vấn cho chị. \n" +
        "Nếu cần bác sĩ tư vấn thêm, chị có thể post hình ảnh, kết quả xét nghiệm và câu hỏi của mình trong Group Hỏi đáp Bác sĩ Tiêu hóa – Gan Mật Tụy của BVĐK Tâm Anh TP.HCM https://www.facebook.com/groups/1974227372921852 để các bác sĩ xem và trả lời cho chị nhanh hơn nhé. \n" +
        "Trân trọng.",
    },
  },
  {
    id: "sj",
    user: "Hue Le",
    title: "Vàng da sinh lý có cần chiếu đèn không? Một số lưu ý quan trọng",
    specialty: "Chuyên khoa sơ sinh",
    question:
      "Thưa bác sĩ, vàng da sinh lý có cần chiếu đèn không ạ? Con em được 3 ngày tuổi, có biểu hiện vàng da  ở vùng mặt và cổ. Bác sĩ bảo con bị vàng da sinh lý nên không cần điều trị, tình trạng này sẽ tự khỏi sau ít ngày. Tuy nhiên, đến nay đã gần 1 tuần em thấy da bé vẫn vàng nên lo lắng quá. Mong bác sĩ tư vấn ạ.",
    answer: {
      doctor: "BS.CKI NGUYỄN VĂN TOẢN",
      content:
        "Không phải tất cả trẻ sơ sinh vàng da đều cần phải chiếu đèn. Vàng da sơ sinh được chia làm hai nhóm thường gặp là vàng da sinh lý và vàng da bệnh lý. Vậy vàng da sinh lý có cần chiếu đèn không? Vàng da sinh lý có cần chiếu đèn không? Vàng da sinh lý là hiện tượng phổ biến ở trẻ sơ sinh, thường không cần phải chiếu đèn. Tình trạng này sẽ dần cải thiện và hết hẳn trong khoảng 1- 2 tuần, khi trẻ được chăm sóc đúng cách, bú đủ sữa tại nhà.",
    },
  },
  {
    id: "fk",
    user: "Doanh",
    title: "Polyp túi mật có cắt bỏ được không?",
    specialty: " Trung tâm Nội soi và Phẫu thuật nội soi tiêu hóa",
    question: "Polyp túi mật có cắt bỏ được không",
    answer: {
      doctor: "TS.BS PHẠM CÔNG KHÁNH",
      content:
        "Chào bạn! Polyp túi mật không thể tự biến mất, ngược lại, thường có khả năng phát triển theo thời gian về cả kích thước và số lượng. Hiện nay, y học vẫn không có cách nào để loại bỏ polyp ngoại trừ việc cắt bỏ. Khi có chẩn đoán, bạn nên gặp trực tiếp bác sĩ chuyên khoa Gan - Mật - Tụy để đánh giá chính xác kích thước và có phương pháp điều trị phù hợp. Nếu còn bất kỳ thắc mắc nào khác, bạn có thể gọi.",
    },
  },
  {
    id: "eo",
    user: "Hue Le",
    title: "Vàng da sinh lý có cần chiếu đèn không? Một số lưu ý quan trọng",
    specialty: "Chuyên khoa sơ sinh",
    question:
      "Thưa bác sĩ, vàng da sinh lý có cần chiếu đèn không ạ? Con em được 3 ngày tuổi, có biểu hiện vàng da  ở vùng mặt và cổ. Bác sĩ bảo con bị vàng da sinh lý nên không cần điều trị, tình trạng này sẽ tự khỏi sau ít ngày. Tuy nhiên, đến nay đã gần 1 tuần em thấy da bé vẫn vàng nên lo lắng quá. Mong bác sĩ tư vấn ạ.",
    answer: {
      doctor: "BS.CKI NGUYỄN VĂN TOẢN",
      content:
        "Không phải tất cả trẻ sơ sinh vàng da đều cần phải chiếu đèn.",
    },
  },
];

const Forum = ({ navigation }) => {
  const [specialty, setSpecialty] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const [sortSpecialities] = useSpecialities();

  const refRBSheet = useRef();

  const handleSpecialityChange = (specialty, sortBy) => {
    if (specialty) {
      setSpecialty(specialty);
      console.log(specialty.name);
    }
    if (sortBy) setSortBy(sortBy);

    console.log(sortBy);
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

      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => {
          return <QandAItem item={item} navigation={navigation} />;
        }}
        ListHeaderComponent={<View style={{ height: 10 }} />}
        ListFooterComponent={<View style={{ height: 15 }} />}
      />

      <BottomSheet
        bottomSheetRef={refRBSheet}
        onSelected={handleSpecialityChange}
        specialtyList={[...sortSpecialities].reverse()}
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
});
