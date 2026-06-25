export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    var r = await fetch("https://api.football-data.org/v4/competitions/WC/scorers?limit=30", {
      headers: { "X-Auth-Token": process.env.FD_TOKEN }
    });
    var data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.message || "API error" });
    res.json({ scorers: data.scorers || [] });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
