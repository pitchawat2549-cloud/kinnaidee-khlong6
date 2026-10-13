// ===================================================
// api.js : ตัวกลางดึงข้อมูล
// - ตั้งค่า Supabase ไว้ใน config.js  -> ดึงจากฐานข้อมูลจริง
// - ยังไม่ตั้งค่า / เชื่อมต่อไม่ได้      -> ใช้ข้อมูลสำรองใน seed-data.js
// ทุกหน้าเรียกข้อมูลผ่าน DB.xxx() เท่านั้น
// ===================================================
const DB = (() => {
  const cfg = window.APP_CONFIG || {};
  // ไลบรารี supabase-js 2.45.4 เก็บไว้ในเว็บเราเอง (js/vendor) ไม่ต้องรอโหลดจากเว็บนอก
  const SUPABASE_LIB = new URL("vendor/supabase.js", document.currentScript.src).href;
  const CACHE_KEY = "kinnaidee-data";
  const CACHE_MS = 5 * 60 * 1000;   // จำข้อมูลร้านไว้ 5 นาที เปลี่ยนหน้าแล้วขึ้นทันที
  const BUCKET = "restaurant-images";
  const configured = Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);

  let client = null;
  let mode = "local";          // "cloud" = Supabase, "local" = ข้อมูลสำรอง
  let ready = null;
  let cache = null;

  // ถ้ารอนานเกินกำหนด ให้ถือว่าล้มเหลว (กันหน้าเว็บค้างว่างเปล่า)
  function withTimeout(promise, ms, msg) {
    let timer;
    return Promise.race([
      promise,
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(msg)), ms); })
    ]).finally(() => clearTimeout(timer));
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("โหลดไลบรารี Supabase ไม่สำเร็จ"));
      document.head.appendChild(s);
    });
  }

  // เริ่มเชื่อมต่อครั้งเดียว
  function init() {
    if (ready) return ready;
    ready = (async () => {
      if (!configured) return;
      try {
        if (!window.supabase) await withTimeout(loadScript(SUPABASE_LIB), 6000, "โหลดไลบรารี Supabase นานเกินไป");
        client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
          // ไม่ใช้ navigator.locks: กันอาการค้างเมื่อเปิดเว็บหลายแท็บพร้อมกัน
          auth: { lock: async (_name, _timeout, fn) => fn() }
        });
        mode = "cloud";
      } catch (e) {
        mode = "local";
        client = null;
        console.warn("[DB] ใช้ข้อมูลสำรองแทน:", e.message);
      }
    })();
    return ready;
  }

  // แปลงเวลา "11:30:00" -> "11:30"
  const hhmm = t => (t ? String(t).slice(0, 5) : null);

  function normalize(r) {
    return {
      ...r,
      open_time: hhmm(r.open_time),
      close_time: hhmm(r.close_time),
      tags: r.tags || [],
      closed_days: r.closed_days || [],
      images: r.images || [],
      menu: r.menu || []
    };
  }

  function fail(error) {
    throw new Error(error.message || "เชื่อมต่อฐานข้อมูลไม่สำเร็จ");
  }

  // ---------- ข้อมูลสำหรับหน้าเว็บ ----------
  // ข้อมูลที่จำไว้จากหน้าก่อน (ภายในแท็บเดียวกัน)
  function readCache() {
    try {
      const c = JSON.parse(sessionStorage.getItem(CACHE_KEY));
      if (c && Date.now() - c.at < CACHE_MS) return c.data;
    } catch (e) { /* ไม่มี / ใช้ไม่ได้ */ }
    return null;
  }
  function writeCache(data) {
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data })); } catch (e) { /* ข้าม */ }
  }
  function clearCache() {
    try { sessionStorage.removeItem(CACHE_KEY); } catch (e) { /* ข้าม */ }
  }

  async function loadAll() {
    if (cache) return cache;
    if (configured) {
      const saved = readCache();
      if (saved) {
        mode = "cloud";
        init();                       // เตรียมเชื่อมต่อไว้เบื้องหลัง (เผื่อส่งข้อความ)
        return (cache = saved);
      }
    }
    await init();
    if (mode === "cloud") {
      try {
        const [c, a, r] = await withTimeout(Promise.all([
          client.from("categories").select("*").order("sort"),
          client.from("areas").select("*").order("sort"),
          client.from("restaurants").select("*").eq("published", true).order("name")
        ]), 8000, "ฐานข้อมูลตอบช้าเกินไป");
        const err = c.error || a.error || r.error;
        if (err) throw err;
        cache = { categories: c.data, areas: a.data, restaurants: r.data.map(normalize) };
        writeCache(cache);
        return cache;
      } catch (e) {
        console.warn("[DB] ดึงข้อมูลจาก Supabase ไม่ได้ ใช้ข้อมูลสำรองแทน:", e.message);
        mode = "local";
      }
    }
    const s = window.SEED;
    cache = {
      categories: s.categories,
      areas: s.areas,
      restaurants: s.restaurants.filter(r => r.published !== false).map(normalize)
    };
    return cache;
  }

  async function sendSuggestion({ kind, restaurant_id = null, name = "", message, contact = "" }) {
    await init();
    if (mode !== "cloud") {
      throw new Error("ยังไม่ได้เชื่อมฐานข้อมูล ส่งข้อความไม่ได้ในตอนนี้");
    }
    const { error } = await client.from("suggestions").insert({ kind, restaurant_id, name, message, contact });
    if (error) fail(error);
  }

  // ---------- สำหรับหน้าแอดมิน ----------
  const admin = {
    async session() {
      await init();
      if (mode !== "cloud") return null;
      const { data } = await client.auth.getSession();
      return data.session;
    },
    async signIn(email, password) {
      await init();
      if (mode !== "cloud") throw new Error("ยังไม่ได้ตั้งค่า Supabase ใน js/config.js");
      const { error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw new Error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    },
    async signOut() {
      await init();
      if (client) await client.auth.signOut();
    },
    async listRestaurants() {
      const { data, error } = await client.from("restaurants").select("*").order("updated_at", { ascending: false });
      if (error) fail(error);
      return data.map(normalize);
    },
    async lookups() {
      const [c, a] = await Promise.all([
        client.from("categories").select("*").order("sort"),
        client.from("areas").select("*").order("sort")
      ]);
      if (c.error || a.error) fail(c.error || a.error);
      return { categories: c.data, areas: a.data };
    },
    async saveRestaurant(row, isNew) {
      clearCache();
      const q = isNew
        ? client.from("restaurants").insert(row)
        : client.from("restaurants").update(row).eq("id", row.id);
      const { error } = await q;
      if (error) {
        if (error.code === "23505") throw new Error("รหัสร้านนี้มีอยู่แล้ว ใช้รหัสอื่น");
        fail(error);
      }
    },
    async deleteRestaurant(id) {
      clearCache();
      const { error } = await client.from("restaurants").delete().eq("id", id);
      if (error) fail(error);
    },
    async uploadImage(file, restaurantId) {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${restaurantId}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
      const { error } = await client.storage.from(BUCKET).upload(path, file, { cacheControl: "31536000" });
      if (error) fail(error);
      return client.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    },
    async listSuggestions() {
      const { data, error } = await client.from("suggestions").select("*").order("created_at", { ascending: false });
      if (error) fail(error);
      return data;
    },
    async setSuggestionStatus(id, status) {
      const { error } = await client.from("suggestions").update({ status }).eq("id", id);
      if (error) fail(error);
    },
    async deleteSuggestion(id) {
      const { error } = await client.from("suggestions").delete().eq("id", id);
      if (error) fail(error);
    }
  };

  return {
    init,
    loadAll,
    sendSuggestion,
    admin,
    get mode() { return mode; },
    get configured() { return configured; }
  };
})();
