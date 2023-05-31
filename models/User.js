const { Schema, model, Types } = require('mongoose'); 
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
  // Used Regex to validate email format
        validate: { 
          validator: function(v) {
            return /^\S+@\S+\.\S+$/.test(v);
          },
        message: 'Invalid email address'
      }
    },

    thoughts:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      }
    ],
    friends:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }
  ],
  },
  {
    toJSON: {
      // enables virtual properties to be displayed when a user document is transformed into JSON format
      virtuals: true, 
    },
      // disables the default '_id' field in the User model to be returned when calling toJSON() method
      id: false, 
}
);

// Defining a virtual property 'friendCount' which returns the number of friends in the friends array
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});
// Creating the User model from the userSchema
const User = model('User',userSchema)

module.exports = User