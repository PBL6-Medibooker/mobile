import client from "./client";
import {
  parseAppointmentEndDate,
  parseAppointmentStartDate,
} from "../utils/ConvertDate";

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
      console.error("Error response: ", error.response.data.error);
    } else {
      console.error("Error not response: ", error.message);
    }
    return null;
  }
};

const get_All_Appointment = async (user_id) => {
  try {
    const response = await client.get("/appointment/get-all-appointment");
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
      console.error("Error response: ", error.response.data.error);
    } else {
      console.error("Error not response: ", error.message);
    }
    return null;
  }
};

const get_Appointment_By_Status = async (user_id) => {
  try {
    const response = await client.post("/appointment/get-all-appointment");
    const appointments = response.data;

    if (appointments && Array.isArray(appointments) && user_id) {
      // Common sorting logic
      const sortAppointments = (a, b) => {
        const parsedDateA = parseAppointmentStartDate(a);
        const parsedDateB = parseAppointmentStartDate(b);
        return parsedDateA - parsedDateB;
      };

      const upcoming = [...appointments]
        .filter(
          (item) => item.user_id._id === user_id && item.is_deleted === false
        )
        .sort(sortAppointments);

      const complete = [...appointments]
        .filter(
          (item) => item.user_id._id === user_id && item.is_deleted === true
        )
        .sort(sortAppointments);

      return { upcoming: upcoming, complete: complete };
    }
    return appointments;
  } catch (error) {
    if (error.response) {
      console.error("Error response: ", error.response.data.error);
    } else {
      console.error("Error not response: ", error.message);
    }
    return null;
  }
};

const soft_delete_Appointment = async (appointmentId) => {
  try {
    const response = await client.post(
      `/appointment/soft-delete-appointment/${appointmentId}`
    );
    return response.data;
  } catch (error) {
    if (error.response)
      console.error("Error response: ", error.response.data.error);
    else console.error("Error not response: ", error.message);
    return null;
  }
};

const restore_Appointment = async (appointmentId) => {
  try {
    const response = await client.post(
      `/appointment/restore-appointment/${appointmentId}`
    );
    return response.data;
  } catch (error) {
    if (error.response)
      console.error("Error response: ", error.response.data.error);
    else console.error("Error not response: ", error.message);
    return null;
  }
};

const canncel_Appointment = async (appointmentId) => {
  try {
    const response = await client.post(
      `/appointment/cancel-appointment/${appointmentId}`
    );
    // console.log(response.data);

    return response.data;
  } catch (error) {
    if (error.response)
      console.error("Error response: ", error.response.data.error);
    else console.error("Error not response: ", error.message);
    return null;
  }
};

const get_Doctor_Appointment_By_Status = async (doctor_id) => {
  try {
    const response = await client.post("/appointment/get-all-appointment");
    const appointments = response.data;

    if (appointments && Array.isArray(appointments) && doctor_id) {
      // Common sorting logic
      const sortAppointments = (a, b) => {
        const parsedDateA = parseAppointmentStartDate(a);
        const parsedDateB = parseAppointmentStartDate(b);
        return parsedDateA - parsedDateB;
      };

      const upcoming = [...appointments]
        .filter(
          (item) =>
            item.doctor_id._id === doctor_id && item.is_deleted === false
        )
        .sort(sortAppointments);

      const complete = [...appointments]
        .filter(
          (item) => item.doctor_id._id === doctor_id && item.is_deleted === true
        )
        .sort(sortAppointments);

      return { upcoming: upcoming, complete: complete };
    }
    return appointments;
  } catch (error) {
    if (error.response) {
      console.error("Error response: ", error.response.data.error);
    } else {
      console.error("Error not response: ", error.message);
    }
    return null;
  }
};

export default {
  add_Appointment,
  get_All_Appointment,
  get_Appointment_By_Status,
  restore_Appointment,
  soft_delete_Appointment,
  get_Doctor_Appointment_By_Status,
  canncel_Appointment,
};
