let iframe = document.getElementById("wikipediasrc");
let counter = document.getElementById("counter");
let layout = document.getElementById("layout_iframe");
let layout_win = document.getElementById("layout_win");
let layout_load = document.getElementById("layout_load");

let hrefsCollection;
let callbackInterval;
iframe.addEventListener("load", function(){
  if(iframe.src == ""){ return false; }
  let page = iframe.contentWindow.document;
  let header = page.getElementById("firstHeading");
  iframe.style.opacity = "1";
  if(iframe.src == `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://wikipedia.org/wiki/${customPage}`)}`){
    uraUraYaVyigralHhahahahahhaha();
    return false;
  }
  let base = page.getElementById("mw-page-base");
  let navs = page.getElementById("mw-navigation");
  let foot = page.getElementById("footer");
  base.outerHTML = "";
  navs.outerHTML = "";
  foot.outerHTML = "";
  let styles = document.createElement("link");
  styles.setAttribute("href","https://en.wikipedia.org/w/load.php?lang=en&modules=ext.cite.styles%7Cext.echo.styles.badge%7Cext.uls.interlanguage%7Cext.visualEditor.desktopArticleTarget.noscript%7Cext.wikimediaBadges%7Cjquery.makeCollapsible.styles%7Cjquery.tablesorter.styles%7Cmediawiki.toc.styles%7Coojs-ui.styles.icons-alerts%7Cskins.vector.styles.legacy%7Cwikibase.client.init&only=styles&skin=vector");
  styles.setAttribute("rel","stylesheet");
  page.head.appendChild(styles);

  let styles2 = document.createElement("link");
  styles2.setAttribute("href","./stylesheets/articles.css?v=1.0");
  styles2.setAttribute("rel","stylesheet");
  page.head.appendChild(styles2);

  let script = document.createElement("script");
  script.setAttribute("src","./js/hrefcallback.js?v=1.0");
  page.head.appendChild(script);

  let article = page.getElementById("content");
  article.style = "margin-left:0px;";
  hrefsCollection = page.getElementsByTagName("a");
  layout_load.style.display = "none";
  for(let i = 0; i < hrefsCollection.length; i++){
    let ln = hrefsCollection[i];
    let href = ln.getAttribute("href");
    if(href == null){
      continue;
    }
    let lnk;
    if(href.indexOf("/wiki/") != 0){
      ln.setAttribute("href", "#");
      ln.setAttribute("onclick","alert('External links does not supported in wikipedia speedrun'); return false;");
    } else {
      lnk = href.substr(6);
      ln.setAttribute("href", "#");
      ln.setAttribute("onclick","setarticle_frame(this); return false;");
      ln.setAttribute("prevhref",lnk);
    }

    ln.style.display = "inline-block";
  }
  callbackInterval = setInterval(function(){
    if(iframe.contentWindow.hrefcallback != undefined){
      let resFromCallback = iframe.contentWindow.hrefcallback();
      if(resFromCallback != "nothing-new"){
        setarticle_root(resFromCallback);
      }
    }
  }, 10);
}, false);

let customPage = "Adolf_Hitler";
function selectCustom() {
  let customURL = window.prompt("Link to the article (redirects does not work)","https://en.wikipedia.org/wiki/Adolf_Hitler");
  if (customURL != null && customURL != "") {
    if(customURL.indexOf("//en.wikipedia.org/wiki/") == -1){
      alert("Enter link to the article");
      return false;
    } else {
      customPage = decodeURI(customURL.split("//en.wikipedia.org/wiki/")[1]);
      customPage = customPage.replace(/_/ig, " ");
      document.getElementById("customPageIndicator").innerText = "You selected "+customPage+" as final page";
    }
  }
}

function setarticle_root(o) {
  let l = o.getAttribute("prevhref");
  iframe.src = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://wikipedia.org/wiki/${l}`)}`;
  //just wanted to say that it won't work with edits and any arguments in url :)
  clearInterval(callbackInterval);
  if(prefferedType == 2){
    redirects += 1;
    counter.innerHTML = `Redirects: ${redirects}`;
  }
  layout_load.style.display = "block";
  iframe.style.opacity = "0";
}

let seconds = 0;
let redirects = 0;
let prefferedType = 0;
let timer;
function start(s){
  if(s == "time"){
    seconds = 0;
    prefferedType = 1;
    timer = setInterval(function(){
      seconds += 1;
      let mins = "00"+(~~(seconds / 60));
      let secs = "0"+seconds % 60;
      let time = `${mins.slice(-2)}:${secs.slice(-2)}`;
      counter.innerHTML = `Time: ${time}`;
    },1000);
  } else {
    redirects = 0;
    prefferedType = 2;
    counter.innerHTML = `Redirects: ${redirects}`;
  }
  iframe.src = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://wikipedia.org/wiki/Special:Random`)}`
  layout.style.display = "none";
}

function restart() {
  wikipediasrc.src = "";
  layout.style.display = "";
  counter.innerHTML = "";
  layout_win.style.display = "none";
  layout_load.style.display = "none";
  clearInterval(timer);
}

function uraUraYaVyigralHhahahahahhaha(){
  wikipediasrc.src = "";
  layout_load.style.display = "none";
  layout_win.style.display = "";
  if(prefferedType == 1){
    clearTimeout(timer);
    let mins = "00"+(~~(seconds / 60));
    let secs = "0"+seconds % 60;
    let time = `${mins.slice(-2)}:${secs.slice(-2)}`
    document.getElementById("win_results").innerHTML = `Time: ${time}`;
  } else {
    document.getElementById("win_results").innerHTML = `Redirects: ${redirects}${redirects<=1 ? "; You lucky :D" : ""}`;
  }
}
