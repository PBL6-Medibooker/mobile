import client from "./client";

const add_Appointment = async (
  user_id,
  doctor_id,
  appointment_day,
  appointment_time_start,
  appointment_time_end,
  health_issue,
  type_service,
  insurance
) => {
  try {
    const response = await client.post("/appointment/add-appointment", {
      user_id: user_id,
      doctor_id: doctor_id,
      appointment_day: appointment_day,
      appointment_time_start: appointment_time_start,
      appointment_time_end: appointment_time_end,
      health_issue: health_issue,
      type_service: type_service,
    });
    if (response.data?._id && insurance?.name !== null) {
      const addInsurance = await client.post(
        `/appointment/add-insurance/${response.data._id}`,
        {
          name: insurance.name,
          number: insurance.number,
          location: insurance.location,
          exp_date: insurance.exp_date,
        }
      );
      return { status: "insurance", data: addInsurance.data };
    }
    return { status: "appointment", data: response.data };
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
    } else {
      console.log("Error not response: ", error.message);
    }
    return null;
  }
};

const get_All_Appointment = async (user_id) => {
  try {
    const response = await client.get("/appointment/get-all-client");
    const appointments = response.data;
    if (appointments && Array.isArray(appointments) && user_id) {
      const filteredAppointments = appointments.filter(
        (item) => item.user_id === user_id && item.is_deleted === false
      );
      return filteredAppointments;
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error response: ", error.response.data.error);
    } else {
      console.log("Error not response: ", error.message);
    }
    return null;
  }
};

export default {
  add_Appointment,
  get_All_Appointment,
};
