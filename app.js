const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("album-search");
const searchResults = document.getElementById("search-results");

searchBtn.addEventListener("click", () => {
  const input = searchInput.value.trim();
  if (!input) return alert("Please enter a song or an album");

  fetchAndDisplay("album", "Albums", input);
  fetchAndDisplay("song", "Songs", input);
});

function fetchAndDisplay(entity, title, input) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    input
  )}&entity=${entity}&limit=10`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data.results || data.results.length === 0) return;

      const section = document.createElement("div");
      section.className = "section-container";

      const heading = document.createElement("h2");
      heading.textContent = title;
      heading.className = "section-title";
      section.appendChild(heading);

      const cardsContainer = document.createElement("div");
      cardsContainer.className = "cards-container";
      section.appendChild(cardsContainer);

      data.results.forEach((item) => {
        const card = document.createElement("div");
        card.className = "album";

        const img = document.createElement("img");
        img.src = item.artworkUrl100;
        img.alt = item.collectionName || item.trackName;
        card.appendChild(img);

        const name = document.createElement("h3");
        name.textContent = item.collectionName || item.trackName;
        card.appendChild(name);

        const artist = document.createElement("p");
        artist.textContent = `Artist: ${item.artistName}`;
        card.appendChild(artist);

        if (entity === "album") {
          const release = document.createElement("p");
          release.textContent = `Release Date: ${new Date(
            item.releaseDate
          ).toLocaleDateString()}`;
          card.appendChild(release);
        }

        const link = document.createElement("a");
        link.href = item.collectionViewUrl || item.trackViewUrl;
        link.target = "_blank";
        link.textContent = "View on iTunes";
        card.appendChild(link);

        cardsContainer.appendChild(card);
      });

      searchResults.appendChild(section);
    })
    .catch((err) => console.error(err));
}
