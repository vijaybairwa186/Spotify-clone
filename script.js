console.log("Welcome to Spotify");

let songIndex = 0;

let audioElement = new Audio(
  "songs/Chaar Botal Vodka Full Song Feat. Yo Yo Honey Singh, Sunny Leone  Ragini MMS 2.mp3"
);
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Blue Eyes - Yo Yo Honey Singh",
    filePath:
      "songs/Blue Eyes Full Video Song Yo Yo Honey Singh  Blockbuster Song Of 2013.mp3",
    coverPath: "covers/Blue Eyes.jpg",
  },
  {
    songName: "Chaar Botal Vodka - Yo Yo Honey Singh",
    filePath:
      "songs/Chaar Botal Vodka Full Song Feat. Yo Yo Honey Singh, Sunny Leone  Ragini MMS 2.mp3",
    coverPath: "covers/Chaar Botal Vodka.jpg",
  },
  {
    songName: "Dheere Dheere Se Meri Zindagi - Yo Yo Honey",
    filePath:
      "songs/Dheere Dheere Se Meri Zindagi Video Song (OFFICIAL) Hrithik Roshan, Sonam Kapoor  Yo Yo Honey Singh.mp3",
    coverPath: "covers/Dheere Dheere Se Meri Zindagi.jpg",
  },
  {
    songName: "LOVE DOSE - Yo Yo Honey Singh",
    filePath:
      "songs/Exclusive_ LOVE DOSE Full Video Song  Yo Yo Honey Singh, Urvashi Rautela  Desi Kalakaar.mp3",
    coverPath: "covers/LOVE DOSE Full.jpg",
  },
  {
    songName: "HIGH HEELS TE NACHCHE - Yo Yo Honey",
    filePath:
      "songs/HIGH HEELS TE NACHCHE Video Song  KI & KA  Meet Bros ft. Jaz Dhami  Yo Yo Honey Singh  T-Series.mp3",
    coverPath: "covers/HIGH HEELS TE NACHCHE.jpg",
  },
  {
    songName: "LAAL PARI - Yo Yo Honey Singh",
    filePath:
      "songs/LAAL PARI (Song)_ Yo Yo Honey Singh  Sajid Nadiadwala  Tarun Mansukhani  Housefull 5 - 6th June.mp3",
    coverPath: "covers/LAAL PARI.jpg",
  },
  {
    songName: "Lungi Dance - Yo Yo Honey Singh",
    filePath:
      "songs/Lungi Dance Chennai Express New Video Feat. Honey Singh, Shahrukh Khan, Deepika.mp3",
    coverPath: "covers/Lungi Dance Chennai.jpg",
  },
  {
    songName: "MANIAC - Yo Yo Honey Singh",
    filePath:
      "songs/MANIAC (Official Video)_ YO YO HONEY SINGH  ESHA GUPTA  GLORY  BHUSHAN KUMAR.mp3",
    coverPath: "covers/MANIAC.jpg",
  },
  {
    songName: "MILLIONAIRE SONG - Yo Yo Honey Singh",
    filePath:
      "songs/MILLIONAIRE SONG (Full Video)_ @YoYoHoneySingh   GLORY  BHUSHAN KUMAR.mp3",
    coverPath: "covers/MILLIONAIRE SONG.jpg",
  },
  {
    songName: "DESI KALAKAAR - Yo Yo Honey Singh",
    filePath:
      "songs/Official_ Desi Kalakaar Full VIDEO Song  Yo Yo Honey Singh  Honey Singh New Songs 2014.mp3",
    coverPath: "covers/Desi Kalakaar.jpg",
  },
];
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("input", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = songs[songIndex].filePath; // ✅ FIXED
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
