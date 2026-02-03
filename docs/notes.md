
Using Eleventy to set up a static website

Make sure node.js is installed

D:\>node -v
v25.5.0

D:\>npm -v
11.8.0

D:\>where node
C:\Program Files\nodejs\node.exe

If not installed 
`winget install OpenJS.NodeJS.LTS`

Install Eleventy inside the project folder.
```
npm init -y
npm install @11ty/eleventy --save-dev
```

> should get a package.json, and text like `added 134 packages, and audited 135 packages in 3s`

Run Eleventy
`npx eleventy`

> should get output like 
[11ty] Writing ./_site/notes/index.html from ./notes.md (liquid)
[11ty] Wrote 1 file in 0.08 seconds (v3.1.2) 


Create folders for content

Update .eleventy.js
```
module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: "content",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    }
  };
};
```

Create folder for images
```
  // Copy `content/img` to output `/img`
  eleventyConfig.addPassthroughCopy({ "content/img": "img" });
```
Images can now be added to the markdown like this
`![Flying Stork](/img/2014_11_07_08_41_43_2069-Edit.jpg)`

Navigation using the Eleventy Navigation Plugin
Install:
`npm install @11ty/eleventy-navigation`

```
// Navigation plugin
  eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
```

View the site:
`npx eleventy --serve`

`http://localhost:8080`



