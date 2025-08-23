// Minimal Lambda handler (Node.js)
exports.handler = async (event) => {
  if (event && event.rawPath === '/health') {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }
  return { statusCode: 200, body: JSON.stringify({ message: 'Hospital Incident API placeholder' }) };
};
