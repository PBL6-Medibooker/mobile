import { SafeAreaView } from "react-native-safe-area-context"
import { CalendarCustom } from "../components"
import { useState } from "react";

const DoctorInfo = () => {
    const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
    return (
        <SafeAreaView>
            <CalendarCustom selectedDate={selectedDate} selectedHour={selectedHour} setSelectedDate={setSelectedDate} setSelectedHour={setSelectedHour} />
        </SafeAreaView>
    )
}

export default DoctorInfo