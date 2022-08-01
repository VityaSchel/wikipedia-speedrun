let iframe = document.getElementById("wikipediasrc");
let counter = document.getElementById("counter");
let layout = document.getElementById("layout_iframe");
let layout_win = document.getElementById("layout_win");
let layout_load = document.getElementById("layout_load");

const isEnglishLocale = window.location.pathname.split('/')?.[1] === 'en'
const wikipediaURI = isEnglishLocale ? 'https://wikipedia.org' : 'https://ru.wikipedia.org'
const pUrlFormat = page => encodeURIComponent(`${wikipediaURI}/wiki/${page}`)

window._loading = false
let hrefsCollection;
let callbackInterval;
iframe.addEventListener("load", async function(){
  const iframeSrc = new URL(iframe.src)
  const iframeSrcArgs = iframeSrc.searchParams
  const pageURL = iframeSrcArgs.get('page')
  if (pageURL === "" || iframe.src === ""){ return false; }

  const wikipediaResponse = await fetch(`https://api.allorigins.win/raw?url=${pageURL}&t=${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
  const wikipediaContent = await wikipediaResponse.text()
  iframe.contentWindow.document.querySelector('html').innerHTML = wikipediaContent

  let page = iframe.contentWindow.document;
  let header = page.getElementById("firstHeading");
  iframe.style.opacity = "1";
  if (iframe.src == `/blank.html?page=${pUrlFormat(customPage)}`){
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
  styles.setAttribute("href", `${wikipediaURI}/w/load.php?lang=ru&modules=ext.cite.styles%7Cext.flaggedRevs.basic%2Cicons%7Cext.uls.interlanguage%7Cext.visualEditor.desktopArticleTarget.noscript%7Cext.wikimediaBadges%7Cmediawiki.toc.styles%7Cmediawiki.widgets.styles%7Coojs-ui-core.icons%2Cstyles%7Coojs-ui.styles.indicators%7Cskins.vector.styles.legacy%7Cwikibase.client.init&only=styles&skin=vector`);
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
      ln.setAttribute("onclick",`alert('${isEnglishLocale ? 'External links aren\'t supported in wikipedia speedrun' : 'Внешние ссылки не поддерживаются в wikipedia speedrun'}'); return false;`);
    } else {
      lnk = href.substr(6);
      ln.setAttribute("href", "#");
      ln.setAttribute("onclick", "setarticle_frame(this); return false;");
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
  window._loading = false
}, false);

let customPage = "Гитлер,_Адольф";
function selectCustom() {
  let customURL = window.prompt(isEnglishLocale ? "Link to the article (redirects does not work)" : "Ссылка на статью (редиректы не работают)","https://ru.wikipedia.org/wiki/Гитлер,_Адольф");
  if (customURL != null && customURL != "") {
    if(customURL.indexOf("//ru.wikipedia.org/wiki/") == -1){
      alert(isEnglishLocale ? "Enter link to the article" : "Введите ссылку на статью");
      return false;
    } else {
      customPage = decodeURI(customURL.split(isEnglishLocale ? "//wikipedia.org/wiki/" : "//ru.wikipedia.org/wiki/")[1]);
      customPage = customPage.replace(/_/ig, " ");
      document.getElementById("customPageIndicator").innerText = isEnglishLocale ? "You selected " + customPage + " as final page" : "Вы выбрали в качестве финальной страницы " + customPage;
    }
  }
}

function setarticle_root(o) {
  let l = o.getAttribute("prevhref");
  iframe.src = `/blank.html?page=${pUrlFormat(l)}`;
  clearInterval(callbackInterval);
  if(prefferedType == 2){
    redirects += 1;
    counter.innerHTML = isEnglishLocale ? `Redirects: ${redirects}` : `Переходы: ${redirects}`;
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
      if (window._loading) return false
      seconds += 0.01;
      const secondsRound = Math.floor(seconds)
      let mins = "00"+(~~(secondsRound / 60));
      let secs = "0"+(secondsRound % 60);
      let time = `${mins.slice(-2)}:${secs.slice(-2)}`;
      counter.innerHTML = isEnglishLocale ? `Time: ${time}` : `Время: ${time}`;
    },10);
  } else {
    redirects = 0;
    prefferedType = 2;
    counter.innerHTML = isEnglishLocale ? `Redirects: ${redirects}` : `Переходы: ${redirects}`;
  }
  iframe.src = `/blank.html?page=${pUrlFormat(isEnglishLocale ? 'Special:Random' : 'Служебная:Случайная_страница')}`
  layout.style.display = "none";
}

function restart() {
  wikipediasrc.src = "/blank.html?page=";
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
    document.getElementById("win_results").innerHTML = isEnglishLocale ? `Time: ${time}` : `Время: ${time}`;
  } else {
    document.getElementById("win_results").innerHTML = isEnglishLocale ? `Redirects: ${redirects}${redirects <= 1 ? "; You lucky :D" : ""}` : `Переходов: ${redirects}${redirects<=1 ? "; Вам повезло :D" : ""}`;
  }
}
