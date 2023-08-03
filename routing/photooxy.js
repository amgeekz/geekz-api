const {
	Router
} = require("express");
const {
	fromBuffer
} = require("file-type");
const {
	regexUrl,
	getBuffer,
	loghandler,
} = require("../library/functions");
const { Photooxy } = require("./../scrapping/photooxy");
const photooxy = new Photooxy();
const apikeyAndLimit = require("../library/apikeyAndLimit");
router = Router();

router.get("/pubg", apikeyAndLimit, async (req, res) => {
	const { text, text2 } = req.query;
	if (!text) return res.json(loghandler.nottext);
	if (!text2) return res.json(loghandler.nottext2);
	photooxy.text("https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html", [text, text2])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/slidetext", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.radio("https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("mp4").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/gravity", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/banner-cover/graffiti-text-cover-222.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/rainbow", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/oceansea", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/creating-an-underwater-ocean-363.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});

router.get("/romantic", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});

router.get("/shadow", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/smoke", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/burnpaper", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/naruto", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/lovemessage", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/grass", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/glitch", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	const text2 = req.query.text2;
	if (!text) return res.json(loghandler.nottext)
	if (!text2) return res.json(loghandler.nottext2);
	photooxy.text("https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html", [text, text2])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/doubleheart", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/love-text-effect-372.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/coffecup", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/lovetext", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/love-text-effect-372.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu);
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/butterfly", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu)
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/coffee", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu)
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/quotewood", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/write-art-quote-on-wood-heart-370.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu)
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});
router.get("/flaming", apikeyAndLimit, async (req, res) => {
	const text = req.query.text;
	if (!text) return res.json(loghandler.nottext);
	photooxy.text("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text])
		.then(async anu => {
			const buffer = await getBuffer(anu)
			res.type("png").send(buffer);
		})
		.catch((error) => {
			res.json(loghandler.error);
		});
});

//images URLs
router.get("/exposure", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/art-effects/make-a-trendy-double-exposure-with-forest-194.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/flame", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/other-design/flame-up-your-photo-on-a-paper-399.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/frame", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/other-design/loving-memory-picture-frame-397.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/memory", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/art-effects/memory-photo-frame-393.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/nature", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/photo-frames/photo-frame-in-nature-379.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/ripped", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/christmas/shimmering-note-paper-267.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/tearing", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/photo-frames/paper-tearing-effect-311.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/iphone", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/art-effects/put-your-picture-on-the-iphone-wallpapers-216.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/anaglyph", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/art-effects/create-3d-anaglyph-photo-effect-203.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/mirrors", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/art-effects/broken-mirrors-effect-299.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/shattered", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/art-effects/broke-a-card-298.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/burning", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/burning-effect/photo-burns-on-hands-281.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/place", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/art-effects/place-photo-on-note-cover-225.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});
router.get("/toilet", apikeyAndLimit, async (req, res) => {
	const url = req.query.url;
	if (!url) return res.json(loghandler.noturl);
	if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
	await photooxy.image("https://photooxy.com/art-effects/put-your-photo-down-the-toilet-224.html", url).then(async response => {
		await getBuffer(response).then(buffer => {
			res.type("png").send(buffer);
		}).catch(er => {
			res.json(loghandler.error);
			console.log(er);
		});
	}).catch(er => {
		res.json(loghandler.error);
		console.log(er);
	});
});

module.exports = router;