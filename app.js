const frame=document.getElementById('famelack-frame');
document.getElementById('fullscreen-btn').addEventListener('click',async()=>{
  try {
    if(document.fullscreenElement){await document.exitFullscreen();return;}
    if(frame.requestFullscreen){await frame.requestFullscreen();}
    else if(document.getElementById('player').requestFullscreen){await document.getElementById('player').requestFullscreen();}
    else window.open('https://famelack.com/tv/lk','_blank','noopener');
  } catch(e) {
    window.open('https://famelack.com/tv/lk','_blank','noopener');
  }
});
