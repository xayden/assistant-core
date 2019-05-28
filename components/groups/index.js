const express = require('express');
const router = express.Router();

const { GroupService } = require('./service');
const groupService = new GroupService();

router.post('/create_group', createGroupHandler);

router.post('/group_:id/add_student', addStudentHandler);
router.delete('/group_:groupId/students/student_:studentId', removeStudentHandler);

async function createGroupHandler(req, res) {
  const token = req.headers['x-auth-token'];
  const group = await groupService.createGroup(req.body, token);
  res.json(group);
}

async function addStudentHandler(req, res) {
  const token = req.headers['x-auth-token'];
  const code = await groupService.addStudent(req.body, token, req.params.id);
  res.json(code);
}

async function removeStudentHandler(req, res) {
  const token = req.headers['x-auth-token'];
  const statusCode = await groupService.removeStudent(
    req.body,
    token,
    req.params.groupId,
    req.params.studentId
  );
  res.json(statusCode);
}

module.exports = router;
