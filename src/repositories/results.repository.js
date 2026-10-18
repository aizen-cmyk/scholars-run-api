'use strict';

const { sequelize } = require('../models');

async function getResults(since) {
  let sinceClause = '';
  const params = [];

  if (since !== undefined && since !== null && !Number.isNaN(Number(since))) {
    params.push(Number(since));
    sinceClause = `AND r.ended_at > to_timestamp($1)`;
  }

  const [rows] = await sequelize.query(`
    SELECT
      r.session_code,
      MAX(r.ended_at) AS ended_at,
      jsonb_agg(
        jsonb_build_object(
          'school_id', u.school_id,
          'nickname', COALESCE(r.nickname, u.full_name),
          'score', r.score,
          'completed', r.status = 'completed'
        ) ORDER BY r.score DESC
      ) AS players
    FROM runs r
    JOIN users u ON u.user_id = r.user_id
    WHERE r.status = 'completed'
      ${sinceClause}
    GROUP BY r.session_code
    ORDER BY MAX(r.ended_at) DESC
  `, { bind: params });

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