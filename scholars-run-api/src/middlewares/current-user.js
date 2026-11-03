// TEMPORARY - Week 11 only.
// Login is built in Week 12. Until then the caller says who they are in a header:
//     X-Demo-User: 1
// Anyone can type any ID, so this is NOT security. It only lets us build and
// test endpoints before login exists. Week 12 replaces the inside of this file
// with a real token check. Controllers and services read req.user and stay the same.
//
// This repo has no `users` table. Accounts live in `hosts` and `players`, so the
// header value is a host_id or a player_id. Hosts are looked up first on id
// collision; test accounts should use distinct ids.
const userRepository = require('../repositories/user.repository');

if (process.env.NODE_ENV === 'production') {
  throw new Error('current-user.js is the Week 11 stand-in. Replace it before production.');
}

async function currentUser(req, res, next) {
  const header = req.get('X-Demo-User');
  const id = header ? Number(header) : NaN;

  // Only what the rest of the code needs. Never the whole account.
  req.user = Number.isFinite(id) ? await userRepository.findById(id) : null;
  next();
}

module.exports = currentUser;
