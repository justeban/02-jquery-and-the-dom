'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// PUT YOUR RESPONSE HERE
// This is our constructor function that will be used to create articles that will be added to our 'articles' array and our DOM. It's capitalized because that is the proper syntax for Constructor Functions. The 'this' refers to the object that is currently passed into 'rawDataObj'.'rawDataObj' it is a parameter of the constructor function and will contain the key/value pairs of our property.

// const rawDataObj = rawData;

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`

  this.title = rawDataObj.title;
  this.cateogry = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // PUT YOUR RESPONSE HERE
  // It creates a copy of the 'html' elements and keeps your javascript more DRY.

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  // COMPLETED
  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);


  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
        this.author  >> $('address a') = author selction
      2. author url,
        this.authorUrl
      3. article title,
        this.title
      4. article body, and
        this.body
      5. publication date. */
  // this.pubslishedOn

  $newArticle.find('a').text(this.author);


  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

for(let i = 0; i < rawData.length; i++) {
  articles.push(new Article(rawData[i]));
}

// for(let i = 0; i < articles.length; i++) {
//$('#articles').append(articles[i].toHtml());
// }
$('#articles').append(articles[1].toHtml());