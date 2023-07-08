var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

// slider.onchange = function() {
//   output.innerHTML = this.value;
//   console.log(document.querySelector('.html5-main-video'))
//   console.log(window.document.querySelector('.html5-main-video').volume)
//     document.querySelector('.html5-main-video').volume = this.value / 100;
// }

slider.addEventListener('change', function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
        // WAY 1
        // chrome.scripting.executeScript({
        //     target: {tabId: id, allFrames: true},
        //     files: ['content_scripts/cscript.js'],
        // });
        // chrome.tabs.executeScript(activeTabs[0].id, { code:  console.log(document.querySelector('title'))});
        async function getCurrentTab() {
            let queryOptions = { active: true, lastFocusedWindow: true };
            // `tab` will either be a `tabs.Tab` instance or `undefined`.
            let [tab] = await chrome.tabs.query(queryOptions);
            return tab;
          }

           function testi(){
          let newTab =  getCurrentTab()
          .then(function(response){
             return response.id
          })
            
          

          //newTab.then(x => x.url)    
          return newTab
        }
        //testi()
       // console.log(testi())
        function getTitle() {
            return document.title;
          }

        function changeVolume(){
            console.log(document.querySelector('title'))  
            //   var slider = document.getElementById("myRange");
            //    var output = document.getElementById("demo");
//output.innerHTML = slider.value;
                   // slider.onchange 
                    slider.addEventListener("change",function() {
                   console.log(document.querySelector('title'))                
                   output.innerHTML = this.value;
                    document.querySelector('.html5-main-video').volume = this.value / 100;                   
                   console.log(document.querySelector('.html5-main-video'))
                   console.log(window.document.querySelector('.html5-main-video').volume)
                 })
                }


            //    var slider = document.getElementById("myRange");
            //    var output = document.getElementById("demo");
            let finalVol = 0.23;
                slider.addEventListener("change", fivol) 
                function fivol()    {
                output.innerHTML = this.value;    
                finalVol = this.value / 100;
                console.log(this.value) 
                console.log(output) 
                console.log(finalVol) 
                return finalVol;
                }
            
                console.log(fivol()) 

            function changeVolume2(){
                //console.log(finalVol) 
                document.querySelector('.html5-main-video').volume = 0.4
            }
                

          const tabId = getCurrentTab();
          chrome.scripting.executeScript(
              {
                target: {tabId: 138928791},
                func: changeVolume2,
              },
              () => {  
                //changeVolume()
                // slider.onchange = function() {
                //    console.log(document.querySelector('title'))                
                //    output.innerHTML = this.value;
                //     document.querySelector('.html5-main-video').volume = this.value / 100;                   
                //    console.log(document.querySelector('.html5-main-video'))
                //    console.log(window.document.querySelector('.html5-main-video').volume)


                //  }
                 });
    });
});

//document.querySelector('.html5-main-video').volume = 0.65