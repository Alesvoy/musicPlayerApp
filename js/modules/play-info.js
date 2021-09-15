import Playlist from "./playlist.js";

const PlayInfo = (() => {
  const state = {
    songsLength: 0,
    isPlaying: false,
  };

  // Cache the DOM
  const playerCountEl = document.querySelector(".player__count");
  const playerTriggerEl = document.querySelector(".player__trigger");

  const init = () => {
    render();
    listeners();
  };

  const listeners = () => {
    playerTriggerEl.addEventListener("click", () => {
      state.isPlaying = state.isPlaying ? false : true;
      render();
      Playlist.flip();
    });
  };

  const setState = (obj) => {
    state.songsLength = obj.songsLength;
    state.isPlaying = obj.isPlaying;
    render();
  };

  const render = () => {
    playerCountEl.innerHTML = state.songsLength;
    playerTriggerEl.innerHTML = state.isPlaying ? "Pause" : "Play";
  };

  return {
    init,
    setState,
  };
})();

export default PlayInfo;
