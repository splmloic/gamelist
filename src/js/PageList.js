const PageList = (argument = '') => {
    const preparePage = () => {
      const cleanedArgument = argument.trim().replace(/\s+/g, '-');
  
      const displayResults = (articles) => {
        const resultsContent = articles.map((article) => (
          `<article class="cardGame feature col">
            <img src="${article.background_image}" class="img-fluid"></img>
            <h1>${article.name}</h1>
            <h2>${article.released}</h2>
            <a href="#pagedetail/${article.id}">${article.id}</a>
          </article>`
        ));
        const resultsContainer = document.querySelector('.page-list .articles');
        resultsContainer.innerHTML = resultsContent.join("\n");
      };
  
      const fetchList = (url, argument) => {
        const finalURL = argument ? `${url}&search=${argument}` : url;
        fetch(finalURL)
          .then((response) => response.json())
          .then((responseData) => {
            displayResults(responseData.results)
          });
      };
  
      fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`, cleanedArgument);
    };
    const render = () => {
      pageContent.innerHTML = `
        <section class="page-list">
          <div class="container">
            <div class="articles row g-4 py-5 row-cols-1 row-cols-lg-3">Loading...</div>
          </div>
        </section>
      `;
  
      preparePage();
    };
  
    render();
  };

export{PageList}