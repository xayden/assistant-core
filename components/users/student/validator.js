const { teacherCollection } = require('../teacher/model');
const { studentTeacherCollection } = require('../studentTeacher.model');
const generalUserErrorHandler = require('../error');

const { studentCollection } = require('./model');

exports.validateStudentExistence = async studentId => {
  const student = await studentCollection.findById(studentId);
  if (!student) throw new generalUserErrorHandler.InvalidToken();
  return student;
};

exports.validateStudentTeacherExistence = async studentTeacherId => {
  const studentTeacher = await studentTeacherCollection.findById(studentTeacherId);
  if (!studentTeacher) throw new generalUserErrorHandler.InvalidUserId();
  return studentTeacher;
};

exports.validateTeacherExistence = async teacherId => {
  const teacher = await teacherCollection.findById(teacherId);
  if (!teacher) throw new generalUserErrorHandler.InvalidUserId();
  return teacher;
};