const apiKey = '23947179-781b42b5dc6644377be0aa184'
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const firebaseConfig = {
    apiKey: "AIzaSyCkb2l3tRPjjTcfdX8_QwBFPWJbeDkHNiQ",
    authDomain: "tinder-gif-1334d.firebaseapp.com",
    databaseURL: "https://tinder-gif-1334d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tinder-gif-1334d",
    storageBucket: "tinder-gif-1334d.appspot.com",
    messagingSenderId: "564539154793",
    appId: "1:564539154793:web:1cec74372bc7673a9f9df8",
    measurementId: "G-1MK51BR8K7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const dislike = document.querySelector('.dislike')
const like = document.querySelector('.like')
const div_info = document.querySelector('.information')
const img = document.querySelector('.img_pp')
img.style.visibility = 'hidden'
dislike.style.visibility = 'hidden'
like.style.visibility = 'hidden'
div_info.style.visibility = 'hidden'
const validName = document.querySelector('#id_submit_pseudo')
const pseudo = document.querySelector('#pseudo')
const container = document.querySelector('.container')
const select = document.querySelector('.select')
select.style.visibility = 'hidden'
const done = document.querySelector('.done');
done.style.visibility = 'hidden'



validName.addEventListener('click', () => {
    const name = pseudo.value;
    //utilises name, c'est le nom d'utilisateurs pour le rentrer dans ta bdd
    div_info.style.visibility = 'initial'
    img.style.visibility = 'initial'
    validName.style.visibility = 'hidden'
    pseudo.style.visibility = 'hidden'
    container.style.visibility = 'hidden'
    dislike.style.visibility = 'initial'
    like.style.visibility = 'initial'
    done.style.visibility = 'initial'
    select.style.visibility = 'initial'
    
})

const setUserLikes = async (userId, likedPhotos) => await db.collection("face_pic").doc(userId).set({likedPhotos});



const profileData = [];
const gender_select = document.querySelector('.gender-select');
let gender = "female"
const nationalitie_select = document.querySelector('.nat-select');
let nationalitie = "fr"


dislike.addEventListener('click', () => {
    likeAndDislike(dislike.value)
})

like.addEventListener('click', () => {
    likeAndDislike(like.value)
    profileData.push(document.querySelector(".img_pp").src);
})
done.addEventListener('click', () => {
    setUserLikes(pseudo.value, profileData);
});
function likeAndDislike (value) {
    nationalitie_select.addEventListener('change', () => {
	    nationalitie = nationalitie_select.value
    })

    gender_select.addEventListener('change', () => {
	    gender = gender_select.value
    })
    fetch(`https://randomuser.me/api/?nat=${nationalitie}&gender=${gender}`)
        .then(response => response.json())
        .then(data => {
            const profileData = data.results[0];

            document.querySelector(' .prenom').innerText = profileData.name.first;
            document.querySelector(' .nom').innerText = profileData.name.last;
            document.querySelector(" .age").innerText = profileData.dob.age;
            document.querySelector(".location").innerText = `${profileData.location.city}, ${profileData.location.country}`;
            document.querySelector(".img_pp").src = profileData.picture.large;

        })
        .catch(error => document.body.appendChild = error);
}
likeAndDislike()