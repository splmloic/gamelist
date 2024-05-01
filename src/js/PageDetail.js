const PageDetail = (argument) => {
    const preparePage = () => {
      const cleanedArgument = argument.trim().replace(/\s+/g, "-");
  
      const displayGame = (gameData) => {
        const { name, released, description, background_image, website, rating, platforms, ratings_count, developers , publishers, genres, tags, stores, movies} = gameData;
        const articleDOM = document.querySelector(".page-detail .article");
        
        articleDOM.querySelector("h1.title").innerHTML = name || "";
        articleDOM.querySelector("p.release-date span").innerHTML = released || "";
        articleDOM.querySelector("p.description").innerHTML = description || "";
      
        const backgroundImageElement = articleDOM.querySelector(".background-image");
        if (backgroundImageElement && background_image) {
          backgroundImageElement.setAttribute("src", background_image);
        }
      
        const websiteLinkElement = articleDOM.querySelector(".website-link");
        if (websiteLinkElement && website) {
          websiteLinkElement.setAttribute("href", website);
          websiteLinkElement.textContent = "Check Website";
        }
      
        const ratingElement = articleDOM.querySelector(".rating");
        if (ratingElement && rating && ratings_count) {
          ratingElement.innerHTML = rating;
          ratingElement.textContent += "/5 - ";
          ratingElement.innerHTML += ratings_count;
          ratingElement.textContent += " votes"
        }
      
        const platformsElement = articleDOM.querySelector(".platforms");
        if (platformsElement && platforms && platforms.length > 0) {
          platformsElement.innerHTML += platforms.map((platform)=> `<a href="#pagelist/platforms=${platform.platform.id}">${platform.platform.name}</a>`).join(", ");
        }

        const developpersElement = articleDOM.querySelector(".developper");
        if (developpersElement && developers && developers.length > 0) {
          developpersElement.innerHTML += developers.map((developer)=>`<a href="#pagelist/developers=${developer.slug}">${developer.name}</a>`).join(", ");
        }
        
        const publishersElement = articleDOM.querySelector(".Publiser");
        if (publishersElement && publishers && publishers.length > 0) {
          publishersElement.innerHTML += publishers.map((publisher)=> `<a href="#pagelist/publisher=${publisher.slug}">${publisher.name}</a>`).join(", ");
        }

        const genresElement = articleDOM.querySelector(".genre");
        if (genresElement && genres && genres.length > 0) {
          genresElement.innerHTML += genres.map((genre)=> `<a href="#pagelist/genres=${genre.slug}">${genre.name}</a>`).join(", ");
        }

        const tagsElement = articleDOM.querySelector(".tags");
        if (tagsElement && tags && tags.length > 0) {
          tagsElement.innerHTML += tags.map((tag)=> `<a href="#pagelist/genres=${tag.slug}">${tag.name}</a>`).join(", ");
        }

        const storesElement = articleDOM.querySelector(".Buy");
        if (storesElement && stores && stores.length > 0) {
          storesElement.innerHTML += stores.map((store)=> `<a href="https://${store.store.domain}" class="store">${store.store.name}</a>`).join("</br>");
        }
        
      };
      
  
      const fetchGame = (url, argument) => {
        fetch(`${url}/${argument}?key=${process.env.API_KEY}`)
          .then((response) => response.json())
          .then((responseData) => {
            displayGame(responseData);
            console.log(responseData);
          });
      };
  
      fetchGame('https://api.rawg.io/api/games', cleanedArgument);
    };
  
    const render = () => {
      pageContent.innerHTML = `
        <section class="page-detail">
          <div class="article">
          <img class="background-image img-fluid"></img>
          <p><a class="website-link"></a></p>
          <div class="row">
            <h1 class="title col-md-9"></h1>
            <p class="rating red h2 col-md-3"></p>
          </div>
          <div>
            <p class="description"></p>
          </div>
          <div class="row">
            <p class="release-date col-md-3"><strong>Release date :</strong></br> <span></span></p>
            <p class="developper col-md-3"><strong>Developper</strong> </br></p>
            <p class="platforms col-md-3"><strong>Platforms</strong> </br></p>
            <p class="Publiser col-md-3"><strong>Publiser</strong> </br></p>
          </div>
          <div class="row space-around">
            <p class="genre col-md-6"><strong>Genre </strong></br></p>
            <p class="tags col-md-6"><strong>Tags </strong></br></p>
          </div>
          <div>
          <h3 class="h1 red">Buy</h3>
            <p class="Buy"></p>
          </div>
          <div>
          <h3 class="h1 red">Screenshots</h3>
            <p class="Screenshots">Screenshots</p>
          </div>
          </div>
        </section>
      `;
  
      preparePage();
    };
    
    render();
  };

  export {PageDetail};