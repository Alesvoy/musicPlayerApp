import { songsList } from "../data/songs.js";
import PlayInfo from "./play-info.js";

const Playlist = (() => {
  //Data or State
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);

  // Cache the DOM
  const playlistEl = document.querySelector(".playlist");

  const init = () => {
    render();
    listeners();
    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused,
    });
  };

  const flip = () => {
    togglePlayPause();
    render();
  };

  const changeAudioSrc = () => {
    currentSong.src = songs[currentlyPlayingIndex].url;
  };

  const togglePlayPause = () => {
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  };

  const mainPlay = (clickedIndex) => {
    if (currentlyPlayingIndex === clickedIndex) {
      // toggle play or pause
      console.log("same");
      togglePlayPause();
    } else {
      console.log("new");
      currentlyPlayingIndex = clickedIndex;
      changeAudioSrc();
      togglePlayPause();
    }

    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused,
    });
  };

  const playNext = () => {
    if (songs[currentlyPlayingIndex + 1]) {
      currentlyPlayingIndex++;
      changeAudioSrc();
      togglePlayPause();
      render();
    }
  };

  const listeners = () => {
    playlistEl.addEventListener("click", (event) => {
      if (event.target && event.target.matches(".fa")) {
        const listElem = event.target.parentNode.parentNode;
        const listElemIndex = [...listElem.parentElement.children].indexOf(
          listElem
        );
        mainPlay(listElemIndex);
        render();
      }
    });

    currentSong.addEventListener("ended", () => {
      playNext();
    });
  };

  const render = () => {
    let markup = "";

    const toggleIcon = (itemIndex) => {
      if (currentlyPlayingIndex === itemIndex) {
        return currentSong.paused ? "fa-play" : "fa-pause";
      } else {
        return "fa-play";
      }
    };

    songs.forEach((songObj, index) => {
      markup += `
      <li class="playlist__song ${
        index === currentlyPlayingIndex ? "playlist__song--active" : ""
      }">
        <div class="play-pause">
          <i class="fa ${toggleIcon(index)} pp-icon"></i>
        </div>
        <div class="playlist__song-details">
          <span class="playlist__song-name">${songObj.title}</span>
          <br />
          <span class="playlist__song-artist">${songObj.artist}</span>
        </div>
        <div class="playlist__song-duration">${songObj.time}</div>
      </li>
      `;
    });

    playlistEl.innerHTML = markup;
  };

  return {
    init,
    flip,
  };
})();

export default Playlist;
