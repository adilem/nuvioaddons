/**
 * patronFilmEkseni - Built from src/patronFilmEkseni/
 * Generated: 2026-04-29T14:21:48.872Z
 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/patronFilmEkseni/http.js
var MAIN_URL = "https://filmekseni.cc";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:149.0) Gecko/20100101 Firefox/149.0",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8"
};
function fetchText(_0) {
  return __async(this, arguments, function* (url, extraHeaders = {}) {
    const res = yield fetch(url, {
      headers: __spreadValues(__spreadValues({}, HEADERS), extraHeaders),
      redirect: "follow"
    });
    if (!res.ok)
      throw new Error(`HTTP ${res.status} \u2192 ${url}`);
    return yield res.text();
  });
}
function postText(_0, _1) {
  return __async(this, arguments, function* (url, body, extraHeaders = {}) {
    const res = yield fetch(url, {
      method: "POST",
      headers: __spreadValues(__spreadValues({}, HEADERS), extraHeaders),
      body,
      redirect: "follow"
    });
    if (!res.ok)
      throw new Error(`HTTP ${res.status} \u2192 ${url}`);
    return yield res.text();
  });
}
function fixUrl(url) {
  if (!url)
    return "";
  if (url.startsWith("http"))
    return url;
  if (url.startsWith("//"))
    return "https:" + url;
  if (url.startsWith("/"))
    return MAIN_URL + url;
  return MAIN_URL + "/" + url;
}

// src/patronFilmEkseni/tmdb.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
var PROVIDER_TAG = "[patronFilmEkseni]";
function getTmdbTitleFromHtml(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://www.themoviedb.org/${type}/${tmdbId}?language=tr-TR`;
      const response = yield fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:149.0) Gecko/20100101 Firefox/149.0",
          "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const html = yield response.text();
      let trTitle = "";
      const ogMatch = html.match(/<meta property="og:title" content="([^"]+)">/);
      if (ogMatch) {
        trTitle = ogMatch[1];
      } else {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/);
        if (titleMatch) {
          trTitle = titleMatch[1].split("(")[0].split("\u2014")[0].trim();
        }
      }
      let origTitle = trTitle;
      const origMatch = html.match(/<h3 class="caption" dir="auto">([^<]+)<\/h3>/) || html.match(/<strong class="original_title">([^<]+)<\/strong>/);
      if (origMatch) {
        const cleaned = origMatch[1].replace("Orijinal Ad\u0131", "").trim();
        if (cleaned.length > 0)
          origTitle = cleaned;
      }
      if (!trTitle)
        return null;
      console.log(`${PROVIDER_TAG} [HTML] Ba\u015Fl\u0131k bulundu: ${trTitle}`);
      return { trTitle, origTitle };
    } catch (e) {
      console.warn(`${PROVIDER_TAG} [HTML] Scraping ba\u015Far\u0131s\u0131z: ${e.message}`);
      return null;
    }
  });
}
function getTmdbTitleFromApi(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${TMDB_API_KEY}&language=tr-TR`;
      const response = yield fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = yield response.json();
      const trTitle = data.title || data.name || "";
      const origTitle = data.original_title || data.original_name || trTitle;
      if (!trTitle)
        return null;
      console.log(`${PROVIDER_TAG} [API] Ba\u015Fl\u0131k bulundu: ${trTitle}`);
      return { trTitle, origTitle };
    } catch (e) {
      console.warn(`${PROVIDER_TAG} [API] REST API ba\u015Far\u0131s\u0131z: ${e.message}`);
      return null;
    }
  });
}
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    const htmlResult = yield getTmdbTitleFromHtml(tmdbId, mediaType);
    if (htmlResult)
      return htmlResult;
    console.log(`${PROVIDER_TAG} HTML scraping ba\u015Far\u0131s\u0131z, TMDB REST API deneniyor...`);
    const apiResult = yield getTmdbTitleFromApi(tmdbId, mediaType);
    if (apiResult)
      return apiResult;
    console.error(`${PROVIDER_TAG} Her iki y\xF6ntem de ba\u015Far\u0131s\u0131z oldu: TMDB ID=${tmdbId}`);
    return { trTitle: "", origTitle: "" };
  });
}

// src/patronFilmEkseni/extractor.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));
var VIDEO_HOST = "https://fmdzihoilrvjfvcvvhlbwlkypjsmemvyfxvppedcdqszdxotre.firgunedavay.shop";
function searchMovie(query) {
  return __async(this, null, function* () {
    const url = `${MAIN_URL}/search/`;
    const body = `query=${encodeURIComponent(query)}`;
    const html = yield postText(url, body, {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Referer": MAIN_URL
    });
    let results = [];
    try {
      const json = JSON.parse(html);
      if (json && json.result && Array.isArray(json.result)) {
        for (const item of json.result) {
          if (item.title && item.slug) {
            results.push({ title: item.title, href: `${MAIN_URL}/${item.slug}` });
          }
        }
      }
    } catch (e) {
    }
    if (results.length === 0)
      return null;
    const queryLower = query.toLowerCase();
    let exact = results.find((r) => r.title.toLowerCase() === queryLower);
    if (!exact)
      exact = results.find((r) => r.title.toLowerCase().startsWith(queryLower));
    if (!exact)
      exact = results.find((r) => r.title.toLowerCase().includes(queryLower));
    return exact ? exact.href : results[0].href;
  });
}
function extractFromMoviePage(movieUrl) {
  return __async(this, null, function* () {
    const html = yield fetchText(movieUrl);
    const $ = import_cheerio_without_node_native.default.load(html);
    const streams = [];
    const addedUrls = /* @__PURE__ */ new Set();
    const iframes = [];
    $("div.card-video iframe").each((i, el) => {
      const src = $(el).attr("data-src") || $(el).attr("src");
      if (src) {
        iframes.push({ url: fixUrl(src), title: `Alternatif ${i + 1}` });
      }
    });
    $("div.tab-content a.nav-link").each((i, el) => {
      const href = $(el).attr("href");
      if (href) {
        iframes.push({ url: fixUrl(href), title: `Sunucu ${i + 1}` });
      }
    });
    for (const item of iframes) {
      try {
        const embedUrl = item.url;
        if (embedUrl.includes("eksenload") || embedUrl.includes("vidload.top") || embedUrl.includes("firgunedavay.shop")) {
          const streamResults = yield parseEksenLoad(embedUrl, movieUrl);
          for (const s of streamResults) {
            if (!addedUrls.has(s.url)) {
              addedUrls.add(s.url);
              streams.push(s);
            }
          }
        } else if (embedUrl.includes(".m3u8") || embedUrl.includes(".mp4")) {
          if (!addedUrls.has(embedUrl)) {
            addedUrls.add(embedUrl);
            streams.push({
              name: "patronFilmEkseni",
              title: item.title,
              url: embedUrl,
              quality: "Auto",
              headers: { Referer: movieUrl }
            });
          }
        }
      } catch (err) {
        console.error(`[patronFilmEkseni] Embed parse hatas\u0131: ${err.message}`);
      }
    }
    return streams;
  });
}
function parseEksenLoad(embedUrl, referer) {
  return __async(this, null, function* () {
    const streams = [];
    try {
      const html = yield fetchText(embedUrl, { Referer: referer });
      const $ = import_cheerio_without_node_native.default.load(html);
      let playerScript = "";
      $("script").each((i, el) => {
        const data = $(el).html() || "";
        if (data.includes("jwplayer") && data.includes("setup")) {
          playerScript = data;
          return false;
        }
      });
      if (!playerScript)
        return streams;
      const fileMatches = [...playerScript.matchAll(/file\s*:\s*['"]([^'"]+)['"]/g)];
      for (const match of fileMatches) {
        const rawPath = match[1];
        if (!rawPath)
          continue;
        if (rawPath.endsWith(".jpg") || rawPath.endsWith(".png"))
          continue;
        let finalUrl;
        if (rawPath.startsWith("http")) {
          finalUrl = rawPath;
        } else if (rawPath.startsWith("/")) {
          finalUrl = VIDEO_HOST + rawPath;
        } else {
          finalUrl = VIDEO_HOST + "/" + rawPath;
        }
        if (finalUrl.includes("m3u8")) {
          streams.push({
            name: "patronFilmEkseni",
            title: "EksenLoad m3u8",
            url: finalUrl,
            quality: "Auto",
            headers: {
              Referer: referer,
              Origin: "null",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:149.0) Gecko/20100101 Firefox/149.0",
              Accept: "*/*"
            }
          });
        } else if (finalUrl.includes(".vtt") || finalUrl.includes(".srt")) {
        } else {
          streams.push({
            name: "patronFilmEkseni",
            title: "EksenLoad Video",
            url: finalUrl,
            quality: "Auto",
            headers: {
              Referer: referer,
              Origin: "null",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:149.0) Gecko/20100101 Firefox/149.0",
              Accept: "*/*"
            }
          });
        }
      }
    } catch (err) {
      console.error(`[patronFilmEkseni] EksenLoad parse hatas\u0131: ${err.message}`);
    }
    return streams;
  });
}
function extractStreams(tmdbId, mediaType) {
  return __async(this, null, function* () {
    if (mediaType !== "movie")
      return [];
    const { trTitle, origTitle } = yield getTmdbTitle(tmdbId, mediaType);
    console.log(`[patronFilmEkseni] TMDB: ${tmdbId} | Ba\u015Fl\u0131k: ${trTitle}`);
    if (!trTitle && !origTitle)
      return [];
    let movieUrl = null;
    if (trTitle)
      movieUrl = yield searchMovie(trTitle);
    if (!movieUrl && origTitle && origTitle !== trTitle)
      movieUrl = yield searchMovie(origTitle);
    if (!movieUrl) {
      console.warn(`[patronFilmEkseni] Site'de bulunamad\u0131: ${trTitle || origTitle}`);
      return [];
    }
    console.log(`[patronFilmEkseni] Sayfa: ${movieUrl}`);
    const streams = yield extractFromMoviePage(movieUrl);
    console.log(`[patronFilmEkseni] Stream say\u0131s\u0131: ${streams.length}`);
    return streams;
  });
}

// src/patronFilmEkseni/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`[patronFilmEkseni] \u0130stek: ${mediaType} | TMDB: ${tmdbId}`);
      if (mediaType !== "movie")
        return [];
      const streams = yield extractStreams(tmdbId, mediaType);
      return streams;
    } catch (error) {
      console.error(`[patronFilmEkseni] Hata: ${error.message}`);
      return [];
    }
  });
}
module.exports = { getStreams };
