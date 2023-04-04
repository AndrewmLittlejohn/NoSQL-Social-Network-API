const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true, 
      validate:{
       validator: (v) => {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`
        }
      },
      thoughts: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
          },
        ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


const User = model('User', userSchema);
module.exports = User;