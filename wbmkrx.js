(function(){
  
  var CUTOUT_BORDER = 6;

  function includeScript(url, loadedCallback){
    var s = document.createElement('script');
    s.src = url;
    s.onload = loadedCallback;
    document.head.appendChild(s);
  }

  function includeLink(url){
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = url;
    document.head.appendChild(l);
  }

  var baseUrl;

  function main(){

    var imgCutout = document.createElement('img');
    var topText = document.createElement('textarea');
    var bottomText = document.createElement('textarea');
    var modal = document.createElement('div');
    var elementTextLeft = document.createElement('div');
    var elementTextRight = document.createElement('div');

    function activate(element){
      modal.classList.add('on');

      var html = document.body.innerHTML.replace(/\n\n/g, '');
      var elementHTML = element.outerHTML;
      var elementHTMLIndex = html.indexOf(elementHTML);

      var rect = element.getBoundingClientRect();
      topText.style.bottom = window.innerHeight - rect.top + 'px';
      bottomText.style.top = rect.bottom + 'px';

      topText.value = html.substr(0, elementHTMLIndex);
      bottomText.value = html.substr(elementHTMLIndex + elementHTML.length);

      topText.scrollTop = topText.scrollHeight;

      imgCutout.src = element.src;
      imgCutout.style.left = rect.left - CUTOUT_BORDER + 'px';
      imgCutout.style.top = rect.top - CUTOUT_BORDER + 'px';
      imgCutout.style.width = rect.width + 'px';

      elementTextLeft.innerHTML = '&lt;img src=&quot;';
      elementTextRight.innerHTML = '&quot;&gt;'

      elementTextLeft.style.right = window.innerWidth - rect.left - CUTOUT_BORDER + 'px';
      elementTextLeft.style.top = rect.top + rect.height / 2 - elementTextLeft.clientHeight / 2 + 'px';
      elementTextRight.style.left = rect.right + CUTOUT_BORDER + 'px';
      elementTextRight.style.top = rect.top + rect.height / 2 - elementTextLeft.clientHeight / 2 + 'px';

      document.body.classList.add('body-control');
    }

    function deactivate(){
      modal.classList.remove('on');
      document.body.classList.remove('body-control');
    }

    var ctx = require.config({
      context: 'wbmkrx',
      baseUrl: baseUrl,
    });

    topText.setAttribute('disabled', true);
    bottomText.setAttribute('disabled', true);

    topText.classList.add('top-text');
    bottomText.classList.add('bottom-text');

    imgCutout.classList.add('cutout');
    elementTextLeft.classList.add('element-text');
    elementTextLeft.classList.add('left');
    elementTextRight.classList.add('element-text');

    modal.classList.add('modal');
    document.body.appendChild(modal);

    modal.appendChild(topText);
    modal.appendChild(imgCutout);
    modal.appendChild(bottomText);
    modal.appendChild(elementTextLeft);
    modal.appendChild(elementTextRight);

    console.log('webmakerx activated');

    activate(document.querySelectorAll('img')[2]);
  }

  var wbmkrScript;
  Array.prototype.forEach.call(document.scripts, function(script){
    if(script.src.indexOf('wbmkrx') > -1){
      wbmkrScript = script;
    }
  });

  baseUrl = wbmkrScript.src.substr(0, wbmkrScript.src.lastIndexOf('/'));

  includeScript(baseUrl + '/require.js', main);
  includeLink(baseUrl + '/style.css');
}());