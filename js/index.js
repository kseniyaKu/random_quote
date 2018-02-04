/*for IE 7-9 report about outdated browser version*/
if (document.all && !window.atob) {
  var p = document.createElement("p");
  p.innerHTML = "You use an outdated browser version. Please use the latest one";
  p.style.margin = "20px";
  if (!document.querySelector) {
      document.body.style.backgroundColor = "rgb(52, 58, 64)";
      document.body.style.color = "white";
  }
  document.body.style.fontSize = "medium";
  document.body.replaceChild(p, document.getElementById("container"));
}
/*end code for IE 7-9*/

$(document).ready(function() {
  $(".container").css({"-webkit-transition-property": "opacity",
                       "-o-transition-property": "opacity",
                       "transition-property": "opacity",
                       "-webkit-transition-duration": "10s",
                       "-o-transition-duration": "10s",
                       "transition-duration": "10s",
                       "opacity": "1"});
  takeAndPrintQuote();
  $("#newQuote").on("click", function () {
    takeAndPrintQuote();
    return false;
  });//end click

  function cleanUp(html) {
        html = html.replace(/&/g, "&amp;");
        html = html.replace(/</g, "&lt;");
        html = html.replace(/>/g, "&gt;");
        html = html.replace(/"/g, "&quot;");
        return html;
  }

  function specialChairsEncode (str) {
    return $('<div/>').html(str).text();//grab the encoded contents. The div never exists on the page.
  }

  function takeAndPrintQuote () {
    $.get("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&" + Math.random(),
               function(data) {
                 var quote = data.shift();
                 var content = quote.content.substring(3, quote.content.length - 5);
                 content = cleanUp(content); //because shit happens
                 content = specialChairsEncode(content); //if not use, special chairs will not be reflected
                 quote.title = cleanUp(quote.title); //because shit happens
                 quote.title = specialChairsEncode(quote.title); //if not use, special chairs will not be reflected
                 $("#quote").html(content);
                 $("#auth").text(quote.title);
                 setTweetText (content, quote.title);
               }
    );//end get
  }

  function setTweetText (content, auth) {
    var str = 'https://twitter.com/intent/tweet?hashtags=quote&text=' + content + ' - ' + auth;
    document.getElementById("tweet").setAttribute("href", str);
  }
});//end ready