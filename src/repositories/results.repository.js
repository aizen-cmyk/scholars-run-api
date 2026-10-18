'use strict';

const { sequelize } = require('../models');

async function getResults(hubKey, since) {
  const sinceClause = since ? `AND r.ended_at > to_timestamp(${Number(since)})` : '';

  const [rows] = await sequelize.query(`
    SELECT
      r.session_id,
      r.session_code,
      r.ended_at,
      jsonb_agg(
        jsonb_build_object(
          'school_id', u.school_id,
          'nickname', sp.nickname,
          'score', sp.score,
          'completed', sp.completed
        ) ORDER BY sp.score DESC
      ) AS players
    FROM runs r
    JOIN users u ON u.user_id = r.user_id
    JOIN session_players sp ON sp.session_id = r.session_id AND sp.user_id = r.user_id
    WHERE r.status = 'completed'
      ${sinceClause}
    GROUP BY r.session_id, r.session_code, r.ended_at
    ORDER BY r.ended_at DESC
  `);

  return rows.map(row => ({
    session_code: row.session_code,
    ended_at: row.ended_at,
    players: row.players,
    podium: row.players.slice(0, 3).map((p, i) => ({
      rank: i + 1,
      school_id: p.school_id,
      nickname: p.nickname,
      score: p.score
    }))
  }));
}

module.exports = { getResults };