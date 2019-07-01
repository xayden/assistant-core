const express = require('express');
const router = express.Router();

const { ScoreService } = require('./service');
const scoreService = new ScoreService();

router.get('/group_:groupId', scoresDatesHandler);
router.get('/student_:studentId', getScoresHandler);
router.get('/group_:groupId/students', getScoresBasedOnDateHandler);

router.post('/set_score', setScoreHandler);
router.post('/add_score/group_:groupId/student_:studentId', addScoreHandler);
router.post('/edit_score/group_:groupId/student_:studentId/score_:scoreId', editScoreHandler);

router.delete('/delete_score/group_:groupId/student_:studentId/score_:scoreId', deleteScoreHandler);

async function getScoresHandler(req, res) {
  const token = req.headers['x-auth-token'];
  const scores = await scoreService.getScores(token, req.params.studentId);
  res.json(scores);
}

async function getScoresBasedOnDateHandler(req, res) {
  const token = req.headers['x-auth-token'];
  const students = await scoreService.getScoresBasedOnDate(token, req.params.groupId, req.query.date);
  res.json(students);
}

async function scoresDatesHandler(req, res) {
  const token = req.headers['x-auth-token'];
  const dates = await scoreService.scoresDates(token, req.params.groupId);
  res.json(dates);
}

async function setScoreHandler(req, res) {
  const token = req.headers['x-auth-token'];
  const status = await scoreService.setMaxAndRedoScores(token, req.body, req.query.type);
  res.json(status);
}

async function addScoreHandler(req, res) {
  const token = req.headers['x-auth-token'];
  const newScore = await scoreService.addScore(token, req.body, req.params.groupId, req.params.studentId);
  res.json(newScore);
}

async function editScoreHandler(req, res) {
  const token = req.headers['x-auth-token'];
  const newScore = await scoreService.editScore(
    token,
    req.body,
    req.params.groupId,
    req.params.studentId,
    req.params.scoreId
  );
  res.json(newScore);
}

async function deleteScoreHandler(req, res) {
  const token = req.headers['x-auth-token'];
  const newScores = await scoreService.deleteScore(
    token,
    req.params.groupId,
    req.params.studentId,
    req.params.scoreId
  );
  res.json(newScores);
}

module.exports = router;
