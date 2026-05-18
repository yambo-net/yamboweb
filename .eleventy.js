const { eleventyImageTransformPlugin } = require('@11ty/eleventy-img');
const { feedPlugin } = require('@11ty/eleventy-plugin-rss');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // output image formats
    formats: ['png'],

    // output image widths
    widths: ['auto'],

    // optional, attributes assigned on <img> nodes override these values
    htmlOptions: {
      imgAttributes: {
        decoding: 'async',
      },
      pictureAttributes: {},
    },
  });
  eleventyConfig.addPlugin(feedPlugin, {
    type: 'atom', // or "rss", "json"
    outputPath: '/feed.xml',
    collection: {
      name: 'posts', // iterate over `collections.posts`
      limit: 0, // 0 means no limit
    },
    metadata: {
      language: 'es',
      title: 'YAMBO',
      subtitle: '',
      base: 'https://yambo.net/',
      author: {
        name: 'Yambo',
      },
    },
  });

  eleventyConfig.addPassthroughCopy('./src/css/');
  eleventyConfig.addWatchTarget('./src/css/');
  eleventyConfig.addPassthroughCopy('./src/js/');
  eleventyConfig.addWatchTarget('./src/js/');
  eleventyConfig.addPassthroughCopy('./src/assets/');
  eleventyConfig.addWatchTarget('./src/assets/');
  eleventyConfig.addPassthroughCopy('./src/up/'); // For Kamal
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter('fullDate', (dateObj) => {
    // DD.MM.YYYY
    return dateObj.toLocaleString('fr-CH', {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC',
    });
  });
  eleventyConfig.addFilter('dateWithoutYear', (dateObj) => {
    // DD.MM
    return dateObj.toLocaleString('pl-PL', {
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC',
    });
  });
  eleventyConfig.addFilter('postPathDate', (dateObj) => {
    // YYYY-MM-DD
    return dateObj.toLocaleString('en-CA', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC',
    });
  });
  eleventyConfig.addFilter('sortByOrder', (collection) => {
    let collectionArray = [...collection];
    return collectionArray.sort((a, b) =>
      Math.sign(a.data.order - b.data.order),
    );
  });
  eleventyConfig.addCollection('fechasFuturas', function (collectionApi) {
    return collectionApi
      .getFilteredByTags('fechas')
      .filter((item) => item.date >= new Date());
  });
  eleventyConfig.addCollection('fechasPasadas', function (collectionApi) {
    return collectionApi
      .getFilteredByTags('fechas')
      .filter((item) => item.date < new Date());
  });
  eleventyConfig.addBundle('html');
  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
