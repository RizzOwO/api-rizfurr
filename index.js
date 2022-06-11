const { version, author } = require("./package.json");
const downloader = require('./modules/downloader')

module.exports = {
  version,
  author,
  downloader: {
    igdl,
    igstory,
    igstalk,
    fbdown,
    ttdownloader,
    soundcloud,
    ytMp4,
	  ytMp3,
	  ytMp4,
	  ytPlay,
	  ytPlayVid
  }
};
