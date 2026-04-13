const fetch = require("node-fetch");

const getQuote = async (req, res) => {
  let quote = "Could not fetch quote";
  let author = "Unknown";
  let image = "https://source.unsplash.com/1600x900/?nature";

  // -------------------------
  // 1. FETCH QUOTE (ZenQuotes)
  // -------------------------
  try {
    const quoteRes = await fetch("https://zenquotes.io/api/random");

    if (!quoteRes.ok) {
      throw new Error(`ZenQuotes HTTP error: ${quoteRes.status}`);
    }

    const quoteData = await quoteRes.json();

    // ZenQuotes returns an ARRAY
    if (Array.isArray(quoteData) && quoteData.length > 0) {
      quote = quoteData[0].q || quote;
      author = quoteData[0].a || author;
    }
  } catch (err) {
    console.error("Quote API failed:", err.message);
  }

  // -------------------------
  // 2. FETCH IMAGE (Unsplash)
  // -------------------------
  try {
    if (!process.env.UNSPLASH_ACCESS_KEY) {
      throw new Error("Missing UNSPLASH_ACCESS_KEY");
    }

    const imageRes = await fetch(
      "https://api.unsplash.com/photos/random?query=nature&orientation=landscape",
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!imageRes.ok) {
      throw new Error(`Unsplash HTTP error: ${imageRes.status}`);
    }

    const imageData = await imageRes.json();

    if (imageData?.urls?.regular) {
      image = imageData.urls.regular;
    }
  } catch (err) {
    console.error("Unsplash API failed:", err.message);
  }

  // -------------------------
  // RESPONSE
  // -------------------------
  res.json({
    quote,
    author,
    image,
  });
};

module.exports = { getQuote };