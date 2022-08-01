let clickedLink;
let cachedClickedLink;

function hrefcallback(){
  if(clickedLink == cachedClickedLink){
    return "nothing-new";
  } else {
    cachedClickedLink = clickedLink;
    return clickedLink;
  }
}

function setarticle_frame(o){
  clickedLink = o;
  window.parent._loading = true
}
