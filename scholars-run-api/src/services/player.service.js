const {
  notFound,
  conflict,
  forbidden
} = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');
const sessionRepository = require('../repositories/session.repository');
const sessionService = require('../services/session.service');
const playerRepository = require('../repositories/player.repository');

const SESSION_ENDED = 'SESSION_ENDED';
const SESSION_NOT_JOINABLE = 'SESSION_NOT_JOINABLE';
const SESSION_FULL = 'SESSION_FULL';
const ALREADY_IN_GAME = 'ALREADY_IN_GAME';

async function joinOrRejoin(code, userId, nickname) {
  // Question 3: game with this code exists
  const session = await sessionRepository.findByCode(code);
  if (!session) throw notFound('SESSION_NOT_FOUND', 'No game session with that join code.');

  // Question 4: does this account already have a seat in this game?
  const existing = await playerRepository.findSeat(session.session_id, userId);
  if (existing) {
    await playerRepository.markSeen(existing.session_player_id);
    return {
      seat: existing,
      rejoined: true,
      session
    };
  }

  // Question 5: does this account have a seat in another RUNNING game?
  const runningElsewhere = await playerRepository.findRunningSeatElsewhere(userId, session.session_id);
  if (runningElsewhere) {
    throw conflict(ALREADY_IN_GAME, 'You are still playing another game. Finish it first.');
  }

  // Question 6: status checks
  if (session.status === 'CLOSED') {
    throw conflict(SESSION_ENDED, 'This game has ended and is no longer joinable.');
  }
  if (session.status !== 'LOBBY') {
    throw conflict(SESSION_NOT_JOINABLE, `This game is not joinable (status: ${session.status}).`);
  }

  // Question 7: seats taken >= max players
  const taken = await playerRepository.countBySession(session.session_id);
  if (taken >= session.max_players) {
    throw conflict(SESSION_FULL, 'This game is already full.');
  }

  // Question 8: insert the seat
  try {
    const seat = await playerRepository.create({
      session_id: session.session_id,
      player_id: userId,
      nickname,
      score: 0
    });
    return { seat, rejoined: false, session };
  } catch (error) {
    const constraint = constraintOf(error);
    if (constraint === 'uq_session_players_session_player') {
      // Race: same account joined at the same time; return the existing seat.
      const existing = await playerRepository.findSeat(session.session_id, userId);
      if (existing) {
        return { seat: existing, rejoined: false, session };
      }
    }
    if (constraint === 'uq_session_players_session_nickname') {
      throw conflict('NICKNAME_TAKEN', 'That nickname is already used in this game.');
    }
    throw error;
  }
}

async function listPlayers(code) {
  const session = await sessionRepository.findByCode(code);
  if (!session) throw notFound('SESSION_NOT_FOUND', 'No game session with that join code.');
  return playerRepository.listBySession(session.session_id);
}

module.exports = { joinOrRejoin, listPlayers };
