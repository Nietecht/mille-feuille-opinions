const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig) {
  const options = {
    html: true
  };

  const markdownLib = markdownIt(options).use(markdownItAttrs, markdownItAnchor);
  
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy("img/*.png");
  eleventyConfig.addPassthroughCopy("favicon.png");
  
  return {
    passthroughFileCopy: true
    passthroughFileCopy: true,
    
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  }
};