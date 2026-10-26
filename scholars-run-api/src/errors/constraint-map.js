// A database rule was broken -> what the client should hear.
// The key is the constraint name from YOUR migration. PostgreSQL names a
// foreign key "<table>_<column>_fkey" when the migration does not name it.
// Write one entry for each constraint a client can hit.
//
// Constraint names observed from this repo's migrations (pg_constraint):
//   uq_session_players_session_nickname  (new migration 20261018000012)
//   uq_tournament_sessions_code          (new migration 20261018000012)
//   fk_session_players_player
//   fk_tournament_sessions_host
//
// A constraint that is not listed here still answers 409, with the code CONFLICT.
module.exports = {
  uq_session_players_session_nickname: {
    status: 409,
    code: 'NICKNAME_TAKEN',
    message: 'That nickname is already used in this game.'
  },
  uq_tournament_sessions_code: {
    status: 409,
    code: 'CODE_TAKEN',
    message: 'That join code is already in use. Please try again.'
  },
  fk_session_players_player: {
    status: 409,
    code: 'PLAYER_IN_USE',
    message: 'That player already has a seat in a game and cannot be removed.'
  },
  fk_tournament_sessions_host: {
    status: 409,
    code: 'HOST_IN_USE',
    message: 'That host already manages game sessions and cannot be removed.'
  }
};
