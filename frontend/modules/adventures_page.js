
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  for (const value of urlParams.values()) {
    return value;
  }
}
//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try {
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    let data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    let row = document.getElementById("data");
  let ele = document.createElement("div");
  ele.setAttribute("class", "col-12 col-sm-6 col-lg-3 mb-4");
  ele.innerHTML = `<a href="detail/?adventure=${key.id}" id=${key.id}>
        <div class="activity-card border border-primary">
        <div class="category-banner">${key.category}</div>
          <img src="${key.image}" class="activity-card-image" alt="Load Error">
          
            <div class="adventure-data">
                 <div class="ad1"><div ">${key.name}</div><div ">₹${key.costPerHead}</div></div>
                 <div class="ad1"><div ">Duration</div><div ">${key.duration}</div></div>
            </div>

          
        </div>
          </a>`;

  row.appendChild(ele);
    
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
  function filterByDuration(list, low, high)
  {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
    const filteredByDuration = list.filter((item) => {
      return (item.duration >= low && item.duration <= high)
    });
  return filteredByDuration;
  
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList=[];
  console.log(list);
  list.filter(function (e) {
    if(categoryList.includes(e.category))
      filteredList.push(e);   
      });

      return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

  function filterFunction(list, filters)
  {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredlist =[]
  let arr=filters["duration"].split("-")

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
if(filters["category"].length>0&&filters["duration"].length>0){

  filteredlist = filterByCategory(list, filters.category);
  filteredlist = filterByDuration(filteredlist, parseInt(arr[0]), parseInt(arr[1]));
}else if(filters["category"].length>0){
  filteredlist=filterByCategory(list,filters.category);
}else if(filters["duration"].length>0){
 filteredlist=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
}else{
  return list;
}
  // Place holder for functionality to work in the Stubs
 return filteredlist;
}

//Implementation of localStorage API to save filters to local storage.
// This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
 const filters = JSON.parse(localStorage.getItem('filters'))

  // Place holder for functionality to work in the Stubs
  return filters;

  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const catergorylist = document.getElementById('category-list');
 
 const catergoryArr = filters.category;
 
  catergoryArr.forEach((item) => {
    const newdiv = document.createElement('div');
    newdiv.classList.add('category-filter')
    newdiv.innerText = item;
    catergorylist.appendChild(newdiv)
   
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
