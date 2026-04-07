const fetch = require("node-fetch");

const getQuote = async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();

    res.json({
      quote: data[0].q,
      author: data[0].a
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
};

module.exports = { getQuote };