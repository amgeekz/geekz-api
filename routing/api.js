const __path = process.cwd();
const favicon = require("serve-favicon");
const express = require("express");
const { default: axios, isAxiosError } = require("axios");
const brainly = require("brainly-scraper");
const googlethis = require("googlethis");
const moment = require("moment-timezone");
const fs = require("fs");
const router = express.Router();
const creator = "Farhannnnn";

const apikeyAndLimit = require("../library/apikeyAndLimit");
const { regexUrl, getBuffer, getJson, resSukses, resError, formatSize, loghandler } = require("../library/functions");
const { User } = require("./../database/model");

const { Cersex } = require("./../scrapping/cersex");
const { Porn } = require("./../scrapping/porn");
const { Primbon } = require("./../scrapping/primbon");
const { Instagram } = require("./../scrapping/instagram");
const { Downloader } = require("./../scrapping/downloader");
const { Tiktok } = require("./../scrapping/tiktok");
const { Youtube } = require("./../scrapping/youtube");
const { Information } = require("./../scrapping/information");
const { Tools } = require("./../scrapping/tools");
const { Anime } = require("./../scrapping/anime");
const { Sticker } = require("./../scrapping/semoji");
const { LK21, FilmApik } = require("./../scrapping/movies");
const { Ezgif } = require("./../scrapping/ezgif");
const { Wattpad } = require("./../scrapping/wattpad");
const { Games } = require("./../scrapping/games");
const { Short } = require("./../scrapping/shortener");
const { Nhentai } = require("./../scrapping/nhentai");
const { Nekopoi } = require("./../scrapping/nekopoi");

const cersex = new Cersex();
const porn = new Porn();
const primbon = new Primbon();
const instagram = new Instagram();
const downloader = new Downloader();
const tiktok = new Tiktok();
const youtube = new Youtube();
const information = new Information();
const tools = new Tools();
const anime = new Anime();
const sticker = new Sticker();
const Lk21 = new LK21();
const filmApik = new FilmApik();
const ezgif = new Ezgif();
const wattpad = new Wattpad();
const games = new Games();
const short = new Short();
const nhentai = new Nhentai();
const nekopoi = new Nekopoi();

router.use("/photofunia", require("./photofunia"));
router.use("/photooxy", require("./photooxy"));
router.use("/textpro", require("./textpro"));
router.use("/ephoto", require("./ephoto"));
router.use("/maker", require("./maker"));
router.use(favicon(__path + "/views/favicon.ico"));

router.get("/cekkey", async (req, res) => {
	let users = await User.findOne({
		apikey: req.query.apikey
	});
	if (!req.query.apikey) return resError(res, "masukkan parameter apikey");
	if (users == null) return res.json({
		status: false,
		creator,
		message: "please registered for get apikey",
		result: "your apikey not registered"
	});
	const { email, username, apikey, limiter, limit, since, premium } = users;
	let daysUser = new Date(limiter).getTime();
	let daysNow = new Date().getTime();
	let distance = daysUser - daysNow;
	let result = Math.floor(distance / (1000 * 60 * 60 * 24));
	let expired;
	let message;
	if (result < 1) {
		message = "your date limit has expired, please buy a limit to stay alive";
		expired = "expired";
	} else {
		message = "your apikey is registered";
		expired = `${result} Days`;
	}
	res.json({
		status: true,
		creator,
		message,
		result: { username, email, apikey, limit, premium, expired, since }
	});
});

router.get("/download/sfile", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/https?:\/\/sfile\.mobi\/[A-Za-z0-9]+/)) return res.json(loghandler.urlInvalid);
	tools.sfileDown(url).then(result => {
		resSukses(res, result);
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	})
});
router.get("/download/gore", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/https?:\/\/deepgoretube\.site/)) return res.json(loghandler.urlInvalid);
	tools.getGoore(url).then(result => {
		resSukses(res, result);
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	})
});
router.get("/download/joox", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	await getJson(`https://api.chipa.xyz/api/download/joox?title=${encodeURIComponent(query)}&apikey=E562BWOTFNVGUG7W4DVDL5K3`)
		.then(({ result }) => {
			if (!result instanceof Object) return res.json(loghandler.error);
			let joox = {
				judul: result.judul,
				artist: result.artist,
				album: result.album,
				size: result.filesize,
				duration: result.duration,
				thumbnail: result.thumb,
				link: result.mp3_url
			};
			resSukses(res, joox);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
});
router.get("/download/ytmp3", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/youtu/g)) return resError(res, "invalid url, masukkan url youtube dengan benar");
	await youtube.download(url, true).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/ytmp4", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/youtu/g)) return resError(res, "invalid url, masukkan url youtube dengan benar");
	await youtube.download(url, false).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/ytshort", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/https:\/\/youtube.com\/shorts\//g)) return resError(res, "invalid url, masukkan url youtube short dengan benar");
	youtube.short(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/playmp3", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	await youtube.play(query, true).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/playmp4", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	await youtube.play(query, false).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/pinterest", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/pin/g)) return resError(res, "invalid url, masukkan url pinterest dengan benar");
	downloader.aoivideodl(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, {
			title: result.title,
			thumbnail: result.thumbnail,
			duration: result.duration,
			data: result.medias[0]
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/soundcloud", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/sound/g)) return resError(res, "invalid url, masukkan url sound cloud dengan benar");
	downloader.aoivideodl(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, {
			title: result.title,
			thumbnail: result.thumbnail,
			duration: result.duration,
			data: result.medias[0]
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/ifunny", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/ifunny/g)) return resError(res, "invalid url, masukkan url ifunny dengan benar");
	downloader.aoivideodl(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, {
			title: result.title,
			thumbnail: result.thumbnail,
			duration: result.duration,
			data: result.medias[0]
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/imdb", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/imdb/g)) return resError(res, "invalid url, masukkan url imdb dengan benar");
	downloader.aoivideodl(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, {
			title: result.title,
			thumbnail: result.thumbnail,
			duration: result.duration,
			data: result.medias[0]
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/ig", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/instagram\.com\/(?:reel|p|tv|([A-Za-z0-9-_.]+\/(reel|p|tv)))\/[A-Za-z0-9-_.]+/g)) return resError(res, "invalid url, masukkan url instagram dengan benar");
	await instagram.download(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/igtv", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/instagram.com\/tv/g)) return resError(res, "invalid url, masukkan url instagram tv dengan benar");
	downloader.aoivideodl(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, {
			title: result.title,
			thumbnail: result.thumbnail,
			duration: result.duration,
			data: result.medias[0]
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/igstories", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	res.json(loghandler.error);
});
router.get("/download/igstory", apikeyAndLimit, async (req, res) => {
	const username = req.query.username;
	if (!username) return res.json(loghandler.notusername)
	await instagram.story(username).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch((err) => {
		console.error(err);
		res.json(loghandler.error);
	});
});
router.get("/download/twitter", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/twitter/g)) return resError(res, "invalid url, masukkan url twitter dengan benar");
	downloader.twitter(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch((err) => {
		console.error(err);
		res.json(loghandler.error);
	});
});
router.get("/download/fb", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/https?:\/\/(web\.|www\.|m\.|)?(facebook|fb)\.(com|watch)\S+/g)) return resError(res, "invalid url, masukkan url facebook dengan benar");
	downloader.aoivideodl(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, {
			title: result.title,
			thumbnail: result.thumbnail,
			duration: result.duration,
			data: result.medias[0]
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/fb2", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/https?:\/\/(web\.|www\.|m\.|)?(facebook|fb)\.(com|watch)\S+/g)) return resError(res, "invalid url, masukkan url facebook dengan benar");
	downloader.facebook(url).then(response => resSukses(res, response)).catch(e => {
	  res.json(loghandler.error);
	  console.log(e);
	});
});
router.get("/download/tiktok", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/tiktok\.com/g)) return resError(res, "invalid url, masukkan url tiktok dengan benar");
	await tiktok.ttdl(url).then(({ result }) => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/download/tiktok2", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/tiktok\.com/g)) return resError(res, "invalid url, masukkan url tiktok dengan benar");
	await tiktok.download(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/tiktok3", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/tiktok\.com/g)) return resError(res, "invalid url, masukkan url tiktok dengan benar");
	await tiktok.musically(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/tiktok4", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/tiktok\.com/g)) return resError(res, "invalid url, masukkan url tiktok dengan benar");
	await tiktok.snaptik(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/tiktok5", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/tiktok\.com/g)) return resError(res, "invalid url, masukkan url tiktok dengan benar");
	await tiktok.savetik(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/cocofun", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/icocofun\.com/g)) return resError(res, "invalid url, masukkan url cocofun dengan benar");
	await downloader.cocofun(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/linesticker", apikeyAndLimit, async (req, res) => {
	url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/store\.line\.me\/stickershop\/product\//g)) return resError(res, "invalid url, pastikan url yg anda masukkan benar")
	await downloader.stickerline(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/xnxx", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!url.match(/www\.xnxx\.com/g)) return resError(res, "invalid url, masukkan url xnxx dengan benar");
	porn.xnxxDown(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/download/xvideos", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/xvideos\.com/g)) return resError(res, "invalid url, masukkan url xvideos dengan benar");
	porn.xvideosDown(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
/*
 *@ STALKER
 */
router.get("/stalk/github", apikeyAndLimit, async (req, res) => {
	try {
		const username = req.query.username;
		if (!username) return res.status(200).json(loghandler.notusername);
		const result = await getJson(`https://api.github.com/users/${username}`);
		resSukses(res, {
			username: result.login,
			name: result.name,
			blog: result.blog,
			company: result.company,
			location: result.location,
			bio: result.bio,
			followers: result.followers,
			following: result.following,
			repository_count: result.public_repos,
			created_at: result.created_at.split("T")[0],
			update_at: result.updated_at.split("T")[0],
			profile_url: result.avatar_url
		});
	} catch (er) {
		res.json(loghandler.error);
		console.log(er);
	}
});
router.get("/stalk/tiktok", apikeyAndLimit, async (req, res) => {
	const username = req.query.username;
	if (!username) return res.json(loghandler.notusername)
	tiktok.stalker(username).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		resError(res, "username " + username + " tidak diketahui");
	});
});
router.get("/stalk/twitter", apikeyAndLimit, async (req, res) => {
	const username = req.query.username;
	if (!username) return res.json(loghandler.notusername)
	tools.twtstalk(username).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.error(er);
		resError(res, "username " + username + " tidak diketahui");
	});
});
router.get("/stalk/ig", apikeyAndLimit, async (req, res) => {
	const username = req.query.username;
	if (!username) return res.json(loghandler.notusername)
	await instagram.stalker(username).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er)
		resError(res, `username ${username} tidak diketahui`)
	})
});
router.get("/stalk/npm", apikeyAndLimit, async (req, res) => {
	const query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	await getJson(`https://registry.npmjs.org/${query}`)
		.then(result => resSukses(res, result))
		.catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
});
/*
@ PRIMBON
*/
router.get("/primbon/artinama", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	primbon.artiNama(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})

router.get("/primbon/artimimpi", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	primbon.artiMimpi(query).then((result) => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/primbon/jodoh", apikeyAndLimit, async (req, res) => {
	const { text, text2 } = req.query;
	if (!text) return res.json(loghandler.nottext)
	if (!text2) return res.json(loghandler.nottext2)
	primbon.ramalJodoh(text, text2).then((result) => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/primbon/tanggaljadi", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	primbon.tanggaljadi(query).then((result) => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/primbon/ramaljodoh", apikeyAndLimit, async (req, res) => {
	const { nama, nama2, tanggal, tanggal2 } = req.query;
	if (!nama || !nama2) return resError(res, "masukkan parameter nama & nama2")
	if (!tanggal || !tanggal2) return resError(res, "masukkan parameter tanggal & tanggal2")
	primbon.ramalanjodoh(nama, tanggal, nama2, tanggal2).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/primbon/rezekiweton", apikeyAndLimit, async (req, res) => {
	const tanggal = req.query.tanggal;
	if (!tanggal) return resError(res, "masukkan parameter tanggal")
	primbon.rejekiweton(tanggal).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/primbon/cocoknama", apikeyAndLimit, async (req, res) => {
	const { nama, tanggal } = req.query;
	primbon.kecocokannama(nama, tanggal).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/primbon/zodiakming", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	primbon.zodiakMing(query).then(({ data }) => {
		if (typeof data !== "object") return res.json(loghandler.error);
		resSukses(res, data);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/primbon/zodiakhar", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	primbon.zodiakHar(query).then((result) => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
/*
 *@ TOOLS
 */
router.get("/tools/tinyurl", apikeyAndLimit, async (req, res) => {
	const url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await axios.get(`https://tinyurl.com/api-create.php?url=${url}`).then(({ data }) => {
		if (isAxiosError()) res.json(loghandler.error);
		resSukses(res, data);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/tools/shorturl", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await short.short(url).then(result => {
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/tools/cuttly", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await short.cuttly(url).then(result => {
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/tools/fetch", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await axios.get(url).then(({ data }) => {
		if (isAxiosError()) res.json(loghandler.error);
		resSukses(res, data);
	}).catch(e => resError(res, e));
})
router.get("/tools/cekip", apikeyAndLimit, async (req, res) => {
	await getJson("https://api.ipgeolocation.io/ipgeo?apiKey=173ab2a4ae9e4f18a00b630916e9eec5&include=useragent").then(result => resSukses(res, result)).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/tools/web2plaintext", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await getJson(`https://websitetextextraction.apifex.com/api/v1/extract?url=${url}`).then(result => resSukses(res, result)).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/tools/headers", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await axios.get(url).then(({ headers }) => {
		if (isAxiosError()) res.json(loghandler.error);
		resSukses(res, headers);
	}).catch(e => resError(res, String(e)));
});
router.get("/tools/nping", apikeyAndLimit, async (req, res) => {
	const query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	await getJson(`https://api.hackertarget.com/nping/?q=${query}`).then(result => resSukses(res, result)).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/tools/pageurl", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await getJson(`https://api.hackertarget.com/pagelinks/?q=${url}`).then(result => resSukses(res, result)).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/tools/coinmarket", apikeyAndLimit, async (req, res) => {
	await tools.coinMarket().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/tools/checkcc", apikeyAndLimit, async (req, res) => {
	const number = req.query.number;
	if (!number) return res.json(loghandler.notnumber)
	tools.cekCC(number).then(result => {
		resSukses(res, result);
	}).catch(e => {
		console.log(e);
		res.json(loghandler.error)
	});
});
router.get("/tools/upload", async (req, res) => {
	res.sendFile(__path + "/views/upload.html")
})
router.post("/tools/upload", async (req, res) => {
	let sampleFile;
	let data;
	if (req.files == null || Object.keys(req.files).length === 0) return resError(res, "pilih salah satu file untuk diupload");
	sampleFile = req.files.sampleFile;
	ext = sampleFile.name?.includes('.') ? sampleFile.name.split(".")[1] : "bin";
	data = `${sampleFile.md5}.${ext}`
	sampleFile.mv(__path + "/assets/upload/" + data, async function (err) {
		if (err) return res.status(500).send(err)
		resSukses(res, {
			url: `https://${req.hostname}/upload/${data}`,
			original_name: sampleFile.name,
			size: formatSize(sampleFile.size),
			encoding: sampleFile.encoding,
			mimetype: sampleFile.mimetype
		});
	})
});
/*
 *@ RELIGION
 */
router.get("/religion/bibledays", apikeyAndLimit, async (req, res) => {
	await tools.bibbleDays().then(result => {
		resSukses(res, result)
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
router.get("/religion/kisahnabi", apikeyAndLimit, async (req, res) => {
	const nabi = req.query.nabi
	await information.Searchnabi(nabi)
		.then(result => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result);
		}).catch(() => resError(res, `query nabi ${nabi} tidak tersedia`))
})
router.get("/religion/hadits", apikeyAndLimit, async (req, res) => {
	const { kitab, number } = req.query;
	if (!kitab) return resError(res, "masukkan parameter kitab")
	if (!number) return res.json(loghandler.notnumber)
	await getJson(`https://hadits-api-zhirrr.vercel.app/books/${kitab}/${number}`).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		const results = {
			hadist: result.message,
			tersedia: result.available,
			hadist_nomer: result.data.contents.number,
			result: result.data.contents.arab,
			translate_id: result.data.contents.id
		};
		resSukses(res, results);
	}).catch(() => resError(res, `query request anda tidak tersedia`));
})
router.get("/religion/surah", apikeyAndLimit, async (req, res) => {
	const no = req.query.number;
	if (!no) return res.json(loghandler.notnumber);
	try {
		const surah = JSON.parse(fs.readFileSync(__path + "/data/islamic/surah/" + no + ".json"))
		const result = {
			name: surah.name,
			all_ayat: surah.number_of_ayah,
			surah_number: surah.number_of_surah,
			audio: surah.recitations[0].audio_url,
			type: surah.type,
			verses: surah.verses
		}
		resSukses(res, result);
	} catch (e) {
		resError(res, `quran surah ${no} tidak tersedia`)
	}
})
router.get("/religion/quran", apikeyAndLimit, async (req, res) => {
	const { surah, ayat } = req.query;
	if (!surah) return resError(res, "masukan parameter surah, ayat")
	await getJson(`https://alquran-apiii.vercel.app/surah/${surah}/${ayat}`).then(({ data }) => {
		if (typeof data !== "object") return res.json(loghandler.error);
		const result = {
			surah: data.surah.name.transliteration.id,
			surah_no: data.surah.number,
			ayat_no: data.number.inSurah,
			text_arab: data.text.arab,
			translate_id: data.translation.id,
			translate_en: data.translation.en,
			audio: data.audio.secondary[0],
			tafsir: data.tafsir.id
		};
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/religion/asmaulhusna", apikeyAndLimit, async (req, res) => {
	try {
		asmaul = JSON.parse(fs.readFileSync(__path + "/data/islamic/AsmaulHusna.json"));
		res.json(asmaul)
	} catch (e) {
		res.json(loghandler.error);
	}
})
router.get("/religion/jadwalshalat", apikeyAndLimit, async (req, res) => {
	kota = req.query.query
	const date = moment.tz("Asia/Jakarta").format("yy-MM-DD");
	if (!kota) return res.json(loghandler.notquery)
	await getJson(`https://api.pray.zone/v2/times/day.json?city=${kota}&date=${date}`).then(({ results }) => {
		if (typeof results !== "object") return res.json(loghandler.error);
		const result = {
			date: date,
			lokasi: results.location.city + ", " + results.location.country,
			timezone: results.location.timezone,
			imsak: results.datetime[0].times.Imsak,
			sunrise: results.datetime[0].times.Sunrise,
			dzuhur: results.datetime[0].times.Dhuhr,
			ashar: results.datetime[0].times.Asr,
			maghrib: results.datetime[0].times.Maghrib,
			isya: results.datetime[0].times.Isha
		}
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
/*
 *@ SEARCHING
 */
router.get("/search/sfile", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	await tools.sfileSearch(query).then(result => {
		resSukses(res, result);
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	})
});
router.get("/search/apkmirror", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	await tools.apkmirror(query).then(result => {
		resSukses(res, result);
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	})
});
router.get("/search/nekopoi", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	await nekopoi.Search(query).then(result => {
		resSukses(res, result);
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	})
});
router.get("/search/nhentai", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	nhentai.Search(query).then(result => {
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/search/detectsong", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	const buffer = await getBuffer(url, { type: 'stream' });
	await tools.detectSong(buffer).then(result => {
		if (result.status && result.status == false) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(e => {
		res.json(loghandler.error);
		console.log(e);
	});
});
router.get("/search/tiktok", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	await tiktok.search(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(() => resError(res, `query ${query} tidak tersedia`));
});
router.get("/search/tiktokhashtag", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	await tiktok.getHashtagVideo(query).then(async result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(() => resError(res, `query ${query} tidak tersedia`));
});
router.get("/search/youtube", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	await youtube.search(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/search/sticker", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	sticker.search(query)
		.then(result => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result);
		}).catch(err => {
			console.log(err);
			res.json(loghandler.error);
		})
})
router.get("/search/brainly", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	await brainly(query).then(result => {
		if (!result.data) res.json(loghandler.error);
		resSukses(res, result.data);
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	})

});
router.get("/search/bacawp", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/https?:\/\/www\.wattpad\.com\//g)) return resError(res, "invalid url, masukkan url wattpad dengan benar");
	wattpad.read(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/search/storywp", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!url.match(/wattpad\.com\/story\/(?:[1-9][0-9]+)\-/g)) return resError(res, "invalid url, masukkan url wattpad dengan benar");
	wattpad.story(url).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/search/wattpad", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	wattpad.search(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/search/groupwa", apikeyAndLimit, async (req, res) => {
	if (!req.query.query) return res.json(loghandler.notquery)
	tools.linkwa(req.query.query)
		.then(result => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result);
		})
		.catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
})
router.get("/search/bokephub", apikeyAndLimit, async (req, res) => {
	q = req.query.query;
	if (!q) return res.json(loghandler.notquery)
	porn.bokepHub(q).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(err => res.json(loghandler.error))
});
router.get("/search/pornhub", apikeyAndLimit, async (req, res) => {
	q = req.query.query;
	if (!q) return res.json(loghandler.notquery)
	porn.pornhubSearch(q).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(err => {
		console.error(err);
		res.json(loghandler.error);
	});
})
router.get("/search/xnxx", apikeyAndLimit, async (req, res) => {
	if (!req.query.query) return res.json(loghandler.notquery)
	porn.xnxxSearch(req.query.query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(err => res.json(loghandler.error))
})
router.get("/search/xvideos", apikeyAndLimit, async (req, res) => {
	if (!req.query.query) return res.json(loghandler.notquery)
	porn.xvideosSearch(req.query.query)
		.then(result => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
})
router.get("/search/cersex", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	await cersex.search(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result)
	}).catch(() => resError(res, "query " + query + " tidak tersedia"))
})
router.get("/search/chordlagu", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	tools.chord(encodeURIComponent(query)).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(() => resError(res, `chord lagu ${query} tidak tersedia`));
})
router.get("/search/liriklagu", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	tools.musixmatch(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result)
	}).catch(e => resError(res, `lirik lagu ${query} tidak tersedia`))
})
router.get("/search/googleplay", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	var gplay = require("google-play-scraper");
	gplay.search({ term: query, throttle: 10 }).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result)
	}).catch(e => resError(res, `query ${query} tidak tersedia di play store`))
});
router.get("/search/dorking", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	await tools.dorking(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result)
	}).catch(e => resError(res, `query ${query} not found`))
});
router.get("/search/image", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	await tools.imageSearch(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(() => resError(res, `query ${query} not found`));
});
router.get("/search/image2", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	(async function (q) {
		await googlethis.image(q, { save: false }).then(result => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	})(query);
});
router.get("/search/reverseimg", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	(async function (link) {
		await googlethis.search(link, { ris: true }).then(result => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result.results);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	})(url);
});
router.get("/search/wikipedia", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	await tools.wikipedia(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(() => resError(res, `query ${query} tidak tersedia di wikipedia`));
})
router.get("/search/pinterest", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	tools.pinterest(query)
		.then(({ result }) => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result)
		}).catch(e => resError(res, `query ${query} tidak tersedia di pinterest`))
});
router.get("/search/recipes", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery)
	tools.recipes(query)
		.then(result => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result);
		}).catch(e => resError(res, `query ${query} tidak tersedia`));
})
/*
 *@ MOVIE
 */
router.get("/filmapik/search", apikeyAndLimit, async (req, res) => {
	query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	await filmApik.Search(query).then(result => {
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/filmapik/category", apikeyAndLimit, async (req, res) => {
	query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	await filmApik.Category(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/filmapik/years", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	await filmApik.Years(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/filmapik/country", apikeyAndLimit, async (req, res) => {
	const query = req.query.query;
	if (!query) return res.json(loghandler.notquery);
	await filmApik.Country(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/filmapik/trending", apikeyAndLimit, async (req, res) => {
	await filmApik.Trending().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/filmapik/rating", apikeyAndLimit, async (req, res) => {
	await filmApik.Rating().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/lk21/search", apikeyAndLimit, async (req, res) => {
	film = req.query.query
	if (!film) return res.json(loghandler.notquery)
	await Lk21.Search(film).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
})
router.get("/lk21/new", apikeyAndLimit, async (req, res) => {
	await Lk21.Latest().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/lk21/ftv", apikeyAndLimit, async (req, res) => {
	await Lk21.Ftv().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
})
router.get("/lk21/series", apikeyAndLimit, async (req, res) => {
	await Lk21.Series().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
})
router.get("/lk21/year", apikeyAndLimit, async (req, res) => {
	tahun = req.query.query
	if (!tahun) return res.json(loghandler.notquery)
	if (!Number(tahun)) return resError(res, "harap masukkan format number dengan benar");
	await Lk21.Years(tahun).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
})
router.get("/lk21/country", apikeyAndLimit, async (req, res) => {
	negara = req.query.query
	if (!negara) return res.json(loghandler.notquery)
	await Lk21.Country(negara.toLowerCase()).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
})
/*
 *@INFORMATION 
 */
router.get("/info/distance", apikeyAndLimit, async (req, res) => {
	const { from, to } = req.query;
	if (!from) return resError(res, "masukkan parameter from");
	if (!to) return resError(from, "masukkan parameter to");
	await tools.distance(from, to).then(result => {
		resSukses(res, result);
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	})
})
router.get("/info/topnews", apikeyAndLimit, async (req, res) => {
	(async function () {
		await googlethis.getTopNews().then(result => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result.headline_stories);
		}).catch(er => {
			console.log(er);
			res.json(loghandler.error);
		});
	})();
});
router.get("/info/trend/twitter", apikeyAndLimit, async (req, res) => {
	const country = req.query.country;
	if (!country) return resError(res, "masukkan parameter country");
	await information.trendtweet(country).then(({ message, updated_at, result }) => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, { message, updated_at, data: result });
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/info/trend/google", apikeyAndLimit, async (req, res) => {
	const country = req.query.country;
	if (!country) return resError(res, "masukkan parameter country");
	information.trendgoogle(country).then(({ message, updated_at, result }) => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, { message, updated_at, data: result });
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/info/trend/youtube", apikeyAndLimit, async (req, res) => {
	const q = req.query.country;
	if (!q) return resError(res, "masukkan parameter country");
	const str = q.substring(0, 1).toUpperCase();
	const str2 = q.substring(q.length, 1).toLowerCase();
	const url = `https://yt-trends.iamrohit.in/${str + str2}`
	information.trendyoutube(url).then(({ message, updated_at, result }) => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, { message, updated_at, data: result });
	}).catch(er => {
		console.log(er);
		res.json(loghandler.error);
	});
});
router.get("/info/trend/youtube/gaming", apikeyAndLimit, async (req, res) => {
	const q = req.query.country;
	if (!q) return resError(res, "masukkan parameter country");
	const str = q.substring(0, 1).toUpperCase();
	const str2 = q.substring(q.length, 1).toLowerCase();
	const url = `https://yt-trends.iamrohit.in/${str + str2}/gaming`
	information.trendyoutube(url).then(({ message, updated_at, result }) => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, { message, updated_at, data: result });
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/info/rsrujukan", apikeyAndLimit, async (req, res) => {
	await getJson(`https://dekontaminasi.com/api/id/covid19/hospitals`).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/info/covidindo", apikeyAndLimit, async (req, res) => {
	await getJson(`https://api.kawalcorona.com/indonesia/`).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		const results = {
			country: result[0].name,
			positif: result[0].positif,
			sembuh: result[0].sembuh,
			meninggal: result[0].meninggal,
			dirawat: result[0].dirawat
		}
		resSukses(res, results);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/info/covidworld", apikeyAndLimit, async (req, res) => {
	await getJson(`https://covid19-api-zhirrr.vercel.app/api/world`).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		const results = {
			data: "world",
			total_kasus: result.totalCases,
			sembuh: result.recovered,
			kematian: result.deaths,
			kasus_aktif: result.activeCases,
			kasus_tutup: result.closedCases,
			last_update: result.lastUpdate
		}
		resSukses(res, results);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/info/kbbi", apikeyAndLimit, async (req, res) => {
	query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	await getJson(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${query}`).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		const results = {
			lema: result.lema,
			arti: result.arti
		}
		resSukses(res, results);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/info/gempa", apikeyAndLimit, async (req, res) => {
	await information.infoGempa().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(() => res.json(loghandler.error))
});
router.get("/info/cuaca", apikeyAndLimit, async (req, res) => {
	const kota = req.query.query;
	if (!kota) return res.json(loghandler.notquery)
	await information.Cuaca(kota)
		.then((result) => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
});
/*
 *@ RANDOM
 */
router.get("/random/bokep", apikeyAndLimit, async (req, res) => {
	await cersex.bokep().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(e => {
		res.json(loghandler.error)
	})
});
router.get("/random/gore", apikeyAndLimit, async (req, res) => {
	tools.gore().then(async result => {
		await getBuffer(result).then(buff => {
			if (!Buffer.isBuffer(buff)) return res.json(loghandler.error);
			res.type("mp4").send(buff);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(err => res.json(loghandler.error))
});
router.get("/random/gore2", apikeyAndLimit, async (req, res) => {
	tools.randomGoore().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	})
})
router.get("/random/cerpen/:category", apikeyAndLimit, async (req, res) => {
	const category = req.params.category;
	if (!category) return resError(res, "masukkan params category");
	const InfoCategory = ["cinta", "horor", "sahabat", "lucu", "perjuangan", "jawa"];
	const isCategory = InfoCategory.includes(category);
	if (isCategory) {
		switch (category) {
			case "sahabat":
				await tools.cerpen("http://cerpenmu.com/category/cerpen-persahabatan").then(result => {
					if (!result instanceof Object) return res.json(loghandler.error);
					resSukses(res, result);
				}).catch(err => {
					res.json(loghandler.error);
					console.log(err);
				});
				break
			case "jawa":
				await tools.cerpen("http://cerpenmu.com/category/cerpen-jawa").then(result => {
					resSukses(res, result);
				}).catch(err => {
					console.log(err);
					res.json(loghandler.error);
				});
				break
			case "lucu":
				await tools.cerpen("http://cerpenmu.com/category/cerpen-lucu-humor").then(result => {
					if (!result instanceof Object) return res.json(loghandler.error);
					resSukses(res, result);
				}).catch(err => {
					res.json(loghandler.error);
					console.log(err);
				});
				break
			case "horor":
				await tools.cerpen("http://cerpenmu.com/category/cerpen-horor-hantu").then(result => {
					if (!result instanceof Object) return res.json(loghandler.error);
					resSukses(res, result);
				}).catch(err => {
					res.json(loghandler.error);
					console.log(err);
				});
				break
			case "perjuangan":
				await tools.cerpen("http://cerpenmu.com/category/cerpen-perjuangan").then(result => {
					if (!result instanceof Object) return res.json(loghandler.error);
					resSukses(res, result);
				}).catch(err => {
					res.json(loghandler.error);
					console.log(err);
				});
				break
			case "cinta":
				await tools.cerpen("http://cerpenmu.com/category/cerpen-cinta").then(result => {
					if (!result instanceof Object) return res.json(loghandler.error);
					resSukses(res, result);
				}).catch(err => {
					res.json(loghandler.error);
					console.log(err);
				});
				break
			default:
		}
	} else {
		resError(res, {
			message: "category " + category + " tidak ditemukan",
			info_category: InfoCategory.join(", ")
		})
	}
});

router.get("/random/cersex", apikeyAndLimit, async (req, res) => {
	await cersex.random().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		const { title, tanggal, thumb, cerita } = result
		resSukses(res, {
			title: title,
			date: tanggal,
			thumbnail: thumb,
			cerita: cerita
		});
	}).catch(err => {
		res.json(loghandler.error)
	});
});
router.get("/random/ppcouple", apikeyAndLimit, async (req, res) => {
	await getJson(`https://privatasw.herokuapp.com/couple`).then(({ result }) => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(() => resError(res, "mungkin sedang perbaikan"));
});
router.get("/random/darkjoke", apikeyAndLimit, async (req, res) => {
	const darkjokes = JSON.parse(fs.readFileSync(__path + "/data/drakjokes.json"));
	const randDark = darkjokes[Math.floor(Math.random() * darkjokes.length)];
	buff = await getBuffer(randDark.result)
	res.type("png").send(buff)
});
router.get("/random/meme", apikeyAndLimit, async (req, res) => {
	await getJson("https://api.zeks.me/api/memeindo?apikey=apivinz").then(async results => {
		buff = await getBuffer(results.result)
		res.type("png").send(buff)
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
/*
 *@anime
 */
router.get("/anime/kusonime", apikeyAndLimit, async (req, res) => {
	const query = req.query.query
	if (!query) return res.json(loghandler.notquery);
	await anime.kusonime(query).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});

router.get("/anime/loli", apikeyAndLimit, async (req, res) => {
	loli2 = JSON.parse(fs.readFileSync(__path + "/data/anime/loli.json"))
	randLoli = loli2[Math.floor(Math.random() * loli2.length)];
	await getBuffer(randLoli).then(buff => {
		res.type("png").send(buff);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});

router.get("/anime/manga", apikeyAndLimit, async (req, res) => {
	const { query } = req.query;
	if (!query) return res.json(loghandler.notquery);
	await anime.mangaSearch(query)
		.then(result => {
			if (!result instanceof Object) return res.json(loghandler.error);
			resSukses(res, result);
		})
		.catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
});
router.get("/anime/husbu", apikeyAndLimit, async (req, res) => {
	husbu = JSON.parse(fs.readFileSync(__path + "/data/anime/husbu.json"))
	randHusbu = husbu[Math.floor(Math.random() * husbu.length)];
	await getBuffer(randHusbu).then(buff => {
		res.type("png").send(buff);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/anime/neko", apikeyAndLimit, async (req, res) => {
	neko = JSON.parse(fs.readFileSync(__path + "/data/anime/neko.json"))
	randNeko = neko[Math.floor(Math.random() * neko.length)];
	await getBuffer(randNeko).then(buff => {
		res.type("png").send(buff);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/anime/waifu", apikeyAndLimit, async (req, res) => {
	waifu = JSON.parse(fs.readFileSync(__path + "/data/anime/waifu.json"))
	randWaifu = waifu[Math.floor(Math.random() * waifu.length)];
	await getBuffer(randWaifu).then(buff => {
		res.type("png").send(buff);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/anime/randomnhentai", apikeyAndLimit, async (req, res) => {
	nhentai.Random().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => { console.log(er); res.json(loghandler.error) });
});
router.get("/anime/codenhentai", apikeyAndLimit, async (req, res) => {
	const code = req.query.code;
	if (!code) return resError(res, "masukkan parameter code");
	nhentai.Code(code).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => { console.log(er); res.json(loghandler.error) });
});
router.get("/anime/latestnekopoi", apikeyAndLimit, async (req, res) => {
	await nekopoi.Latest().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/anime/getnekopoi", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	await nekopoi.Get(url, res).then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
/*
 *@FUNNY
 */
router.get("/fun/tebakbendera", apikeyAndLimit, async (req, res) => {
	bendera = JSON.parse(fs.readFileSync(__path + "/data/fun/tebakbendera.json"))
	randBendera = bendera[Math.floor(Math.random() * bendera.length)];
	res.json(randBendera)
});
router.get("/fun/math", apikeyAndLimit, async (req, res) => {
	await getJson(`https://salism3api.pythonanywhere.com/math/`).then(({ image, answer }) => {
		resSukses(res, {
			image: image,
			jawaban: answer
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/fun/caklontong", apikeyAndLimit, async (req, res) => {
	await games.cakLontong().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/fun/tebakgambar", apikeyAndLimit, async (req, res) => {
	await games.tebakGambar().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/fun/siapakah", apikeyAndLimit, async (req, res) => {
	await games.siapakah().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/fun/siapakah2", apikeyAndLimit, async (req, res) => {
	await games.siapakah2().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/fun/asahotak", apikeyAndLimit, async (req, res) => {
	await games.asahotak().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/fun/susunkata", apikeyAndLimit, async (req, res) => {
	await games.susunkata().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/fun/tekateki", apikeyAndLimit, async (req, res) => {
	await games.tekateki().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/fun/family100", apikeyAndLimit, async (req, res) => {
	await games.family100().then(result => {
		if (!result instanceof Object) return res.json(loghandler.error);
		resSukses(res, result);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/fun/simi", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	await getJson(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=id`).then(({ success }) => {
		resSukses(res, success);
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
/*
 *@CONVERTER
 */
router.get("/convert/towebp", apikeyAndLimit, async (req, res) => {
	if (!req.query.url) return res.json(loghandler.noturl)
	if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
	await ezgif.toWebp(req.query.url).then(async data => {
		await getBuffer(data).then(buff => {
			res.type("webp").send(buff);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(err => {
		res.json(loghandler.error)
	});
});
router.get("/convert/webp2mp4", apikeyAndLimit, async (req, res) => {
	if (!req.query.url) return res.json(loghandler.noturl);
	if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
	await ezgif.toMp4(req.query.url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("mp4").send(buff);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(err => {
		res.json(loghandler.error)
	})
})
router.get("/convert/reversevideo", apikeyAndLimit, async (req, res) => {
	if (!req.query.url) return res.json(loghandler.noturl);
	if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
	await ezgif.reverseVideo(req.query.url, true).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("mp4").send(buff);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(err => {
		res.json(loghandler.error)
	})
})

module.exports = router;
