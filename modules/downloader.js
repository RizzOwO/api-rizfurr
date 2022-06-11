const cheerio = require("cheerio");
const ytdl = require('ytdl-core');
const ig = require("instatouch");
const yts = require('yt-search');
const axios = require("axios");
const qs = require("qs");


function igdl(url){
	return new Promise(async(resolve, reject) => {
		axios.request({
			url: 'https://www.instagramsave.com/download-instagram-videos.php',
			method: 'GET',
			headers:{
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const token = $('#token').attr('value')
			let config ={
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
					"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
				data: {
					'url': url,
					'action': 'post',
					'token': token
				}
			}
		axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
		.then(({ data }) => {
		resolve(data.medias)
		   })
		})
	.catch(reject)
	})
}

function igstory(username){
	return new Promise(async(resolve, reject) => {
		axios.request({
			url: 'https://www.instagramsave.com/instagram-story-downloader.php',
			method: 'GET',
			headers:{
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const token = $('#token').attr('value')
			let config ={
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
					"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
				data: {
					'url':'https://www.instagram.com/'+ username,
					'action': 'story',
					'token': token
				}
			}
		axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
		.then(({ data }) => {
		resolve(data.medias)
		   })
		})
	.catch(reject)
	})
}

const options = {
  count: 0,
  mediaType: "all",
  timeout: 0,
  session: "sessionid=29895733743:6LxSkBb8nCfoNR:9",
};

function igstalk(url){
	return new Promise(async(resolve, reject) => {
    user = users.replace(/@/gi, "");
    if (user === undefined || !user) {
      reject("No Name Included.");
    }
    try {
      ig.getUserMeta(user, options)
        .then(async (data) => {
          resolve({
            status: 200,
            creator: "Caliph",
            profile: {
              low: data.graphql.user.profile_pic_url,
              high: data.graphql.user.profile_pic_url_hd,
            },
            data: {
              url: data.graphql.user.external_url,
              fullname: data.graphql.user.full_name,
              private: data.graphql.user.is_private,
              verified: data.graphql.user.is_verified,
              bio: data.graphql.user.biography,
              follower: data.graphql.user.edge_followed_by.count,
              following: data.graphql.user.edge_follow.count,
              conneted_fb: data.graphql.user.connected_fb_page,
              videotimeline: data.graphql.user.edge_felix_video_timeline.count,
              timeline: data.graphql.user.edge_owner_to_timeline_media.count,
              savedmedia: data.graphql.user.edge_saved_media.count,
              collections: data.graphql.user.edge_media_collections.count,
            },
          });
        })
        .catch((err) =>
          resolve({ status: 404, message: "Username Not Found!" })
        );
    } catch (err) {
      reject(err);
    }
  });

function twitter(link){
	return new Promise((resolve, reject) => {
		let config = {
			'URL': link
		}
		axios.post('https://twdown.net/download.php',qs.stringify(config),{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
			}
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
		resolve({
				desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
				thumb: $('div:nth-child(1) > img').attr('src'),
				HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
				SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
				audio: 'https://twdown.net/' + $('tr:nth-child(4) > td:nth-child(4) > a').attr('href')
			})
		})
	.catch(reject)
	})
}

function fbdown(link){
	return new Promise((resolve,reject) => {
	let config = {
		'url': link
		}
	axios('https://www.getfvid.com/downloader',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent":  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1310699039.1624884412; _pbjs_userid_consent_data=3524755945110770; cto_bidid=rQH5Tl9NNm5IWFZsem00SVVuZGpEd21sWnp0WmhUeTZpRXdkWlRUOSUyQkYlMkJQQnJRSHVPZ3Fhb1R2UUFiTWJuVGlhVkN1TGM2anhDT1M1Qk0ydHlBb21LJTJGNkdCOWtZalRtZFlxJTJGa3FVTG1TaHlzdDRvJTNE; cto_bundle=g1Ka319NaThuSmh6UklyWm5vV2pkb3NYaUZMeWlHVUtDbVBmeldhNm5qVGVwWnJzSUElMkJXVDdORmU5VElvV2pXUTJhQ3owVWI5enE1WjJ4ZHR5NDZqd1hCZnVHVGZmOEd0eURzcSUyQkNDcHZsR0xJcTZaRFZEMDkzUk1xSmhYMlY0TTdUY0hpZm9NTk5GYXVxWjBJZTR0dE9rQmZ3JTNEJTNE; _gid=GA1.2.908874955.1625126838; __gads=ID=5be9d413ff899546-22e04a9e18ca0046:T=1625126836:RT=1625126836:S=ALNI_Ma0axY94aSdwMIg95hxZVZ-JGNT2w; cookieconsent_status=dismiss"
			}
		})
	.then(async({ data }) => {
		const $ = cheerio.load(data);	
		resolve({
			Normal_video: $('div.col-md-4.btns-download > p:nth-child(2) > a').attr('href'),
			HD: $('div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			audio: $('div.col-md-4.btns-download > p:nth-child(3) > a').attr('href')
			})
		})
	.catch(reject)
	})
}

function ttdownloader(url){
	return new Promise(async(resolve, reject) => {
		axios.get('https://ttdownloader.com/',{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			let token = $('#token').attr('value')
			let config = {
				'url': url,
				'format': '',
				'token': token
			}
		axios('https://ttdownloader.com/req/',{
			method: 'POST',
			data : new URLSearchParams(Object.entries(config)),
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
			})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			resolve({
				message: 'RizFurr',
				nowm: $('div:nth-child(2) > div.download > a').attr('href'),
				wm: $('div:nth-child(3) > div.download > a').attr('href'),
				audio: $('div:nth-child(4) > div.download > a').attr('href')
				})
			})
		})
	.catch(reject)
	})
}

function soundcloud(url) {
  let res = await axios.get("https://soundcloudmp3.org/id");
  let $ = cheerio.load(res.data);
  let _token = $("form#conversionForm > input[type=hidden]").attr("value");
  tes = await axios("https://soundcloudmp3.org/converter", {
    data: new URLSearchParams(Object.entries({ _token, url })),
    headers: { cookie: res["headers"]["set-cookie"], accept: "UTF-8" },
    method: "post",
  });
  let $$ = cheerio.load(tes.data);
  ress = {};
  ress.thumb = $$("div.info.clearfix > img").attr("src");
  ress.title = $$("div.info.clearfix > p:nth-child(2)")
    .text()
    .replace("Title:", "");
  ress.duration = $$("div.info.clearfix > p:nth-child(3)")
    .text()
    .replace(/Length\:|Minutes/gi, "")
    .trim();
  ress.quality = $$("div.info.clearfix > p:nth-child(4)")
    .text()
    .replace("Quality:", "");
  ress.url = $$("a#download-btn").attr("href");
  if (
    !ress.url &&
    !ress.quality &&
    !ress.duration &&
    !ress.title &&
    !ress.thumb
  )
    throw { status: 400, creator: "RizFurr", message: "Link Invalid" };
  return { status: tes.status, creator: "RizFurr", result: ress };
};


                
function bytesToSize(bytes) {
  return new Promise((resolve, reject) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) resolve(`${bytes} ${sizes[i]}`);
    resolve(`${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`);
  });
}

function ytMp4(url) {
  return new Promise(async (resolve, reject) => {
    ytdl
      .getInfo(url)
      .then(async (getUrl) => {
        let result = [];
        for (let i = 0; i < getUrl.formats.length; i++) {
          let item = getUrl.formats[i];
          if (
            item.container == "mp4" &&
            item.hasVideo == true &&
            item.hasAudio == true
          ) {
            let { qualityLabel, contentLength, approxDurationMs } = item;
            let bytes = await bytesToSize(contentLength);
            result[i] = {
              video: item.url,
              quality: qualityLabel,
              size: bytes,
              duration: formated(parseInt(approxDurationMs)),
            };
          }
        }
        let resultFix = result.filter(
          (x) =>
            x.video != undefined &&
            x.size != undefined &&
            x.quality != undefined
        );
        let tinyUrl = resultFix[0].video;
        let title = getUrl.videoDetails.title;
        let desc = getUrl.videoDetails.description;
        let views = parseInt(getUrl.videoDetails.viewCount || 0);
        let likes = getUrl.videoDetails.likes;
        let dislike = getUrl.videoDetails.dislikes;
        let channel = getUrl.videoDetails.ownerChannelName;
        let uploadDate = getUrl.videoDetails.uploadDate;
        let thumb =
          getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail
            .thumbnails[0].url;
        resolve({
          creator: "RizFurr",
          title,
          result: tinyUrl,
          quality: resultFix[0].quality,
          size: resultFix[0].size,
          duration: resultFix[0].duration,
          thumb,
          views,
          likes,
          dislike,
          channel,
          uploadDate,
          desc,
        });
      })
      .catch(reject);
  });
}

function ytMp3(url) {
  return new Promise((resolve, reject) => {
    ytdl
      .getInfo(url)
      .then(async (getUrl) => {
        let result = [];
        for (let i = 0; i < getUrl.formats.length; i++) {
          let item = getUrl.formats[i];
          if (item.mimeType == 'audio/webm; codecs="opus"') {
            let { contentLength, approxDurationMs } = item;
            let bytes = await bytesToSize(contentLength);
            result[i] = {
              audio: item.url,
              size: bytes,
              duration: formated(parseInt(approxDurationMs)),
            };
          }
        }
        let resultFix = result.filter(
          (x) => x.audio != undefined && x.size != undefined
        );
        let tinyUrl = resultFix[0].audio;
        let title = getUrl.videoDetails.title;
        let desc = getUrl.videoDetails.description;
        let views = parseInt(getUrl.videoDetails.viewCount || 0);
        let likes = getUrl.videoDetails.likes;
        let dislike = getUrl.videoDetails.dislikes;
        let channel = getUrl.videoDetails.ownerChannelName;
        let uploadDate = getUrl.videoDetails.uploadDate;
        let thumb =
          getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail
            .thumbnails[0].url;
        resolve({
          creator: "RizFurr",
          title,
          result: tinyUrl,
          size: resultFix[0].size,
          duration: resultFix[0].duration,
          thumb,
          views,
          likes,
          dislike,
          channel,
          uploadDate,
          desc,
        });
      })
      .catch(reject);
  });
}

function ytPlay(query) {
  return new Promise((resolve, reject) => {
    yts(query)
      .then(async (getData) => {
        let result = getData.videos.slice(0, 5);
        let url = [];
        for (let i = 0; i < result.length; i++) {
          url.push(result[i].url);
        }
        let random = url[0];
        let getAudio = await ytMp3(random);
        resolve(getAudio);
      })
      .catch(reject);
  });
}

function ytPlayVid(query) {
  return new Promise((resolve, reject) => {
    yts(query)
      .then(async (getData) => {
        let result = getData.videos.slice(0, 5);
        let url = [];
        for (let i = 0; i < result.length; i++) {
          url.push(result[i].url);
        }
        let random = url[0];
        let getVideo = await ytMp4(random);
        resolve(getVideo);
      })
      .catch(reject);
  });
}

function formated(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}

module.exports.igdl = igdl
module.exports.igstory = igstory
module.exports.igstalk = igstalk
module.exports.twitter = twitter
module.exports.fbdown = fbdown
module.exports.ttdownloader = ttdownloader
module.exports.soundcloud = soundcloud
module.exports.ytMp4 = ytMp4
module.exports.ytMp3 = ytMp3
module.exports.ytPlay = ytPlay
module.exports.ytPlayVid = ytPlayVid
