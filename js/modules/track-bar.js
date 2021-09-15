const TrackBar = (() => {
  const state = {
    currentTrackTime: 0,
    fullTrackTime: 0,
    fillWidth: 0,
  };

  // Cache the DOM
  const trackBarEl = document.querySelector(".track-bar");
  const trackBarFillEl = document.querySelector(".track-bar__fill");

  const init = () => {
    render();
  };

  const render = () => {
    trackBarFillEl.style.width = `${state.fillWidth}%`;
  };

  const getPercent = (current, full) => {
    return (current / full) * 100;
  };

  const setState = (obj) => {
    state.currentTrackTime = obj.currentTime;
    state.fullTrackTime = obj.duration;
    state.fillWidth = getPercent(state.currentTrackTime, state.fullTrackTime);
    render();
  };

  return {
    init,
    setState,
  };
})();

export default TrackBar;
