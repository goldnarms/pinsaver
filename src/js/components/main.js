var sjs = require('../../bower_components/scraperjs/src/Scraper');

var News = React.createClass({
  render: function() {
    sjs.StaticScraper.create('https://news.ycombinator.com').scrape(function($) {
        return $('.title a').map(function() {
            return $(this).text();
        }).get().filter(function(elm) {
            return elm != 'More';
        });
    }, function(news) {
        news.forEach(function(elm) {
            console.log(elm);
        });
    });
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
React.render(
  <News />,
  document.getElementById('container')
);
