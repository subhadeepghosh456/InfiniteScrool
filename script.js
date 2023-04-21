// unsplash api
const imageContainer = document.getElementById('image-container');

let photosArray = []
let imageLoaded = 0;
let totalImage = 0;
let ready = false;
const count = 30;
const apiKey = 'BZTPz5-wK4_9uSceAnChM4iBwT7mch5Xi-gWeHlWk54';

const unspash_api_url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//helper function to set attribute onDOM Elements

function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]) 
    }
    
}

function imageLoded(){
    
    console.log("image loded",imageLoaded);
    imageLoaded++;
    if(imageLoaded >= totalImage){
        ready = true;
    }
}
// create elements for Links and Photos, Add to DOM

function displayPhotos(){

    totalImage = photosArray.length;

    //run function for each object in photosarray
    photosArray.forEach((photo)=>{
        //create <a>
        const item= document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');

        //create <img> for photo

        const img  = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description );
        img.setAttribute('title',photo.alt_description);
        //Put <img> inside <a>,then put

        img.addEventListener('load',imageLoded)
        
        item.appendChild(img);
        imageContainer.appendChild(item)

    })

}

// get photos from api
async function getPhotos(){
    try{
      const response = await fetch(unspash_api_url);
      photosArray = await response.json();

      displayPhotos();
    }catch(error){

       // console.log(error)

    }
}
window.addEventListener('scroll',()=>{
    //console.log('scrooled')
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false;
        console.log('touched')
        getPhotos()
    }   
})

getPhotos()