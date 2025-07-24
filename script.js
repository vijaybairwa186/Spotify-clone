let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemPlays = Array.from(document.getElementsByClassName("songItemPlay"));

const navHome = document.getElementById("navHome");
const navSearch = document.getElementById("navSearch");
const navLibrary = document.getElementById("navLibrary");
const homeSection = document.getElementById("homeSection");
const searchSection = document.getElementById("searchSection");
const librarySection = document.getElementById("librarySection");
const contentSections = document.querySelectorAll(".content-section");
const navLinks = document.querySelectorAll("nav ul li a");

let songs = [
  {
    songName: "Blue Eyes - Yo Yo Honey Singh",
    filePath:
      "songs/Blue Eyes Full Video Song Yo Yo Honey Singh  Blockbuster Song Of 2013.mp3",
    coverPath: "covers/Blue Eyes.jpg",
    duration: "04:02"
  },
  {
    songName: "Chaar Botal Vodka - Yo Yo Honey Singh",
    filePath:
      "songs/Chaar Botal Vodka Full Song Feat. Yo Yo Honey Singh, Sunny Leone  Ragini MMS 2.mp3",
    coverPath: "covers/Chaar Botal Vodka.jpg",
    duration: "03:50"
  },
  {
    songName: "Dheere Dheere Se Meri Zindagi - Yo Yo Honey",
    filePath:
      "songs/Dheere Dheere Se Meri Zindagi Video Song (OFFICIAL) Hrithik Roshan, Sonam Kapoor  Yo Yo Honey Singh.mp3",
    coverPath: "covers/Dheere Dheere Se Meri Zindagi.jpg",
    duration: "05:04"
  },
  {
    songName: "LOVE DOSE - Yo Yo Honey Singh",
    filePath:
      "songs/Exclusive_ LOVE DOSE Full Video Song  Yo Yo Honey Singh, Urvashi Rautela  Desi Kalakaar.mp3",
    coverPath: "covers/LOVE DOSE Full.jpg",
    duration: "04:37"
  },
  {
    songName: "HIGH HEELS TE NACHCHE - Yo Yo Honey",
    filePath:
      "songs/HIGH HEELS TE NACHCHE Video Song  KI & KA  Meet Bros ft. Jaz Dhami  Yo Yo Honey Singh  T-Series.mp3",
    coverPath: "covers/HIGH HEELS TE NACHCHE.jpg",
    duration: "02:57"
  },
  {
    songName: "LAAL PARI - Yo Yo Honey Singh",
    filePath:
      "songs/LAAL PARI (Song)_ Yo Yo Honey Singh  Sajid Nadiadwala  Tarun Mansukhani  Housefull 5 - 6th June.mp3",
    coverPath: "covers/LAAL PARI.jpg",
    duration: "03:05"
  },
  {
    songName: "Lungi Dance - Yo Yo Honey Singh",
    filePath:
      "songs/Lungi Dance Chennai Express New Video Feat. Honey Singh, Shahrukh Khan, Deepika.mp3",
    coverPath: "covers/Lungi Dance Chennai.jpg",
    duration: "03:32"
  },
  {
    songName: "MANIAC - Yo Yo Honey Singh",
    filePath:
      "songs/MANIAC (Official Video)_ YO YO HONEY SINGH  ESHA GUPTA  GLORY  BHUSHAN KUMAR.mp3",
    coverPath: "covers/MANIAC.jpg",
    duration: "02:58"
  },
  {
    songName: "MILLIONAIRE SONG - Yo Yo Honey Singh",
    filePath:
      "songs/MILLIONAIRE SONG (Full Video)_ @YoYoHoneySingh   GLORY  BHUSHAN KUMAR.mp3",
    coverPath: "covers/MILLIONAIRE SONG.jpg",
    duration: "03:30"
  },
  {
    songName: "DESI KALAKAAR - Yo Yo Honey Singh",
    filePath:
      "songs/Official_ Desi Kalakaar Full VIDEO Song  Yo Yo Honey Singh  Honey Singh New Songs 2014.mp3",
    coverPath: "covers/Desi Kalakaar.jpg",
    duration: "09:58"
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.querySelector('.timeStamp span').innerText = songs[i].duration;
});

const makeAllPlays = () => {
  songItemPlays.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
  songItems.forEach((element) => {
    element.classList.remove("active");
  });
};

const playSong = () => {
  audioElement.pause();
  audioElement.currentTime = 0;

  audioElement.src = songs[songIndex].filePath;

  audioElement.onerror = (e) => {
      console.error("Audio loading error:", songs[songIndex].songName, e);
      alert(`Could not load song: ${songs[songIndex].songName}. Please check file path.`);
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
      gif.style.opacity = 0;
      makeAllPlays();
  };

  audioElement.play().then(() => {
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    updateSongUI();
  }).catch(error => {
    console.warn("Autoplay prevented or play error:", error);
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    makeAllPlays();
  });
};

const updateSongUI = () => {
  makeAllPlays();
  songItems[songIndex].classList.add("active");
  songItemPlays[songIndex].classList.remove("fa-play-circle");
  songItemPlays[songIndex].classList.add("fa-pause-circle");
  masterSongName.innerText = songs[songIndex].songName;
};

const showSection = (sectionId) => {
    contentSections.forEach(section => {
        section.classList.remove('active-section');
    });
    document.getElementById(sectionId).classList.add('active-section');

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
    });
    document.getElementById(`nav${sectionId.replace('Section', '')}`).classList.add('active-nav');
};

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong();
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    makeAllPlays();
  }
});

audioElement.addEventListener("timeupdate", () => {
  if (audioElement.duration) {
    let progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100
    );
    myProgressBar.value = progress;
  }
});

myProgressBar.addEventListener("change", () => {
  if (audioElement.duration) {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
  }
});

songItems.forEach((element, i) => {
  element.addEventListener("click", () => {
    if (songIndex === i && (!audioElement.paused && audioElement.currentTime > 0)) {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        makeAllPlays();
    } else {
        songIndex = i;
        playSong();
    }
  });

  element.querySelector(".songlistplay i").addEventListener("click", (e) => {
    e.stopPropagation();
    if (songIndex === parseInt(e.target.id) && (!audioElement.paused && audioElement.currentTime > 0)) {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        makeAllPlays();
    } else {
        songIndex = parseInt(e.target.id);
        playSong();
    }
  });
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  playSong();
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  playSong();
});

audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playSong();
});

navHome.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('homeSection');
});

navSearch.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('searchSection');
});

navLibrary.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('librarySection');
});

masterSongName.innerText = songs[songIndex].songName;
gif.style.opacity = 0;
showSection('homeSection');
