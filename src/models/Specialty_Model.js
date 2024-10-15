import { Buffer } from "buffer";
import { bufferToBase64 } from "../utils/BufferToBase64";

class Specialty {
  constructor(id, name, description, specialty_image, is_deleted) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.specialty_image = specialty_image;
    this.is_deleted = is_deleted;
  }

  toListDropdown() {
    return {
      id: this._id,
      value: this.name,
    };
  }

  toList() {
    if (this.specialty_image && this.specialty_image.data) {
      const base64String = Buffer.from(this.specialty_image.data).toString(
        "base64"
      );
      this.specialty_image = `data:image/png;base64,${base64String}`;
    }

    return {
      id: this._id,
      value: this.name,
      image: this.specialty_image,
    };
  }

  // static fromJson(json) {
  //   // const specialityImage =
  //   //   json.speciality_image && json.speciality_image.data
  //   //     ? json.speciality_image.data
  //   //     : null;

  //   // let imageUri = null;

  //   // if (specialityImage) {
  //   //   const buffer = Buffer.from(specialityImage);

  //   //   const base64Image = buffer.toString("base64");

  //   //   imageUri = `data:image/png;base64,${base64Image}`;
  //   // }

  //   if (json.speciality_image && json.speciality_image.data) {
  //     // Chuyển buffer sang base64
  //     const base64Image = Buffer.from(json.speciality_image.data).toString(
  //       "base64"
  //     );
  //     json.speciality_image = `data:image/png;base64,${base64Image}`;
  //   }
  //   return new Specialty(
  //     json._id,
  //     json.name,
  //     json.description,
  //     json.speciality_image,
  //     json.is_deleted
  //   );
  // }
}

export default Specialty;
