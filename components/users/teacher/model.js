const mongoose = require('mongoose');
const shortid = require('shortid');
const { Schema } = mongoose;

const teacherSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 50
  },
  phone: {
    type: String,
    default: '',
    required: true,
    validate: {
      validator: v => v && /^\+?[0-9]+/,
      message: 'Not a vlaid phone number, Eg: +2012345678901 or 01234567890'
    }
  },
  students: {
    number: { type: Number, default: 0 },
    details: [{ _id: String, name: String }]
  },
  assistants: {
    number: { type: Number, default: 0 },
    details: [{ _id: String, name: String }]
  },
  groups: {
    number: { type: Number, default: 0 },
    details: [{ _id: String, name: String }]
  },
  subject: String,
  recentlyVerified: Date
});

exports.teacherCollection = mongoose.model('Teacher', teacherSchema);
