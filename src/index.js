import './style/style.scss';
import { routes } from './js/routes.js'; 
require('dotenv').config();

const callRoute = () => {
    const { hash } = window.location;
    const pathParts = hash.substring(1).split('/');
  
    const pageName = pathParts[0];
    const pageArgument = pathParts[1] || '';
    const pageFunction = routes[pageName];
  
    if (pageFunction !== undefined) {
        pageFunction(pageArgument);
    }
};

window.addEventListener('hashchange', () => callRoute());
window.addEventListener('DOMContentLoaded', () => callRoute());

const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    window.location.href = `#pagelist/${searchTerm}`;
  }
});

export { callRoute, platformsSvg };