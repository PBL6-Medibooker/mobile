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
import { DoctorItem, Dropdown, HeaderBack } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Specialty_API from "../API/Specialty_API";
import { useEffect, useState } from "react";
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
];

const Doctors = ({ navigation }) => {
  const [dataSpecialities, setDataSpecialities] = useState([]);
  const [specialty, setSpecialty] = useState(null);

  const handleSpecialityChange = (item) => {
    setSpecialty(item);
    console.log("Selected country:", item.value);
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
      <HeaderBack navigation={navigation} title="Bác sĩ" />
      <View style={styles.searchContainer}>
        <View style={styles.searchButton}>
          <TextInput style={styles.textInput} placeholder="Search" />
          <TouchableOpacity style={styles.btnSearch}>
            <FontAwesome name="search" size={20} color={COLORS.PersianGreen} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 8, paddingTop: 14 }}>
        <Dropdown
          data={dataSpecialities}
          onChange={handleSpecialityChange}
          placeholder="Chọn chuyên khoa"
        />
      </View>

      <View style={{ flexDirection: "row", margin: 8, alignItems: "center" }}>
        <Text style={{ marginEnd: 6 }}>Sort by</Text>
        <View
          style={{ borderRadius: 999, backgroundColor: COLORS.PersianGreen }}>
          <Text style={{ paddingHorizontal: 8 }}>A→Z</Text>
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <Text style={{ textDecorationLine: "underline", color: COLORS.blue }}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <DoctorItem item={item} navigation={navigation} />;
        }}
      />
    </SafeAreaView>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  list: {
    // borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  searchContainer: {
    backgroundColor: COLORS.PersianGreen,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 999,
  },
  textInput: {
    marginStart: 10,
    flex: 1,
  },
  btnSearch: {
    marginHorizontal: 5,
  },
});
