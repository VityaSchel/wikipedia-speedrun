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
  if (iframe.src == `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://ru.wikipedia.org/wiki/${customPage}`)}`){
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
  styles.setAttribute("href","https://ru.wikipedia.org/w/load.php?lang=ru&modules=ext.cite.styles%7Cext.flaggedRevs.basic%2Cicons%7Cext.uls.interlanguage%7Cext.visualEditor.desktopArticleTarget.noscript%7Cext.wikimediaBadges%7Cmediawiki.toc.styles%7Cmediawiki.widgets.styles%7Coojs-ui-core.icons%2Cstyles%7Coojs-ui.styles.indicators%7Cskins.vector.styles.legacy%7Cwikibase.client.init&only=styles&skin=vector");
  styles.setAttribute("rel","stylesheet");
  page.head.appendChild(styles);

  let styles2 = document.createElement("link");
  styles2.setAttribute("href","https://wikipedia.utidteam.com/stylesheets/articles.css?v=1.0");
  styles2.setAttribute("rel","stylesheet");
  page.head.appendChild(styles2);

  let script = document.createElement("script");
  script.setAttribute("src","https://wikipedia.utidteam.com/js/hrefcallback.js?v=1.0");
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
      ln.setAttribute("onclick","alert('Внешние ссылки не поддерживаются в wikipedia speedrun'); return false;");
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

let customPage = "Гитлер,_Адольф";
function selectCustom() {
  let customURL = window.prompt("Ссылка на статью (редиректы не работают)","https://ru.wikipedia.org/wiki/Гитлер,_Адольф");
  if (customURL != null && customURL != "") {
    if(customURL.indexOf("//ru.wikipedia.org/wiki/") == -1){
      alert("Введите ссылку на статью");
      return false;
    } else {
      customPage = decodeURI(customURL.split("//ru.wikipedia.org/wiki/")[1]);
      customPage = customPage.replace(/_/ig, " ");
      document.getElementById("customPageIndicator").innerText = "Вы выбрали в качестве финальной страницы "+customPage;
    }
  }
}

function setarticle_root(o) {
  let l = o.getAttribute("prevhref");
  iframe.src = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://ru.wikipedia.org/wiki/${l}`)}`;
  //just wanted to say that it won't work with edits and any arguments in url :)
  clearInterval(callbackInterval);
  if(prefferedType == 2){
    redirects += 1;
    counter.innerHTML = `Переходы: ${redirects}`;
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
      counter.innerHTML = `Время: ${time}`;
    },1000);
  } else {
    redirects = 0;
    prefferedType = 2;
    counter.innerHTML = `Переходы: ${redirects}`;
  }
  iframe.src="https://wikipedia.utidteam.com/wikipedia.php?page=Служебная:Случайная_страница";
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
    document.getElementById("win_results").innerHTML = `Время: ${time}`;
  } else {
    document.getElementById("win_results").innerHTML = `Переходов: ${redirects}${redirects<=1 ? "; Вам повезло :D" : ""}`;
  }
}
