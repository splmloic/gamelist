const PageList = (argument = '') => {
  let totalArticles = 9;
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (
      `<article class="cardGame feature col">
        <div class="overlay">
          <h2>${article.released}</h2>
          <H3>${article.rating} - ${article.ratings_count} votes</H3>
          <p>${article.tags.map((article) => `${article.name}`).join(", ")}</p>
        </div>
        <div class="ratio-container ratio-16-9">
          <img src="${article.background_image}" class="img-fluid fimg game-img"></img>
        </div>
          <h2><a href="#pagedetail/${article.id}" class="kinglink">${article.name}</a></h2>
          ${article.parent_platforms.map((platform) => `<svg class="platform-img ${platform.platform.slug}"></svg>`).join('\n')}
      </article>`
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
      
      const allArticles = document.querySelectorAll('.cardGame');
      allArticles.forEach((article) => {
        article.addEventListener('mouseover', async () => {
          article.classList.add('darken');
          article.querySelector('.overlay').style.display = 'block';
        });
    
        article.addEventListener('mouseleave', () => {
          article.classList.remove('darken');
          article.querySelector('.overlay').style.display = 'none';
        });
      });

      const loadMoreBtn = document.getElementById('count');
      if (totalArticles >= 27) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'block';
      }
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results.slice(0, totalArticles));
        });
    };
    fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page_size=27`, cleanedArgument);
  };

  const loadMoreArticles = () => {
    totalArticles += 9;
    preparePage();
  };


  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="container">
          <div><p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame, the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure to the entire video game industry, all under one roof. This text seems familiar.          </p></div>
          <div class="filter">
            <label for="platform">plateform : </label>
            <select id="platform" class="selector">
            <option value="">any</option>
            <option value="pc">PC</option>
            <option value="playstation-5">PlayStation 5</option>
            <option value="xbox-one">Xbox One</option>
            <option value="xbox-series-sx">Xbox Series S/X</option>
            <option value="nintendo-switch">Nintendo Switch</option>
            <option value="ios">iOS</option>
            <option value="android">Android</option>
            <option value="nintendo-3ds">Nintendo 3DS</option>
            <option value="nintendo-ds">Nintendo DS</option>
            <option value="nintendo-dsi">Nintendo DSi</option>
            <option value="macos">macOS</option>
            <option value="linux">Linux</option>
            <option value="xbox-360">Xbox 360</option>
            <option value="xbox">Xbox</option>
            <option value="playstation-3">PlayStation 3</option>
            <option value="playstation">PlayStation</option>
            <option value="ps-vita">PS Vita</option>
            <option value="psp">PSP</option>
            <option value="wii-u">Wii U</option>
            <option value="wii">Wii</option>
            <option value="gamecube">GameCube</option>
            <option value="nintendo-64">Nintendo 64</option>
            <option value="game-boy-advance">Game Boy Advance</option>
            <option value="game-boy-color">Game Boy Color</option>
            <option value="game-boy">Game Boy</option>
          </select>
          
          </div>
          <div class="articles row g-4 py-5 row-cols-1 row-cols-lg-3">Loading...</div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-danger" id="count">Show More</button>
          </div>
        </div>
      </section>
    `;

    preparePage();
    const loadMoreBtn = document.getElementById('count');
    loadMoreBtn.addEventListener('click', loadMoreArticles);

    const searchInput = document.getElementById('platform');
    searchInput.addEventListener('change', function(event) {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        window.location.href = `#pagelist/${searchTerm}`;
      }
    });
  };
  render();
};

export { PageList };
