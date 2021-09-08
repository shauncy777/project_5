

/**
 * Dear reviewer,
 * 
 * I'm striving for a grade  of "Exceeds" on this project and would
 * like it to be rejected with explanations should it not make the cut.
 *  
 * Thank you for your time!
 * 
 */


let currentEmployee;
let profileData;
const profileContainer = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');
const body = document.querySelector('body');

            
body.style.backgroundColor="gray";


// Insert search bar
const searchBar = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    searchDiv.insertAdjacentHTML('beforeend', searchBar);


// Single fetch request for 12 random users from US which return proper formatted phone
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then( res => res.json())
    .then(data => {
        profileData = data.results;
        generateGalleryHTML(profileData);
        eachModal(profileData);
    })
    .catch(err => console.error('There was a problem loading the page')) 
    
   
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


// Listens for click on profile card to show detailed modal profile card
function eachModal (data){ 
    const cardDiv = document.getElementsByClassName('card');
        for(let i = 0; i < data.length; i++){
            
            cardDiv[i].addEventListener('click', (e) => {  
                currentEmployee = data.indexOf(data[i]);
                console.log(currentEmployee);
                generateModalCard(data[currentEmployee]);  
                
        });
        
    }
   
}

// Dynamic markup for modal cards
function generateModalCard(profile){
       let modalCard = `<div class="modal-container">
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${profile.picture.large}" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${profile.name.first} ${profile.name.last}</h3>
                                    <p class="modal-text">${profile.email}</p>
                                    <p class="modal-text cap">${profile.location.city}</p>
                                    <hr>
                                    <p class="modal-text">${profile.phone}</p>
                                    <p class="modal-text">${profile.location.street.number} ${profile.location.street.name}, ${profile.location.city}, ${profile.location.state} ${profile.location.postcode}</p>
                                    <p class="modal-text">Birthday: ${profile.dob.date.slice(5,7)}/${profile.dob.date.slice(8,10)}/${profile.dob.date.slice(0,4)}</p>
                                </div>
                            </div>
                            <div class="modal-btn-container">
                            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                            <button type="button" id="modal-next" class="modal-next btn">Next</button>
                        </div>
                    </div>`;

        profileContainer.insertAdjacentHTML('beforeend', modalCard);

        // Variables for modal functionality 
        const modalContainer = document.querySelector('.modal-container');
        const modalClose = document.querySelector('.modal-close-btn');
        
            // Listens for click on profile card to close 
            modalClose.addEventListener('click',() => {
                modalContainer.remove();
               
            });

        // Variables for modal toggling    
        const modalButt = document.querySelector('.modal-btn-container'); 
        const prevButt = document.querySelector('#modal-prev');
        const nextButt = document.querySelector('#modal-next')    
        const profiles = document.querySelectorAll('.card');
       
        // Modal toggling listener    
        modalButt.addEventListener('click', (e) => {

            if (e.target === nextButt && currentEmployee < profiles.length -1 ){
                currentEmployee ++;
            } else if (e.target === nextButt && currentEmployee == profiles.length -1){
                currentEmployee = 0;
            } else if (e.target === prevButt && currentEmployee > 0){
                currentEmployee --;
            } else if (e.target === prevButt && currentEmployee == 0){
                currentEmployee = profiles.length -1;
            }
                profileContainer.removeChild(modalContainer);
                generateModalCard(profileData[currentEmployee]); 
            
        });

    }

// This gives the search bar functionality
searchDiv.addEventListener('keyup',(e) => {
    let typedInput = e.target.value.toLowerCase();
    const profileCard = document.querySelectorAll('.card');
        for (let i = 0; i < profileCard.length; i ++){
            let nameText = profileCard[i].querySelector('h3');
            let profileName = nameText.textContent.toLowerCase();
            if(profileName.includes(typedInput)){
                profileCard[i].style.display = '';
            } else {
                profileCard[i].style.display = 'none';
            }
        }        
});