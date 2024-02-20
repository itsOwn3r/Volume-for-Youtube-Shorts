let slider = document.querySelector("#range");
let volume = document.querySelector("#volume");
volume.innerHTML = slider.value;

slider.addEventListener("wheel", function (e) {

  function secChangeVolume(finalValue) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let my_tabid = tabs[0].id;

    chrome.scripting.executeScript({
        target: { tabId: my_tabid },
        func: changeVolume,
        args: [finalValue / 100],
      },
      () => {
        // Silence is golden
      })})
  }
  console.log(e.deltaY)
  if (e.deltaY === 200) {
    document.querySelector('#range').value = Number(document.querySelector('#range').value) - 1
    secChangeVolume(document.querySelector('#range').value)
    volume.innerHTML = document.querySelector('#range').value
  }else if(e.deltaY === 120){
    document.querySelector('#range').value = Number(document.querySelector('#range').value) - 1
    secChangeVolume(document.querySelector('#range').value)
    volume.innerHTML = document.querySelector('#range').value
  }else if(e.deltaY === -120){
    document.querySelector('#range').value = Number(document.querySelector('#range').value) + 1
    secChangeVolume(document.querySelector('#range').value)
    volume.innerHTML = document.querySelector('#range').value
  }else if(e.deltaY === -200){
    document.querySelector('#range').value = Number(document.querySelector('#range').value) + 1
    secChangeVolume(document.querySelector('#range').value)
    volume.innerHTML = document.querySelector('#range').value
}
})

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
        // Silence is golden
      }
    );
  });

}); 

 function changeVolume(finalValue) {
    if (document.querySelector(".html5-main-video")) {
      document.querySelector(".html5-main-video").volume = finalValue;
    }
    let rawData = JSON.parse(localStorage.getItem('yt-player-volume'))
    console.log(rawData)
    const parsedData = JSON.parse(rawData.data)
    console.log(parsedData)
    parsedData.volume = Math.ceil(finalValue * 100);
    console.log(parsedData)
    rawData.data = JSON.stringify(parsedData)
    console.log(rawData)
    rawData.creation = Date.now()
    rawData.expiration =  rawData.creation + 2592000000
    localStorage.setItem("yt-player-volume", JSON.stringify(rawData))
  }
