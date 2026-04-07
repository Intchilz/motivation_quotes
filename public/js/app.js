const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const btn = document.getElementById("generateBtn");

btn.addEventListener("click", async () => {
  try {
    const res = await fetch("/api/quote");
    const data = await res.json();

    quoteEl.textContent = `"${data.quote}"`;
    authorEl.textContent = `- ${data.author}`;
  } catch (err) {
    quoteEl.textContent = "Error fetching quote.";
  }
});