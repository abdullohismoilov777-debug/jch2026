export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const TOKEN = process.env.FD_TOKEN;
  const { endpoint } = req.query;
  
  const urls = {
    matches: 'https://api.football-data.org/v4/competitions/WC/matches?season=2026',
    standings: 'https://api.football-data.org/v4/competitions/WC/standings?season=2026',
  };
  
  const url = urls[endpoint] || urls.matches;
  
  try {
    const response = await fetch(url, {
      headers: { 'X-Auth-Token': TOKEN }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
