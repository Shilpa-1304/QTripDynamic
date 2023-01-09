import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  for (const value of urlParams.values()) {
    console.log(value);
    return value;
    }

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let res = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    let advdetails = await res.json();
    // console.log("Details===>",advdetails);
    return advdetails;
  } catch (err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  let heading = document.getElementById("adventure-name");
  heading.textContent = `${ adventure.name }`;
  let subtitle = document.getElementById('adventure-subtitle');
  subtitle.textContent = `${adventure.subtitle}`;
  let gallery = document.getElementById('photo-gallery').innerHTML;
   for(let i=0;i<adventure.images.length;i++)
   {
    var div=document.createElement("div");
    
     var img=document.createElement("img");
     img.setAttribute("class","activity-card-image");
     img.src=adventure.images[i];
     
     div.append(img);
     document.getElementById("photo-gallery").append(div);
   }
   document.getElementById("adventure-content").append(adventure.content);
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
   let photoGallery = document.getElementById("photo-gallery")
   photoGallery.innerHTML=`
   <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
   <div class="carousel-indicators">
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="slide 2"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="slide 3"></button>
   </div>
   <div class="carousel-inner"  id="carousel-inner">
   </div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
   </button>
 </div>
   `
   images.map((key,index)=>{
     let divElement = document.createElement("div");
     divElement.className=`carousel-item ${index===0?'active':''}`;
     divElement.innerHTML=`
       <img src=${key} class="activity-card-image pb-3"/>
     `;
     document.getElementById("carousel-inner").appendChild(divElement);
   });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let reserved = document.getElementById('reservation-panel-sold-out');
  let form = document.getElementById('reservation-panel-available');
  if (adventure.available == true) {
    //   reserved.setAttribute('display', 'block');
    // form.setAttribute('display', 'none');}
    reserved.style.display = 'none';
    form.style.display = 'block';
    let costPerPerson = document.getElementById('reservation-person-cost');
    costPerPerson.innerHTML = adventure["costPerHead"];
  }
  else {
     reserved.style.display = 'block';
    form.style.display = 'none';
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  
   document.getElementById("reservation-cost").innerHTML=persons*adventure["costPerHead"];

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
   const myForm=document.getElementById("myForm");
 myForm.addEventListener("submit",async(e)=>{
   e.preventDefault();
   let  data={
     name:myForm.elements["name"].value,
     date:new Date(myForm.elements["date"].value),
     person:myForm.elements["person"].value,
     adventure:adventure["id"]
   }
   
   try{
     const url = config.backendEndpoint + '/reservations/new';
     console.log(url);
     const res=await fetch(url,{
       method:"POST",
       headers: {'Content-Type': 'application/json'},
       body:JSON.stringify(data)
     });
     console.log("data===>", data);
     if (res.ok) {
       alert("success");
       window.location.reload();
     }
     else {
       let x = await res.json();
       alert(`failed${x.message}`);
     }
   }
   catch(error){
     console.log(error);
     alert("failed");

   }
 
 });
     

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  // console.log(adventure);
  if(adventure["reserved"]==true)
  document.getElementById("reserved-banner").style.display="block";
  else
  document.getElementById("reserved-banner").style.display="none";
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
