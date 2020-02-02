const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const headline = document.getElementById('headline');



const songs = ['Genius', '3005', 'Fly_away'];

// Get Song Display name
function getDisplayName(song){
    const name = song;
    const newname = name.replace(/_/g, ' ');
    console.log(newname);
    return newname;
}

//Keep track of song
let songIndex = 1;

// Album
var album1 = {
    title : "Chasing A Balloon",
    artist : "Ivery Skies",
    year_released : 2017,
    songs : [
        {songname : "Genius"},
        {songname : "3005"},
        {songname : "Fly Away"}
    ]
};


// Display Song Name
function displayNewSongInfo(){
    var obj = album1.songs[songIndex].songname;
    console.log(obj);
    headline.innerHTML = obj;
}



// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song){

    title.innerText = getDisplayName(song);
    audio.src = `music/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
}

// Play song 
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    var temp = album1.songs[songIndex].songname;
    headline.innerHTML = temp;
    audio.play();
}

// Pause song 
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// Previos song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    displayNewSongInfo();
    playSong();
}

// Update progress bar
function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;

}



// Event Listeners 
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    } else{
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);