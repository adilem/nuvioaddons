/**
 * patronDiziyou - Enhanced with Python Auto-Pilot Logic
 */
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/patronDiziyou/index.js
var patronDiziyou_exports = {};
__export(patronDiziyou_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(patronDiziyou_exports);

// src/patronDiziyou/http.js
var PROVIDER_TAG = "[Diziyou]";
var FALLBACK_URL = "https://www.diziyou.one";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8"
};
function getDiziyouBaseUrl() {
  return __async(this, null, function* () {
    try {
      const githubUrl = "https://raw.githubusercontent.com/patr0nq/veriler/refs/heads/main/siteurl.txt";
      const res = yield fetch(githubUrl);
      if (!res.ok)
        throw new Error(`HTTP ${res.status}`);
      const text = yield res.text();
      const lines = text.split("\n");
      for (let line of lines) {
        line = line.trim();
        if (line.startsWith("diziyou:")) {
          let url = line.substring("diziyou:".length).trim();
          if (url.endsWith("/")) {
            url = url.slice(0, -1);
          }
          console.log(`${PROVIDER_TAG} Aktif domain (Github): ${url}`);
          return url;
        }
      }
    } catch (e) {
      console.error(`${PROVIDER_TAG} Github'dan domain çekilemedi: ${e.message}`);
    }
    console.log(`${PROVIDER_TAG} Aktif domain (Fallback): ${FALLBACK_URL}`);
    return FALLBACK_URL;
  });
}
function fixUrl(url, baseUrl) {
  if (!url)
    return "";
  if (url.startsWith("http")) {
    return url;
  } else if (url.startsWith("//")) {
    return `https:${url}`;
  } else {
    const cleanBase = baseUrl.replace(/\/$/, "");
    const cleanUrl = url.replace(/^\//, "");
    return `${cleanBase}/${cleanUrl}`;
  }
}
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    try {
      const response = yield fetch(url, __spreadProps(__spreadValues({}, options), {
        headers: __spreadValues(__spreadValues({}, HEADERS), options.headers)
      }));
      if (!response.ok) {
        if (response.status === 404)
          return "";
        throw new Error(`HTTP ${response.status}`);
      }
      return yield response.text();
    } catch (e) {
      console.error(`${PROVIDER_TAG} fetchText hatası (${url}): ${e.message}`);
      return "";
    }
  });
}

// src/patronDiziyou/tmdb.js
var TMDB_API_KEY = "500330721680edb6d5f7f12ba7cd9023";
var PROVIDER_TAG2 = "[Diziyou]";
function decodeHtml(text) {
  return (text || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#039;/g, "'");
}
function getTmdbTitleFromHtml(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://www.themoviedb.org/${type}/${tmdbId}?language=tr-TR`;
      const response = yield fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const html = yield response.text();
      let trTitle = "";
      const ogMatch = html.match(/<meta property="og:title" content="([^"]+)">/i);
      if (ogMatch) {
        trTitle = decodeHtml(ogMatch[1]).split("(")[0].trim();
      } else {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch) {
          trTitle = decodeHtml(titleMatch[1]).split("(")[0].split("—")[0].trim();
        }
      }
      if (!trTitle)
        return null;
      let origTitle = trTitle;
      const origMatch = html.match(/<h3 class="caption" dir="auto">([^<]+)<\/h3>/i) || html.match(/<strong class="original_title">([^<]+)<\/strong>/i);
      if (origMatch) {
        const cleaned = decodeHtml(origMatch[1]).replace("Orijinal Başlık", "").replace("Original Title", "").replace("Orijinal Adı", "").replace("Orijinal Adi", "").trim();
        if (cleaned.length > 0)
          origTitle = cleaned;
      }
      const shortTitle = trTitle.split(" ").slice(0, 2).join(" ");
      const yearMatch = html.match(/\((\d{4})\)/);
      const year = yearMatch ? parseInt(yearMatch[1]) : null;
      console.log(`${PROVIDER_TAG2} [HTML] Başlık: ${trTitle} | Orijinal: ${origTitle} | Yıl: ${year}`);
      return { trTitle, origTitle, shortTitle, year };
    } catch (e) {
      console.warn(`${PROVIDER_TAG2} [HTML] Scraping başarısız: ${e.message}`);
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
      const shortTitle = trTitle.split(" ").slice(0, 2).join(" ");
      const dateStr = data.release_date || data.first_air_date || "";
      const year = dateStr ? parseInt(dateStr.substring(0, 4)) : null;
      if (!trTitle)
        return null;
      console.log(`${PROVIDER_TAG2} [API] Başlık: ${trTitle} | Orijinal: ${origTitle} | Yıl: ${year}`);
      return { trTitle, origTitle, shortTitle, year };
    } catch (e) {
      console.warn(`${PROVIDER_TAG2} [API] REST API başarısız: ${e.message}`);
      return null;
    }
  });
}
function getTmdbTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    const htmlResult = yield getTmdbTitleFromHtml(tmdbId, mediaType);
    if (htmlResult)
      return htmlResult;
    console.log(`${PROVIDER_TAG2} HTML scraping başarısız, TMDB REST API deneniyor...`);
    const apiResult = yield getTmdbTitleFromApi(tmdbId, mediaType);
    if (apiResult)
      return apiResult;
    console.error(`${PROVIDER_TAG2} Her iki yöntem de başarısız: TMDB ID=${tmdbId}`);
    return { trTitle: "", origTitle: "", shortTitle: "", year: null };
  });
}

// src/patronDiziyou/extractor.js (PYTHON MANTIĞIYLA GÜNCELLENDİ)
function resolveDiziyou(epUrl, baseUrl) {
  return __async(this, null, function* () {
    try {
      console.log(`${PROVIDER_TAG} Kaynak aranıyor: ${epUrl}`);
      const html = yield fetchText(epUrl, {
        headers: { "Referer": baseUrl }
      });
      if (!html) {
        console.error(`${PROVIDER_TAG} Kaynak sayfası çekilemedi.`);
        return [];
      }
      
      // PYTHON MANTIĞI: player/12345.html üzerinden Regex ile Video ID bulma
      const idMatch = html.match(/player\/(\d{4,8})\.html/i);
      if (!idMatch) {
        console.error(`${PROVIDER_TAG} Video ID (player/id.html) bulunamadı.`);
        return [];
      }
      
      const v_id = idMatch[1];
      console.log(`${PROVIDER_TAG} Video ID çıkarıldı: ${v_id}`);

      let hasDub = false;
      let hasSub = false;
      if (html.match(/id=["']turkceDublaj["']/i)) hasDub = true;
      if (html.match(/id=["']turkceAltyazili["']/i)) hasSub = true;
      // Eğer sitede buton belirtilmemişse varsayılan olarak altyazılı deniyoruz
      if (!hasDub && !hasSub) hasSub = true;

      const sources = [];
      
      // PYTHON MANTIĞI: Domain ve M3U8 kombinasyonları
      const domains = ["storage.diziyou.one", "cast3.dystream.com", "cdn.diziyou.one"];
      const filenames = ["play.m3u8", "720p.m3u8", "1080p.m3u8"];

      for (const d of domains) {
        for (const f of filenames) {
          let qualityLabel = f === "play.m3u8" ? "Auto" : f.replace(".m3u8", "");
          
          if (hasSub) {
            sources.push({
              url: `https://${d}/episodes/${v_id}/${f}`,
              quality: qualityLabel,
              language: "tr",
              name: `Diziyou Altyazılı (${d})`,
              headers: { "Referer": `${baseUrl}/` }
            });
          }
          if (hasDub) {
            sources.push({
              url: `https://${d}/episodes/${v_id}_tr/${f}`,
              quality: qualityLabel,
              language: "tr",
              name: `Diziyou Dublaj (${d})`,
              headers: { "Referer": `${baseUrl}/` }
            });
          }
        }
      }

      console.log(`${PROVIDER_TAG} Toplam ${sources.length} olası kaynak üretildi.`);
      return sources;
    } catch (e) {
      console.error(`${PROVIDER_TAG} resolveDiziyou hatası: ${e.message}`);
      return [];
    }
  });
}

// src/patronDiziyou/index.js
function getStreams(tmdbId, type, season, episode) {
  return __async(this, null, function* () {
    try {
      console.log(`${PROVIDER_TAG} getStreams: ${type} | TMDB: ${tmdbId} | S${season}E${episode}`);
      const tmdbData = yield getTmdbTitle(tmdbId, type);
      if (!tmdbData || !tmdbData.trTitle && !tmdbData.origTitle) {
        console.error(`${PROVIDER_TAG} TMDB bilgileri alınamadı.`);
        return [];
      }
      const { trTitle, origTitle, shortTitle, year } = tmdbData;
      const baseUrl = yield getDiziyouBaseUrl();
      const queries = [...new Set([trTitle, origTitle, shortTitle].filter((q) => q && q.length > 1))];
      let matchUrl = null;
      for (const query of queries) {
        console.log(`${PROVIDER_TAG} Aranıyor: "${query}"`);
        const searchUrl = `${baseUrl}/wp-admin/admin-ajax.php`;
        const html = yield fetchText(searchUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: `action=data_fetch&keyword=${encodeURIComponent(query)}`
        });
        if (!html)
          continue;
        const itemRegex = /<div id=["']searchelement["'][^>]*>[\s\S]*?<div class=["']search-cat-img["']>[\s\S]*?<\/div>\s*<a href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/ig;
        let m;
        while ((m = itemRegex.exec(html)) !== null) {
          const href = m[1];
          const title = m[2];
          const normalize = (str) => (str || "").toLowerCase().replace(/[^a-z0-9ğüşıöç]/g, "");
          const rTitle = normalize(title);
          const cleanTr = normalize(trTitle);
          const cleanOrig = normalize(origTitle);
          const cleanSh = normalize(shortTitle);
          const cleanQ = normalize(query);
          const titleMatches = rTitle === cleanTr || rTitle === cleanOrig || rTitle === cleanSh || rTitle === cleanQ || rTitle.includes(cleanQ) || cleanQ.includes(rTitle);
          if (titleMatches) {
            console.log(`${PROVIDER_TAG} Eşleşme: "${title}" -> ${href}`);
            matchUrl = fixUrl(href, baseUrl);
            break;
          }
        }
        if (matchUrl)
          break;
      }
      if (!matchUrl) {
        console.log(`${PROVIDER_TAG} İçerik bulunamadı.`);
        return [];
      }
      let targetUrl = matchUrl;
      if (type === "tv") {
        console.log(`${PROVIDER_TAG} Dizi sayfası inceleniyor: ${matchUrl}`);
        const seriesHtml = yield fetchText(matchUrl);
        const epPattern = new RegExp(`href=["']([^"']+-${season}-sezon-${episode}-bolum\\/?)[^"']*["']`, "i");
        const epMatch = seriesHtml.match(epPattern);
        if (epMatch) {
          targetUrl = fixUrl(epMatch[1], baseUrl);
          console.log(`${PROVIDER_TAG} Bölüm URL (Regex): ${targetUrl}`);
        } else {
          let slug = matchUrl.replace(/\/$/, "").split("/").pop();
          targetUrl = `${baseUrl}/${slug}-${season}-sezon-${episode}-bolum/`;
          console.log(`${PROVIDER_TAG} Bölüm URL (Tahmin): ${targetUrl}`);
        }
      }
      const sources = yield resolveDiziyou(targetUrl, baseUrl);
      return sources;
    } catch (err) {
      console.error(`${PROVIDER_TAG} Hata: ${err.message}`);
      return [];
    }
  });
}
