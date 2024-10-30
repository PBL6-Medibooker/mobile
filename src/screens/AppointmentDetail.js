import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, images } from "../constants";
import HeaderBack from '../components/HeaderBack';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppointmentDetail = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderBack navigation={navigation} title="Cuộc hẹn của bạn" />

            {/* Thông tin bác sĩ */}
            <View style={styles.doctorInfoContainer}>
                <View style={styles.doctorCard}>
                    <Image source={images.avatar} style={styles.doctorImage} />
                    <View style={styles.doctorDetails}>
                        <Text style={styles.doctorName}>PGS.TS.BS Lê Hoàng</Text>
                        <Text style={styles.specialty}>Khoa tim mạch</Text>
                    </View>
                </View>
            </View>

            {/* Thông tin cuộc hẹn */}
            <View style={styles.appointmentInfo}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>Ngày 24 tháng 12, Năm 2024</Text>
                    <Text style={styles.timeText}>Thứ Tư, 10:00 AM</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <AntDesign name="checkcircle" size={24} color={COLORS.PersianGreen} />
                    <AntDesign name="calendar" size={24} color={COLORS.PersianGreen} style={styles.iconSpacing} />
                </View>
            </View>

            {/* Thông tin cá nhân */}
            <View style={styles.personalInfoContainer}>
                <Text style={styles.infoTitle}>Thông tin cá nhân</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Họ và Tên</Text>
                    <Text style={styles.infoValue}>Đào Phương Liên</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Tuổi</Text>
                    <Text style={styles.infoValue}>30</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Giới tính</Text>
                    <Text style={styles.infoValue}>Nữ</Text>
                </View>
            </View>

            {/* Tiền sử bệnh lý */}
            <View style={styles.problemContainer}>
                <Text style={styles.infoTitle}>Tiền sử bệnh lý</Text>
                <Text style={styles.problemText}>
                    - Cao huyết áp, dị ứng với kháng sinh nhóm penicillin
                </Text>
            </View>

            {/* Tình trạng sức khỏe */}
            <View style={styles.problemContainer}>
                <Text style={styles.infoTitle}>Tình trạng sức khỏe</Text>
                <Text style={styles.problemText}>
                    - Khó thở, đau đầu, chóng mặt, nôn mửa
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    doctorInfoContainer: {
        alignItems: 'center',
        backgroundColor: COLORS.PersianGreen,
        paddingVertical: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    doctorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 10,
        width: '90%',
        shadowColor: COLORS.gray,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    doctorImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.silver,
    },
    doctorDetails: {
        marginLeft: 15,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    specialty: {
        fontSize: 16,
        color: COLORS.black,
    },
    appointmentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.Light50PersianGreen,
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    dateContainer: {
        flexDirection: 'column',
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.PersianGreen,
    },
    timeText: {
        fontSize: 16,
        color: COLORS.PersianGreen,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSpacing: {
        marginLeft: 10,
    },
    personalInfoContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.PersianGreen,
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    infoLabel: {
        fontSize: 16,
        color: COLORS.black,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    problemContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    problemText: {
        fontSize: 16,
        color: COLORS.black,
        lineHeight: 22,
    },
});

export default AppointmentDetail;
