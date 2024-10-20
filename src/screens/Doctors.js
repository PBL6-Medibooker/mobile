import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants";
import { BottomSheet, DoctorItem, Dropdown, HeaderBack } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Specialty_API from "../API/Specialty_API";
import { useEffect, useRef, useState } from "react";
import Specialty_Model from "../models/Specialty_Model";

const data = [
  {
    id: "lth",
    name: "PGS.TS.BS Le Hoang",
    area: "Chi nhanh TP Ho Chi Minh",
    working_hours: [
      "8:00 a.m - 11:00 a.m, 20/9/2024",
      "6:30 a.m - 10:30 a.m, 21/9/2024",
    ],
    bio: {
      position:
        "Phó Giám đốc Trung tâm kiểm soát cân nặng và điều trị béo phì.",
      introduction:
        "BS.CKI Châu Hoàng Phương Thảo hiện đang nắm giữ chức vụ Phó đơn vị Hỗ trợ Sinh sản, Bệnh viện Đa khoa Tâm Anh TP.HCM. Với trình độ chuyên môn cao cùng gần 20 năm kinh nghiệm trong lĩnh vực hỗ trợ sinh sản, bác sĩ Châu Hoàng Phương Thảo không chỉ được chuyên gia đầu ngành đánh giá cao, sự kính nể của các đồng nghiệp mà còn nhận được sự yêu mến, tin tưởng của nhiều cặp vợ chồng đang trên hành trình tìm con. \n" +
        "Bên cạnh công tác khám, chẩn đoán và điều trị vô sinh – hiếm muộn, tư vấn phương pháp điều trị hiệu quả các bệnh lý phụ khoa, tử cung… bác sĩ Châu Hoàng Phương Thảo còn tham gia biên soạn tài liệu, giảng dạy chương trình đào tạo liên tục về kiến thức và kỹ năng hỗ trợ sinh sản cơ bản trên lâm sàng cho các thế hệ bác sĩ trẻ tương lai. \n" +
        "Chính nhờ kinh nghiệm thực tiễn cùng y đức và tâm huyết dành cho nghề, BS.CKI Châu Hoàng Phương Thảo là một trong những bác sĩ khám, điều trị vô sinh – hiếm muộn được đánh giá cao tại TP.HCM.",
    },
  },
  {
    id: "ltd",
    name: "PGS.TS.BS Le Hoang ssj",
    area: "Chi nhanh TP Ho Chi Minh",
    working_hours: [
      "8:00 a.m - 11:00 a.m, 20/9/2024",
      "6:30 a.m - 10:30 a.m, 21/9/2024",
    ],
    bio: {
      position:
        "Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.",
      introduction:
        "BS.CKI Châu Hoàng Phương Thảo hiện đang nắm giữ chức vụ Phó đơn vị Hỗ trợ Sinh sản, Bệnh viện Đa khoa Tâm Anh TP.HCM. Với trình độ chuyên môn cao cùng gần 20 năm kinh nghiệm trong lĩnh vực hỗ trợ sinh sản, bác sĩ Châu Hoàng Phương Thảo không chỉ được chuyên gia đầu ngành đánh giá cao, sự kính nể của các đồng nghiệp mà còn nhận được sự yêu mến, tin tưởng của nhiều cặp vợ chồng đang trên hành trình tìm con. \n" +
        "Bên cạnh công tác khám, chẩn đoán và điều trị vô sinh – hiếm muộn, tư vấn phương pháp điều trị hiệu quả các bệnh lý phụ khoa, tử cung… bác sĩ Châu Hoàng Phương Thảo còn tham gia biên soạn tài liệu, giảng dạy chương trình đào tạo liên tục về kiến thức và kỹ năng hỗ trợ sinh sản cơ bản trên lâm sàng cho các thế hệ bác sĩ trẻ tương lai. \n" +
        "Chính nhờ kinh nghiệm thực tiễn cùng y đức và tâm huyết dành cho nghề, BS.CKI Châu Hoàng Phương Thảo là một trong những bác sĩ khám, điều trị vô sinh – hiếm muộn được đánh giá cao tại TP.HCM.",
    },
  },
  {
    id: "ssk",
    name: "PGS.TS.BS Le Hoàng Ngọc Lý",
    area: "Chi nhanh TP Ho Chi Minh",
    working_hours: [
      "8:00 a.m - 11:00 a.m, 20/9/2024",
      "6:30 a.m - 10:30 a.m, 21/9/2024",
    ],
    bio: {
      position:
        "Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.",
      introduction:
        "BS.CKI Châu Hoàng Phương Thảo hiện đang nắm giữ chức vụ Phó đơn vị Hỗ trợ Sinh sản, Bệnh viện Đa khoa Tâm Anh TP.HCM. Với trình độ chuyên môn cao cùng gần 20 năm kinh nghiệm trong lĩnh vực hỗ trợ sinh sản, bác sĩ Châu Hoàng Phương Thảo không chỉ được chuyên gia đầu ngành đánh giá cao, sự kính nể của các đồng nghiệp mà còn nhận được sự yêu mến, tin tưởng của nhiều cặp vợ chồng đang trên hành trình tìm con. \n" +
        "Bên cạnh công tác khám, chẩn đoán và điều trị vô sinh – hiếm muộn, tư vấn phương pháp điều trị hiệu quả các bệnh lý phụ khoa, tử cung… bác sĩ Châu Hoàng Phương Thảo còn tham gia biên soạn tài liệu, giảng dạy chương trình đào tạo liên tục về kiến thức và kỹ năng hỗ trợ sinh sản cơ bản trên lâm sàng cho các thế hệ bác sĩ trẻ tương lai. \n" +
        "Chính nhờ kinh nghiệm thực tiễn cùng y đức và tâm huyết dành cho nghề, BS.CKI Châu Hoàng Phương Thảo là một trong những bác sĩ khám, điều trị vô sinh – hiếm muộn được đánh giá cao tại TP.HCM.",
    },
  },
  {
    id: "234",
    name: "PGS.TS.BS Le Hoang ssj",
    area: "Chi nhanh TP Ho Chi Minh",
    working_hours: [
      "8:00 a.m - 11:00 a.m, 20/9/2024",
      "6:30 a.m - 10:30 a.m, 21/9/2024",
    ],
    bio: {
      position:
        "Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.",
      introduction:
        "BS.CKI Châu Hoàng Phương Thảo hiện đang nắm giữ chức vụ Phó đơn vị Hỗ trợ Sinh sản, Bệnh viện Đa khoa Tâm Anh TP.HCM. Với trình độ chuyên môn cao cùng gần 20 năm kinh nghiệm trong lĩnh vực hỗ trợ sinh sản, bác sĩ Châu Hoàng Phương Thảo không chỉ được chuyên gia đầu ngành đánh giá cao, sự kính nể của các đồng nghiệp mà còn nhận được sự yêu mến, tin tưởng của nhiều cặp vợ chồng đang trên hành trình tìm con. \n" +
        "Bên cạnh công tác khám, chẩn đoán và điều trị vô sinh – hiếm muộn, tư vấn phương pháp điều trị hiệu quả các bệnh lý phụ khoa, tử cung… bác sĩ Châu Hoàng Phương Thảo còn tham gia biên soạn tài liệu, giảng dạy chương trình đào tạo liên tục về kiến thức và kỹ năng hỗ trợ sinh sản cơ bản trên lâm sàng cho các thế hệ bác sĩ trẻ tương lai. \n" +
        "Chính nhờ kinh nghiệm thực tiễn cùng y đức và tâm huyết dành cho nghề, BS.CKI Châu Hoàng Phương Thảo là một trong những bác sĩ khám, điều trị vô sinh – hiếm muộn được đánh giá cao tại TP.HCM.",
    },
  },
  {
    id: "ggd",
    name: "PGS.TS.BS Le Hoang ssj",
    area: "Chi nhanh TP Ho Chi Minh",
    working_hours: [
      "8:00 a.m - 11:00 a.m, 20/9/2024",
      "6:30 a.m - 10:30 a.m, 21/9/2024",
    ],
    bio: {
      position:
        "Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.",
      introduction:
        "BS.CKI Châu Hoàng Phương Thảo hiện đang nắm giữ chức vụ Phó đơn vị Hỗ trợ Sinh sản, Bệnh viện Đa khoa Tâm Anh TP.HCM. Với trình độ chuyên môn cao cùng gần 20 năm kinh nghiệm trong lĩnh vực hỗ trợ sinh sản, bác sĩ Châu Hoàng Phương Thảo không chỉ được chuyên gia đầu ngành đánh giá cao, sự kính nể của các đồng nghiệp mà còn nhận được sự yêu mến, tin tưởng của nhiều cặp vợ chồng đang trên hành trình tìm con. \n" +
        "Bên cạnh công tác khám, chẩn đoán và điều trị vô sinh – hiếm muộn, tư vấn phương pháp điều trị hiệu quả các bệnh lý phụ khoa, tử cung… bác sĩ Châu Hoàng Phương Thảo còn tham gia biên soạn tài liệu, giảng dạy chương trình đào tạo liên tục về kiến thức và kỹ năng hỗ trợ sinh sản cơ bản trên lâm sàng cho các thế hệ bác sĩ trẻ tương lai. \n" +
        "Chính nhờ kinh nghiệm thực tiễn cùng y đức và tâm huyết dành cho nghề, BS.CKI Châu Hoàng Phương Thảo là một trong những bác sĩ khám, điều trị vô sinh – hiếm muộn được đánh giá cao tại TP.HCM.",
    },
  },
  {
    id: "ggdd",
    name: "PGS.TS.BS Le Hoang ssj",
    area: "Chi nhanh TP Ho Chi Minh",
    working_hours: [
      "8:00 a.m - 11:00 a.m, 20/9/2024",
      "6:30 a.m - 10:30 a.m, 21/9/2024",
    ],
    bio: {
      position:
        "Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.",
      introduction:
        "BS.CKI Châu Hoàng Phương Thảo hiện đang nắm giữ chức vụ Phó đơn vị Hỗ trợ Sinh sản, Bệnh viện Đa khoa Tâm Anh TP.HCM. Với trình độ chuyên môn cao cùng gần 20 năm kinh nghiệm trong lĩnh vực hỗ trợ sinh sản, bác sĩ Châu Hoàng Phương Thảo không chỉ được chuyên gia đầu ngành đánh giá cao, sự kính nể của các đồng nghiệp mà còn nhận được sự yêu mến, tin tưởng của nhiều cặp vợ chồng đang trên hành trình tìm con. \n" +
        "Bên cạnh công tác khám, chẩn đoán và điều trị vô sinh – hiếm muộn, tư vấn phương pháp điều trị hiệu quả các bệnh lý phụ khoa, tử cung… bác sĩ Châu Hoàng Phương Thảo còn tham gia biên soạn tài liệu, giảng dạy chương trình đào tạo liên tục về kiến thức và kỹ năng hỗ trợ sinh sản cơ bản trên lâm sàng cho các thế hệ bác sĩ trẻ tương lai. \n" +
        "Chính nhờ kinh nghiệm thực tiễn cùng y đức và tâm huyết dành cho nghề, BS.CKI Châu Hoàng Phương Thảo là một trong những bác sĩ khám, điều trị vô sinh – hiếm muộn được đánh giá cao tại TP.HCM.",
    },
  },
  {
    id: "ggad",
    name: "PGS.TS.BS Le Hoang ssj",
    area: "Chi nhanh TP Ho Chi Minh",
    working_hours: [
      "8:00 a.m - 11:00 a.m, 20/9/2024",
      "6:30 a.m - 10:30 a.m, 21/9/2024",
    ],
    bio: {
      position:
        "Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.",
      introduction:
        "BS.CKI Châu Hoàng Phương Thảo hiện đang nắm giữ chức vụ Phó đơn vị Hỗ trợ Sinh sản, Bệnh viện Đa khoa Tâm Anh TP.HCM. Với trình độ chuyên môn cao cùng gần 20 năm kinh nghiệm trong lĩnh vực hỗ trợ sinh sản, bác sĩ Châu Hoàng Phương Thảo không chỉ được chuyên gia đầu ngành đánh giá cao, sự kính nể của các đồng nghiệp mà còn nhận được sự yêu mến, tin tưởng của nhiều cặp vợ chồng đang trên hành trình tìm con. \n" +
        "Bên cạnh công tác khám, chẩn đoán và điều trị vô sinh – hiếm muộn, tư vấn phương pháp điều trị hiệu quả các bệnh lý phụ khoa, tử cung… bác sĩ Châu Hoàng Phương Thảo còn tham gia biên soạn tài liệu, giảng dạy chương trình đào tạo liên tục về kiến thức và kỹ năng hỗ trợ sinh sản cơ bản trên lâm sàng cho các thế hệ bác sĩ trẻ tương lai. \n" +
        "Chính nhờ kinh nghiệm thực tiễn cùng y đức và tâm huyết dành cho nghề, BS.CKI Châu Hoàng Phương Thảo là một trong những bác sĩ khám, điều trị vô sinh – hiếm muộn được đánh giá cao tại TP.HCM.",
    },
  },
  {
    id: "cmclgd",
    name: "PGS.TS.BS Le Hoang ssj",
    area: "Chi nhanh TP Ho Chi Minh",
    working_hours: [
      "8:00 a.m - 11:00 a.m, 20/9/2024",
      "6:30 a.m - 10:30 a.m, 21/9/2024",
    ],
    bio: {
      position:
        "Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.",
      introduction:
        "BS.CKI Châu Hoàng Phương Thảo hiện đang nắm giữ chức vụ Phó đơn vị Hỗ trợ Sinh sản, Bệnh viện Đa khoa Tâm Anh TP.HCM. Với trình độ chuyên môn cao cùng gần 20 năm kinh nghiệm trong lĩnh vực hỗ trợ sinh sản, bác sĩ Châu Hoàng Phương Thảo không chỉ được chuyên gia đầu ngành đánh giá cao, sự kính nể của các đồng nghiệp mà còn nhận được sự yêu mến, tin tưởng của nhiều cặp vợ chồng đang trên hành trình tìm con. \n" +
        "Bên cạnh công tác khám, chẩn đoán và điều trị vô sinh – hiếm muộn, tư vấn phương pháp điều trị hiệu quả các bệnh lý phụ khoa, tử cung… bác sĩ Châu Hoàng Phương Thảo còn tham gia biên soạn tài liệu, giảng dạy chương trình đào tạo liên tục về kiến thức và kỹ năng hỗ trợ sinh sản cơ bản trên lâm sàng cho các thế hệ bác sĩ trẻ tương lai. \n" +
        "Chính nhờ kinh nghiệm thực tiễn cùng y đức và tâm huyết dành cho nghề, BS.CKI Châu Hoàng Phương Thảo là một trong những bác sĩ khám, điều trị vô sinh – hiếm muộn được đánh giá cao tại TP.HCM.",
    },
  },
];

const Doctors = ({ navigation }) => {
  const [dataSpecialities, setDataSpecialities] = useState([]);
  const [specialty, setSpecialty] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const refRBSheet = useRef();

  const handleSpecialityChange = (specialty, sortBy) => {
    if (specialty) setSpecialty(specialty);
    if (sortBy) setSortBy(sortBy);

    console.log(specialty, sortBy);
  };

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const specialties = await Specialty_API.get_Speciality_List();

        const dataToList = specialties.map((specialty) => specialty.toList());
        setDataSpecialities(dataToList); // Cập nhật danh sách chuyên môn
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chuyên môn:", error); // Thông báo lỗi nếu xảy ra
      }
    };

    fetchSpecialties();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title="Bác sĩ"
        // backgroundColor={true}
      />
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

      {/* <View style={{ paddingHorizontal: 10, paddingTop: 14 }}>
        <Dropdown
          data={dataSpecialities}
          onChange={handleSpecialityChange}
          placeholder="Chọn chuyên khoa"
        />
      </View> */}

      {/* <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          marginTop: 10,
          alignItems: "center",
        }}>
        <Text style={{ marginEnd: 6 }}>Sort by</Text>
        <View
          style={{ borderRadius: 999, backgroundColor: COLORS.PersianGreen }}>
          <Text style={{ paddingHorizontal: 8 }}>A→Z</Text>
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <Text style={{ textDecorationLine: "underline", color: COLORS.blue }}>
            See all
          </Text>
        </TouchableOpacity>
      </View> */}

      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => {
          return <DoctorItem item={item} navigation={navigation} />;
        }}
        ListHeaderComponent={<View style={{ height: 10 }} />}
      />

      <BottomSheet
        bottomSheetRef={refRBSheet}
        onSelected={handleSpecialityChange}
        specialtyList={dataSpecialities}
      />
    </SafeAreaView>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 12,
    marginTop: 8,
  },
  searchContainer: {
    paddingTop: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: COLORS.PersianGreen,
    borderRadius: 8,
    marginStart: 5,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
