let slider = document.querySelector("#range");
let volume = document.querySelector("#volume");
volume.innerHTML = slider.value;

slider.addEventListener("change", function () {
  volume.innerHTML = this.value;
  let finalValue = this.value / 100;

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let my_tabid = tabs[0].id;

    chrome.scripting.executeScript({
        target: { tabId: my_tabid },
        func: changeVolume,
        args: [finalValue],
      },
      () => {
        // void
      }
    );
  });
  function changeVolume(finalValue) {
    document.querySelector(".html5-main-video").volume = finalValue;
  }
});