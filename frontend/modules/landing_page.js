import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + "/cities");
    // let res = await fetch('http://43.205.70.252:8082/cities');
    let cities = await res.json();
    return cities;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let row = document.getElementById("data");

  let ele = document.createElement("div");
  ele.setAttribute("class", "col-12 col-sm-6 col-lg-3 mb-4");
  ele.innerHTML = `<a href="pages/adventures/?city=${id}" id=${id}>
        <div class="tile">
          <img src="${image}" class="img-responsive" alt="Load Error">
          <div class="tile-text">
            <h4>${city}</h4>
            <p>${description}</p>
          </div>
        </div>  
          </a>`;
  row.appendChild(ele);
}

export { init, fetchCities, addCityToDOM };
