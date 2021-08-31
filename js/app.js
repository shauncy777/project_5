

const profileContainer = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');


// Insert search bar
const searchBar = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    searchDiv.insertAdjacentHTML('beforeend', searchBar);


// Single fetch request for 12 random users
fetch('https://randomuser.me/api/?results=12')
    .then( res => res.json())
    .then(data => {
        generateGalleryHTML(data.results); 
    })

// Inserts each user into DOM
function generateGalleryHTML(data) {
    for(let i = 0; i < data.length; i++){
        let eachProfile = ` <div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${data[i].picture.large} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                <p class="card-text">${data[i].email}</p>
                <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
            </div>
        </div>`;
    profileContainer.insertAdjacentHTML('beforeend', eachProfile);
    }
}   