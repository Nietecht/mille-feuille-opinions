const fs = require('fs');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAbbr = require("markdown-it-abbr");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItFootnote = require("markdown-it-footnote");

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

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy({"_favicons":"/"});
  
  // For local development only
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          // Add 404 http status code in request header.
          // res.writeHead(404, { "Content-Type": "text/html" });
          res.writeHead(404);
          const content_404 = fs.readFileSync('_site/404.html');
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });
  
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