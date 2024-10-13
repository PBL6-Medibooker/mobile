class Area_Model {
  constructor(id, name, is_deleted) {
    this._id = id;
    this.name = name;
    this.is_deleted = is_deleted;
  }

  toListDropdown() {
    return {
      id: this._id,
      value: this.name,
    };
  }
}

export default Area_Model;
