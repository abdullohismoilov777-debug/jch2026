export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const TOKEN = process.env.FD_TOKEN;
  const { type } = req.query;

  const BASE = 'https://api.football-data.org/v4';
  // WC = FIFA World Cup kodi, 2026 yil
  const url = type === 'standings'
    ? `${BASE}/competitions/WC/standings`
    : `${BASE}/competitions/WC/matches`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': TOKEN,
        'X-Unfold-Goals': 'true'
      }
    });
    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
