const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const btn = document.getElementById("generateBtn");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");

async function loadQuote() {
  loadingEl.classList.remove("hidden");
  errorEl.classList.add("hidden");

  try {
    const res = await fetch("/api/quote");
    const data = await res.json();

    if (!data.quote) throw new Error("Invalid data");

    quoteEl.textContent = `"${data.quote}"`;
    authorEl.textContent = `- ${data.author}`;

    document.body.style.backgroundImage = `url(${data.image})`;

  } catch (err) {
    console.error(err);
    errorEl.classList.remove("hidden");
  } finally {
    loadingEl.classList.add("hidden");
  }
}

// Generate
btn.addEventListener("click", loadQuote);

// Copy functionality
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// Copy
copyBtn.addEventListener("click", async () => {
  try {
    const quote = quoteEl.textContent || "";
    const author = authorEl.textContent || "";
    const text = `${quote} ${author}`.trim();

    await navigator.clipboard.writeText(text);

    showToast("Quote copied to clipboard");
  } catch (err) {
    console.error("Copy failed:", err);
    showToast("Failed to copy quote");
  }
});

// Share (WhatsApp)
shareBtn.addEventListener("click", () => {
  const text = `${quoteEl.textContent} ${authorEl.textContent}`;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
});

//Auto load
loadQuote();