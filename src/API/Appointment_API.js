import client from "./client";

const add_Appointment = async (
  client_id,
  doctor_id,
  appointment_day,
  appointment_time_start,
  appointment_time_end,
  health_issue,
  type_service
) => {
  try {
    const response = await client.post("/appointment/add-appointment", {
      client_id: client_id,
      doctor_id: doctor_id,
      appointment_day: appointment_day,
      appointment_time_start: appointment_time_start,
      appointment_time_end: appointment_time_end,
      health_issue: health_issue,
      type_service: type_service,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
      //   return error.response.data.error;
    } else {
      console.log("Error not response: ", error.message);
      //   return error.message;
    }
    return null;
  }
};

export default {
  add_Appointment,
};
