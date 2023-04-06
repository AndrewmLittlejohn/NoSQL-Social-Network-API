const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      len: [1,280],
    },
    createAt: {
    type: Date,
    default: Date.now,
    },
    username:{
      type: String,
      required: true, 
    },
    reactions: {
      upvotes: Number,
    }
  },
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

thoughtSchema.virtual('reactionCount')
.get(function(){
return this.reactions.upvotes
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;