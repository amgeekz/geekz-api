const {
	Router
} = require("express");
const {
	regexUrl,
	getBuffer,
	resError,
	loghandler
} = require("../library/functions");
const { Ephoto } = require("./../scrapping/ephoto");
const ephoto = new Ephoto();
const apikeyAndLimit = require("../library/apikeyAndLimit");
router = Router();
const creator = "Farhannnnn";


router.get("/artistic", apikeyAndLimit, async (req, res) => {
	const { url, text } = req.query;
	if (!url || !text) return resError(res, "masukkan parameter url & text");
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/create-3d-artistic-water-photo-frames-online-681.html", url, [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
router.get("/diary", apikeyAndLimit, async (req, res) => {
	const { url, text } = req.query;
	if (!url || !text) return resError(res, "masukkan parameter url & text");
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/diary-and-smartphone-photo-frame-571.html", url, [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
router.get("/cyberpunk", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/cyberpunk-city-photo-frame-533.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
router.get("/billboard", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/create-outdoor-billboard-photo-frame-702.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
router.get("/fire", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/fire-animated-photo-effects-137.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("gif").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
router.get("/rain", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/rain-glass-door-gifs-photo-frames-431.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("gif").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
router.get("/cat", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/collage-a-cat-with-super-cool-glasses-699.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
router.get("/ring", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/ring-of-fire-photo-frame-370.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
router.get("/collage", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/collage-photo-on-smartphone-frame-on-snow-background-663.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
});
router.get("/sad", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/create-video-sad-mood-with-smartphone-622.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("mp4").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	});
})
router.get("/cinemagraph", apikeyAndLimit, async (req, res) => {
	const url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/cinemagraph-of-vintage-television-537.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("mp4").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	})
})
router.get("/diaryframe", apikeyAndLimit, async (req, res) => {
	const { url, text } = req.query;
	if (!text) return res.json(loghandler.nottext);
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	ephoto.image(res, "https://en.ephoto360.com/create-diary-photo-frame-online-525.html", url, [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(err => {
		console.log(err);
		res.json(loghandler.error);
	})
})
router.get("/wood", apikeyAndLimit, async (req, res) => {
	const { text, text2 } = req.query;
	if (!text || !text2) return resError(res, "masukkan parameter text & text2");
	await ephoto.text(res, "https://en.ephoto360.com/create-3d-wood-text-effects-online-free-705.html", [text, text2]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/television", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return resError(res, "masukkan parameter text");
	await ephoto.text(res, "https://en.ephoto360.com/write-text-on-vintage-television-online-670.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/glasses", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return resError(res, "masukkan parameter text");
	await ephoto.text(res, "https://en.ephoto360.com/write-text-on-wet-glass-online-589.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/blackpink", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return resError(res, "masukkan parameter text");
	await ephoto.text(res, "https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/neonbp", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return resError(res, "masukkan parameter text");
	await ephoto.text(res, "https://en.ephoto360.com/create-a-blackpink-neon-logo-text-effect-online-710.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/juventus", apikeyAndLimit, async (req, res) => {
	const { text, number } = req.query
	if (!number || !Number(number)) return resError(res, "masukkan parameter no & parameter no berupa number");
	if (!text) return resError(res, "masukkan parameter text");
	await ephoto.text(res, "https://en.ephoto360.com/create-juventus-shirt-effect-536.html", [text, number]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/coverpubg", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/create-the-cover-game-playerunknown-s-battlegrounds-401.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/greenbrush", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/green-brush-text-effect-typography-maker-online-153.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/eraser", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/dragonfire", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/dragon-fire-text-effect-111.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/incandescent", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/text-effects-incandescent-bulbs-219.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/typography", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/dark-green-typography-online-359.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/letters", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/write-letters-on-the-leaves-248.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/cloth", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/text-on-cloth-effect-62.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/graffiti", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/text-graffiti-3d-208.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/metals", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/metal-star-text-online-109.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/blueneon", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/blue-neon-text-effect-117.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/typography2", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/make-typography-text-online-338.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/nightstars", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/stars-night-online-84.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/cloud", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/cloud-text-effect-139.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/caper", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/caper-cut-effect-184.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/horror", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/writing-horror-text-online-266.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/sunlight", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/sunlight-shadow-text-204.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/cake", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/birthday-cake-96.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/pig", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/lovely-cute-3d-text-effect-with-pig-397.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/hallowen", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/halloween-fire-text-online-83.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/leafgraphy", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/typography-online-leaf-autumn-358.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/water", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/create-water-effect-text-online-295.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/writestatus", apikeyAndLimit, async (req, res) => {
	const { text, text2 } = req.query
	if (!text || !text2) return resError(res, "masukkan parameter text & text2");
	await ephoto.text(res, "https://en.ephoto360.com/write-status-quotes-on-photo-online-free-455.html", [text, text2]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/scholes", apikeyAndLimit, async (req, res) => {
	const { text, number } = req.query;
	if (!text || !Number(number)) return resError(res, "masukkan parameter text & number, parameter number berupa angka");
	await ephoto.text(res, "https://en.ephoto360.com/paul-scholes-shirt-foot-ball-335.html", [text, number]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/heated", apikeyAndLimit, async (req, res) => {
	const { text, text2 } = req.query;
	if (!text || !text2) return resError(res, "masukkan parameter text & text2");
	await ephoto.text(res, "https://en.ephoto360.com/heated-steel-lettering-effect-65.html", [text, text2]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/buoys", apikeyAndLimit, async (req, res) => {
	const { text, text2 } = req.query;
	if (!text || !text2) return resError(res, "masukkan parameter text & text2");
	await ephoto.text(res, "https://en.ephoto360.com/write-letters-on-life-buoys-484.html", [text, text2]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/quotestatus", apikeyAndLimit, async (req, res) => {
	const { text, text2 } = req.query;
	if (!text || !text2) return resError(res, "masukkan parameter text & text2");
	await ephoto.text(res, "https://en.ephoto360.com/create-typography-status-quotes-images-online-for-free-452.html", [text, text2]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/neonblue", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/create-light-effects-green-neon-online-429.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/foggy", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/foggy-rainy-text-effect-75.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/crank", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/animate-general-exam-crank-149.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("gif").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/puppy", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/create-puppy-cute-animated-online-478.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("gif").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/pubgavatar", apikeyAndLimit, async (req, res) => {
	text = req.query.text;
	if (!text) return res.json(loghandler.nottext)
	await ephoto.text(res, "https://en.ephoto360.com/create-pubg-style-glitch-video-avatar-554.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("mp4").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
})
router.get("/adventure", apikeyAndLimit, async (req, res) => {
	const { url, text, text2 } = req.query;
	if (!url) return res.json(loghandler.noturl)
	if (!text) return res.json(loghandler.nottext)
	if (!text2) return res.json(loghandler.nottext2)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/brush-travel-adventure-social-photo-frame-605.html", url, [text, text2]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/vhs", apikeyAndLimit, async (req, res) => {
	url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/vhs-glitch-photo-effect-online-editing-510.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
})
router.get("/memories", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/pencil-photo-travel-memories-367.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
})
router.get("/notebook", apikeyAndLimit, async (req, res) => {
	const { url, text, text2 } = req.query;
	if (!url) return res.json(loghandler.noturl)
	if (!text) return res.json(loghandler.nottext)
	if (!text2) return res.json(loghandler.nottext2)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/make-notebook-music-effect-346.html", url, [text, text2]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
})
router.get("/glazing", apikeyAndLimit, async (req, res) => {
	const { url, text } = req.query;
	if (!url) return res.json(loghandler.noturl)
	if (!text) return res.json(loghandler.nottext)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/create-a-rain-glazing-frame-effect-284.html", url, [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
})
router.get("/flower", apikeyAndLimit, async (req, res) => {
	url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/fall-flower-photo-effects-130.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
})
router.get("/heart", apikeyAndLimit, async (req, res) => {
	url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/fire-heart-123.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
})
router.get("/smoke", apikeyAndLimit, async (req, res) => {
	url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/smoke-photo-effects-119.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
})
router.get("/handlefire", apikeyAndLimit, async (req, res) => {
	url = req.query.url;
	if (!url) return res.json(loghandler.noturl)
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/fire-photo-handle-effect-396.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
})
router.get("/spectrum", apikeyAndLimit, async (req, res) => {
	url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/spectrum-audio-photo-frame-online-570.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
})
router.get("/painting", apikeyAndLimit, async (req, res) => {
	url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/create-painting-effect-on-stone-background-online-722.html", url).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/tiger", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	await ephoto.text(res, "https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("mp4").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/wposter", apikeyAndLimit, async (req, res) => {
	const { url, text, text2 } = req.query;
	if (!url) return res.json(loghandler.noturl);
	if (!text) return res.json(loghandler.nottext);
	if (!text2) return res.json(loghandler.nottext2);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await ephoto.image(res, "https://en.ephoto360.com/create-a-wanted-poster-for-one-piece-live-action-724.html", url, [text, text2]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/american", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	await ephoto.text(res, "https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/pencil", apikeyAndLimit, async (req, res) => {
	const { text, text2 } = req.query;
	if (!text) return res.json(loghandler.nottext);
	if (!text2) return res.json(loghandler.nottext2);
	await ephoto.radio_text(res, "https://en.ephoto360.com/create-a-pencil-sketch-logo-online-719.html", [text, text2]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/arrow", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	await ephoto.radio_text(res, "https://en.ephoto360.com/arrow-tattoo-effect-with-signature-712.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/arrow2", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	await ephoto.radio_text(res, "https://en.ephoto360.com/create-multicolored-signature-attachment-arrow-effect-714.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/anonymous", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	await ephoto.radio_text(res, "https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/aov", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	await ephoto.radio_text(res, "https://en.ephoto360.com/create-beautiful-shimmering-aov-wallpapers-full-hd-for-mobile-643.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/warface", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	await ephoto.radio_text(res, "https://en.ephoto360.com/create-a-cover-of-warface-online-243.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});
router.get("/ml", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	await ephoto.radio_text(res, "https://en.ephoto360.com/make-mobile-legends-wallpaper-full-hd-for-mobile-454.html", [text]).then(async result => {
		await getBuffer(result).then(buff => {
			res.type("png").send(buff);
		}).catch(() => res.json(loghandler.error));
	}).catch(() => res.json(loghandler.error));
});

module.exports = router;