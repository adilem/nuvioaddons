/**
 * patronSinewix - Full Catalog & Stream Provider
 * Generated & Enhanced: 2026-06-24
 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: true, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => { try { step(generator.next(value)); } catch (e) { reject(e); } };
    var rejected = (value) => { try { step(generator.throw(value)); } catch (e) { reject(e); } };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

var patronSinewix_exports = {};
__export(patronSinewix_exports, {
  getMainPage: () => getMainPage,
  getStreams: () => getStreams,
  search: () => search,
  catalogHandler: () => catalogHandler,
  metaHandler: () => metaHandler
});
module.exports = __toCommonJS(patronSinewix_exports);

var BASE_URL = "https://ydfvfdizipanel.ru";
var API_TOKEN = "9iQNC5HQwPlaFuJDkhncJ5XTJ8feGXOJatAA"; 

// HTTP TOOLKIT'TEN ALINAN EN GÜNCEL VE CANLI GÜVENLİK PARAMETRELERİ
var HEADERS = {
  "User-Agent": "EasyPlex (Android 9; SM-S9160; samsung star2qltechn; en)",
  "Accept": "application/json",
  "hash256": "f4d4bc98a3fc4600e7f2c2bab7533f1f03d8a70ff03c256bb11dc57050536bd0",
  "packagename": "com.sinewix",
  "signature": "308202c3308201aba0030201020204075cec01300d06092a864886f70d01010b050030123110300e0603550403130753696e65776978301e170d3231303932313233333334395a170d3436303931353233333334395a30123110300e0603550403130753696e6577697830820122300d06092a864886f70d01010105000382010f003082010a0282010100b0a2a1bc5c3f16f19c3b2456cfd0a6128ced9f5e2e2c4cca1a100e17b07b86256258f372e76a95a17e9e4a1c048e364835723a95e8ef6d5bdfb5694b50277c65a64f7b012fdf164e5dc93629561f6ca29b7dc82ebb3d6f3c8e8fc6795847fe331ad4a13ed6c059a83804"
};

function fetchJSON(url) {
  return __async(this, null, function* () {
    try {
      const response = yield fetch(url, { headers: HEADERS });
      if (!response.ok) return null;
      return yield response.json();
    } catch (e) {
      return null;
    }
  });
}

// ARKA PLANDA IFRAME PLAYER LINKLERINI (.MP4/.M3U8) FORMUNA ÇEVİREN PARSER
function universalExtractor(embedUrl) {
  return __async(this, null, function* () {
    try {
      const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
      const res = yield fetch(embedUrl, { headers: { "User-Agent": ua } });
      if (!res.ok) return null;
      const html = yield res.text();

      if (embedUrl.includes("vidmoly")) {
        const fileMatch = html.match(/file\s*:\s*["']([^"']+\.m3u8[^"']*)["']/i);
        if (fileMatch) return { url: fileMatch[1], format: "m3u8" };
      }
      if (embedUrl.includes("vidoza")) {
        const fileMatch = html.match(/src\s*:\s*["']([^"']+\.mp4[^"']*)["']/i);
        if (fileMatch) return { url: fileMatch[1], format: "mp4" };
      }
      const genericMatch = html.match(/["'](https?:\/\/[^"']+\.(?:m3u8|mp4)[^"']*)["']/i);
      if (genericMatch) {
        return { url: genericMatch[1], format: genericMatch[1].includes("m3u8") ? "m3u8" : "mp4" };
      }
      return null;
    } catch (e) {
      return null;
    }
  });
}

// TMDB ID ALTYAPISI
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const apiKey = "500330721680edb6d5f7f12ba7cd9023";
      const apiUrl = `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${apiKey}&language=tr-TR`;
      const data = yield fetchJSON(apiUrl);
      if (data) {
        return {
          trTitle: data.title || data.name || "",
          origTitle: data.original_title || data.original_name || "",
          shortTitle: (data.title || data.name || "").split(":")[0].trim()
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  });
}

function searchContent(query) {
  return __async(this, null, function* () {
    const url = `${BASE_URL}/public/api/search/${encodeURIComponent(query)}/${API_TOKEN}`;
    const data = yield fetchJSON(url);
    return data.search || [];
  });
}

// KATALOG YÖNETİCİSİ (NUVIO ANA EKRANI İÇİN)
function catalogHandler(catalogId, type, page = 1) {
  return __async(this, null, function* () {
    let endpoint = "movies/latest";
    if (catalogId === "sw-latest-series") endpoint = "series/latest";
    if (catalogId === "sw-latest-animes") endpoint = "animes/latest";

    const url = `${BASE_URL}/public/api/${endpoint}/${API_TOKEN}`;
    const data = yield fetchJSON(url);
    const items = data ? (data.movies || data.series || data.animes || []) : [];

    return items.map(item => ({
      id: `sinewix:${item.id}:${type}`,
      title: item.name || item.title,
      type: type,
      poster: item.poster_path,
      description: item.overview || ""
    }));
  });
}

// META DETAY YÖNETİCİSİ
function metaHandler(id) {
  return __async(this, null, function* () {
    const parts = id.split(":");
    const sinewixId = parts[1];
    const type = parts[2] === "movie" ? "media" : "series";
    const method = parts[2] === "movie" ? "detail" : "show";

    const url = `${BASE_URL}/public/api/${type}/${method}/${sinewixId}/${API_TOKEN}`;
    const data = yield fetchJSON(url);
    if (!data) return null;

    return {
      id: id,
      title: data.name || data.title,
      type: parts[2],
      poster: data.poster_path,
      background: data.backdrop_path,
      description: data.overview || ""
    };
  });
}

// EN GELİŞMİŞ STREAM (OYNATMA LİNKİ) MOTORU
function getStreams(id, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      let sinewixId = null;
      let type = mediaType === "movie" ? "movie" : "tv";

      // 1. Eğer Nuvio Kataloğundan tıklandıysa id "sinewix:43506:movie" formatındadır
      if (id.startsWith("sinewix:")) {
        const parts = id.split(":");
        sinewixId = parts[1];
      } else if (id.startsWith("tt")) {
        // 2. Eğer Cinemeta (IMDB) üzerinden tıklandıysa akıllı arama yapıp eşleştiriyoruz
        const tmdbData = yield getTmdbTitle(id, mediaType);
        if (tmdbData) {
          const results = yield searchContent(tmdbData.trTitle || tmdbData.origTitle);
          const match = results.find(item => item.type === (mediaType === "movie" ? "movie" : "serie"));
          if (match) sinewixId = match.id;
        }
      }

      if (!sinewixId) return [];

      const typePath = mediaType === "movie" ? "media" : "series";
      const method = mediaType === "movie" ? "detail" : "show";
      const detailUrl = `${BASE_URL}/public/api/${typePath}/${method}/${sinewixId}/${API_TOKEN}`;
      
      const detailData = yield fetchJSON(detailUrl);
      if (!detailData) return [];

      const streams = [];
      let rawVideos = [];

      if (mediaType === "movie") {
        rawVideos = detailData.videos || [];
      } else {
        const seasons = detailData.seasons || [];
        const targetSeason = seasons.find(s => s.season_number == season);
        if (targetSeason && targetSeason.episodes) {
          const targetEpisode = targetSeason.episodes.find(e => e.episode_number == episode);
          if (targetEpisode) rawVideos = targetEpisode.videos || [];
        }
      }

      for (const v of rawVideos) {
        const embedUrl = v.link || v.embed;
        if (!embedUrl || embedUrl === "0") continue;

        if (/\.(m3u8|mp4|mkv)/i.test(embedUrl)) {
          streams.push({
            name: `SineWix [${v.server || "Direct"}]`,
            title: `${v.lang === "tr" ? "Türkçe Dublaj" : "Türkçe Altyazılı"} - Doğrudan Link`,
            url: embedUrl,
            quality: "1080p",
            headers: HEADERS
          });
          continue;
        }

        const extracted = yield universalExtractor(embedUrl);
        if (extracted && extracted.url) {
          streams.push({
            name: `SineWix [${v.server || "Premium"}]`,
            title: `${v.lang === "tr" ? "Türkçe Dublaj" : "Türkçe Altyazılı"} (${extracted.format.toUpperCase()})`,
            url: extracted.url,
            quality: "Auto",
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "Referer": embedUrl }
          });
        }
      }

      return streams;
    } catch (error) {
      return [];
    }
  });
}

function search(query) {
  return __async(this, null, function* () {
    try {
      const results = yield searchContent(query);
      return results.map((item) => ({
        id: `sinewix:${item.id}:${item.type === "serie" ? "series" : "movie"}`,
        title: item.name || item.title,
        type: item.type === "serie" ? "series" : "movie",
        poster: item.poster_path,
        year: item.release_date ? item.release_date.split("-")[0] : ""
      }));
    } catch (error) {
      return [];
    }
  });
}

function getMainPage() {
  return __async(this, null, function* () {
    return [];
  });
}
