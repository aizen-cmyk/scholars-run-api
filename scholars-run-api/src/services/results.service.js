const resultsRepository = require('../repositories/results.repository');

// Our rule for completed: if nobody has answered a question yet, completed is
// false, rank is null and the podium is empty. This repo does not store answers,
// so every closed game reports completed false with a null rank and empty podium.
async function getResults() {
  const rows = await resultsRepository.findClosedSessions();
  return rows.map((row) => {
    const json = row.toJson();
    return {
      code: json.code,
      status: json.status,
      completed: false,
      rank: null,
      podium: []
    };
  });
}

module.exports = { getResults };
