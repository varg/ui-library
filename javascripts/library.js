$(document).ready(function(){
  
  var Library = {
    htmlClean: function(dirtyHtml) {
      dirtyHtml = dirtyHtml.replace(/(\r\n|\n|\r)/,'');
      leadingSpaces = dirtyHtml.substr(0, dirtyHtml.indexOf("<"));
      dirtyHtmlArray = dirtyHtml.split(/(\r\n|\n|\r)/g);
      linesArray = [];
      for (i=0; i<dirtyHtmlArray.length; i++) {
        linesArray.push(dirtyHtmlArray[i].replace(leadingSpaces,''));
      }
      return linesArray.join('').trim();
    },

    buildSections: function(){
      $(".library-section").each(function(i, element){
        content = Library.htmlClean($(element).html());
        Library.setupSection(this, content, $(element).data('label'));
      });
    },
    
    setupSection: function(element, content, label){
      $(element).html("<div class='library-preview'></div><div class='library-code'></div>");
      $(element).find('.library-preview').html(content);
      $(element).find('.library-code').html('<pre><code></code></pre>');
      $(element).find('.library-code pre code').text(content);
      $(element).prepend("<span class='library-section-label'>"+label+"</span>");
      $(element).find('.library-code').append("<div class='copy'><button class='clip-button' data-clipboard-text='"+content+"'>Copy code</button></div>");
    },

    loadHighlight: function(){
      $.getScript("http://yandex.st/highlightjs/7.3/highlight.min.js", function(){
        hljs.tabReplace = '  ';
        hljs.initHighlightingOnLoad();
      });
    }
  }
  
  $.when(Library.buildSections()).done(function(){
    Library.loadHighlight();
  });
  
  // Navigation Toggle
  $('.library-navigation .expander').click(function(){
    $('.library-navigation').toggleClass('expanded');
  });
  
  var clip = new ZeroClipboard($(".clip-button"));
  
  clip.on( 'complete', function (client, args) {
    $(this).text("Copied!").addClass("copied")
  });
  
});