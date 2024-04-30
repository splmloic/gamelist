const PageList = (argument = '') => {
  let totalArticles = 9;
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (
        `<article class="cardGame feature col">
          <img src="${article.background_image}" class="img-fluid"></img>
          <h2><a href="#pagedetail/${article.id}">${article.name}</a></h2>
          ${article.parent_platforms.map((platform) => `<img class="platform-img ${platform.platform.slug} shadow-lg"></img>`).join('\n')}
        </article>`
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
      
      const allArticles = document.querySelectorAll('.cardGame');
      allArticles.forEach((article) => {
        article.addEventListener('mouseover', async () => {
          article.classList.add('darken');
          //const additionalData = await fetchAdditionalData(article.dataset.id);
          // Ajoutez les nouveaux éléments à votre article ici
          let newContent =`<h3>${article.released}</h3>
          <p>${article.rating} - ${article.ratings_count} votes</p>
          ${article.tags.map((tag) => `<p>${tag.tag.name}</p>`).join(', ')}`
          article.innerHTML += additionalData;
          newContent += additionalData;
          article.innerHTML += newContent;

        });
    
        article.addEventListener('mouseleave', () => {
          article.classList.remove('darken');
          article.innerHTML = originalContent;
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
          displayResults(responseData.results.slice(0, totalArticles)); // Afficher seulement le nombre d'articles requis
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
          <div class="articles row g-4 py-5 row-cols-1 row-cols-lg-3">Loading...</div>
          <div class="d-flex justify-content-center">
            <button class="btn btn-primary" id="count">Show More</button>
          </div>
        </div>
      </section>
    `;

    preparePage();
    const loadMoreBtn = document.getElementById('count');
    loadMoreBtn.addEventListener('click', loadMoreArticles);
  };

  render();
};

export { PageList };
