// No route matched. Every error leaves in the shared error JSON shape.
function notFound(req, res) {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'No such endpoint.' } });
}

module.exports = notFound;
