const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAbbr = require("markdown-it-abbr");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItFootnote = require('markdown-it-footnote');

const {TextLintEngine} = require('textlint');
const engine = new TextLintEngine();

module.exports = function(eleventyConfig) {
  const options = {
    html: true
  };

  const markdownLib = markdownIt(options).use(markdownItAttrs, markdownItAnchor)
      .use(markdownItAbbr)
      .use(markdownItFootnote)
      ;
  
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addLinter("textlinter", async function(content, inputPath, outputPath) {
    if (inputPath.endsWith(".md")) {
      const results = await engine.executeOnFiles([inputPath]);
      if (results.length) {
        const sum = results.reduce((acc, val) => acc + val.messages.length, 0);
        if (sum){
          console.log(engine.formatResults(results));
        }
      }
    }
  });

  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy("img/*.(png|svg)");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("browserconfig.xml");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy("safari-pinned-tab.svg");
  
  return {
    passthroughFileCopy: true,
    
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  }
};