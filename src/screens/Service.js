import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { COLORS, images } from "../constants";

const Service = () => {
    const services = [
      {
        title: "Triển khai dịch vụ tiêm chủng tại BVDK Tâm Anh TP.HCM",
        description:
          "Từ ngày 07/03/2023, bệnh viện Đa khoa Tâm Anh TP.HCM chính thức mở rộng dịch vụ tiêm chủng cho người lớn và trẻ em...",
        icon: require("../../assets/images/dich-vu-tiem-chung-icon.png"),
      },
      {
        title: "Khám, tầm soát & điều trị bệnh lý mạch máu",
        description:
          "Thông kê cho thấy, mỗi năm tại Việt Nam đang ghi nhận tỉ lệ người mắc bệnh lý mạch máu tăng cao...",
        icon: require("../../assets/images/icon-tim-bam-sinh.png"),
      },
    ];
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>DỊCH VỤ ĐẶC BIỆT</Text>
        <View style={styles.underline} />
        <View style={styles.servicesContainer}>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.iconContainer}>
                <Image source={service.icon} style={styles.icon} />
              </View>
              <Text style={styles.title}>{service.title}</Text>
              <Text style={styles.description}>{service.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      padding: 16,
      marginTop: 22,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: COLORS.PersianGreen,
      marginBottom: 8,
    },
    underline: {
      width: 60,
      height: 3,
      backgroundColor: COLORS.Light50PersianGreen,
      alignSelf: "center",
      marginBottom: 16,
    },
    servicesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    serviceCard: {
      width: "48%",
      backgroundColor: "#F8F9FA",
      borderRadius: 20,
      padding: 12,
      marginBottom: 16,
      elevation: 2,
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 8,
      backgroundColor: COLORS.Light50PersianGreen,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    icon: {
      width: 40,
      height: 40,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
      color: COLORS.black,
    },
    description: {
      fontSize: 14,
      color: COLORS.gray,
    },
  });
  
  export default Service;