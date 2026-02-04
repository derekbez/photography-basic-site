/* Eleventy config — set the project input to the `content` folder */

module.exports = function(eleventyConfig) {
  // Navigation plugin
  eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));

  // Copy `content/img` to output `/img`
  eleventyConfig.addPassthroughCopy({ "content/img": "img" });
  // Copy `content/css` to output `/css`
  eleventyConfig.addPassthroughCopy({ "content/css": "css" });

  // Simple `date` filter used in templates (supports %Y, %m, %d)
  eleventyConfig.addFilter("date", function(value, formatStr) {
    try {
      const dt = (value === "now" || value === "now()") ? new Date() : new Date(value);
      if (isNaN(dt)) return value;
      if (!formatStr) return dt.toString();
      return formatStr
        .replace("%Y", String(dt.getFullYear()))
        .replace("%m", String(dt.getMonth() + 1).padStart(2, "0"))
        .replace("%d", String(dt.getDate()).padStart(2, "0"));
    } catch (e) {
      return value;
    }
  });

  const isProd = process.env.ELEVENTY_ENV === "production";
  // Allow overriding the path prefix with an environment variable. Default to '/' for custom domains.
  // Set ELEVENTY_PATH_PREFIX="/photography-basic-site/" when you need a subdirectory deployment.
  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";

  return {
    dir: {
      input: "content",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    pathPrefix
  };
};
