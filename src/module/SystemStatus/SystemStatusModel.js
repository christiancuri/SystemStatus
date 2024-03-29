import mongoose, { Schema, model } from "mongoose";

class SystemStatusModel {
  schema() {
    const schema = new Schema(
      {
        environment: {
          type: String,
          required: [true, `Environment is necessary`]
        },
        module: {
          type: String,
          required: [true, `Module name is necessary`]
        },
        isAlive: {
          type: Boolean,
          required: [true, `Status is necessary`]
        },
        duration: {
          type: Number
        }
      },
      {
        timestamps: true
      }
    );
    return mongoose.models.status || model(`status`, schema);
  }
}

export default new SystemStatusModel();
