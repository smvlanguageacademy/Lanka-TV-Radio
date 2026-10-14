/*
  Channel directory starter.
  Replace each channel's stream value with a verified official livestream URL/ID.
  YouTube videos that permit embedding play in the large player. Other stations may
  need the official stream link opened in a new tab.
*/
const channels = {
  tv: [
    { name: "Sri Lanka TV (Famelack)", logo: "https://www.google.com/s2/favicons?domain=famelack.com&sz=128", search: "Sri Lanka TV Famelack", stream: "", kind: "famelack", official: "https://famelack.com/tv/lk" },
    { name: "Rupavahini", logo: "https://www.google.com/s2/favicons?domain=rupavahini.lk&sz=128", search: "Rupavahini Sri Lanka official live", stream: "https://www.youtube.com/live/OsI7-EOka3k", kind: "youtube", official: "https://tv.rupavahini.lk/live-webcast/rupavahini-live-webcast2/" },
    { name: "ITN", logo: "https://www.google.com/s2/favicons?domain=itn.lk&sz=128", search: "ITN Sri Lanka official live", stream: "", kind: "official-page", official: "https://itn.lk/live/" },
    { name: "TV Derana", logo: "https://www.google.com/s2/favicons?domain=derana.lk&sz=128", search: "TV Derana Sri Lanka official live", stream: "", kind: "youtube-search" },
    { name: "Hiru TV", logo: "https://www.google.com/s2/favicons?domain=hirutv.lk&sz=128", search: "Hiru TV Sri Lanka official live", stream: "", kind: "official-page", official: "https://www.hirutv.lk/" },
    { name: "Sirasa TV", logo: "https://www.google.com/s2/favicons?domain=sirasatv.lk&sz=128", search: "Sirasa TV Sri Lanka official live", stream: "", kind: "youtube-search" },
    { name: "Swarnavahini", logo: "https://www.google.com/s2/favicons?domain=swarnavahini.lk&sz=128", search: "Swarnavahini Sri Lanka official live", stream: "", kind: "youtube-search" },
    { name: "Siyatha TV", logo: "https://www.google.com/s2/favicons?domain=siyathatv.lk&sz=128", search: "Siyatha TV Sri Lanka official live", stream: "", kind: "youtube-search" },
    { name: "Ada Derana 24", logo: "https://www.google.com/s2/favicons?domain=adaderana.lk&sz=128", search: "Ada Derana 24 official live", stream: "", kind: "youtube-search" },
    { name: "Vasantham TV", logo: "https://www.google.com/s2/favicons?domain=vasantham.lk&sz=128", search: "Vasantham TV Sri Lanka official live", stream: "", kind: "youtube-search" },
    { name: "Nethra TV", logo: "https://www.google.com/s2/favicons?domain=slrc.lk&sz=128", search: "Nethra TV Sri Lanka official live", stream: "", kind: "youtube-search" }
  ],
  radio: [
    { name: "Sirasa FM", logo: "https://www.google.com/s2/favicons?domain=sirasa.com&sz=128", search: "Sirasa FM Sri Lanka live radio official", stream: "", kind: "radio-search" },
    { name: "Hiru FM", logo: "https://www.google.com/s2/favicons?domain=hirufm.lk&sz=128", search: "Hiru FM Sri Lanka live radio official", stream: "", kind: "radio-search" },
    { name: "Derana FM", logo: "https://www.google.com/s2/favicons?domain=derana.lk&sz=128", search: "Derana FM Sri Lanka live radio official", stream: "", kind: "radio-search" },
    { name: "Neth FM", logo: "https://www.google.com/s2/favicons?domain=nethfm.lk&sz=128", search: "Neth FM Sri Lanka live radio official", stream: "", kind: "radio-search" },
    { name: "Sha FM", logo: "https://www.google.com/s2/favicons?domain=shafm.lk&sz=128", search: "Sha FM Sri Lanka live radio official", stream: "", kind: "radio-search" },
    { name: "Sun FM", logo: "https://www.google.com/s2/favicons?domain=sunfm.lk&sz=128", search: "Sun FM Sri Lanka live radio official", stream: "", kind: "radio-search" },
    { name: "Y FM", logo: "https://www.google.com/s2/favicons?domain=yfm.lk&sz=128", search: "Y FM Sri Lanka live radio official", stream: "", kind: "radio-search" },
    { name: "Gold FM", logo: "https://www.google.com/s2/favicons?domain=goldfm.lk&sz=128", search: "Gold FM Sri Lanka live radio official", stream: "", kind: "radio-search" },
    { name: "Lite FM", logo: "https://www.google.com/s2/favicons?domain=litefm.lk&sz=128", search: "Lite FM Sri Lanka live radio official", stream: "", kind: "radio-search" },
    { name: "TNL Radio", logo: "https://www.google.com/s2/favicons?domain=tnlradio.com&sz=128", search: "TNL Radio Sri Lanka live official", stream: "", kind: "radio-search" }
  ]
};

let currentTab = "tv";
let selectedKey = "";
const grid = document.getElementById("channel-grid");
const title = document.getElementById("section-title");
const count = document.getElementById("channel-count");
const nowTitle = document.getElementById("now-title");
const nowType = document.getElementById("now-type");
const player = document.getElementById("player");
const openStream = document.getElementById("open-stream");

function youtubeSearchUrl(q) {
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
}
function radioSearchUrl(q) {
  return "https://www.google.com/search?q=" + encodeURIComponent(q);
}
function renderChannels() {
  const list = channels[currentTab];
  title.textContent = currentTab === "tv" ? "TV Channels" : "Radio Channels";
  count.textContent = list.length + " channels";
  grid.innerHTML = "";
  list.forEach((ch, index) => {
    const key = currentTab + "-" + index;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "channel-card" + (selectedKey === key ? " selected" : "");
    button.innerHTML = `<span class="logo-wrap"><img alt="" loading="lazy"><span class="logo-fallback" hidden>${currentTab === "tv" ? "TV" : "FM"}</span></span><span class="channel-name"></span><span class="channel-state">▶ Select</span>`;
    const img = button.querySelector("img");
    img.src = ch.logo;
    img.onerror = () => { img.hidden = true; button.querySelector(".logo-fallback").hidden = false; };
    button.querySelector(".channel-name").textContent = ch.name;
    button.addEventListener("click", () => selectChannel(ch, key));
    grid.appendChild(button);
  });
}
function selectChannel(ch, key) {
  selectedKey = key;
  nowTitle.textContent = ch.name;
  nowType.textContent = currentTab === "tv" ? "TV CHANNEL • Live" : "RADIO CHANNEL • Live";
  player.innerHTML = "";
  openStream.classList.remove("hidden");
  let url = ch.stream;
  if (currentTab === "tv" && ch.kind === "famelack") {
    const iframe = document.createElement("iframe");
    iframe.src = ch.official;
    iframe.title = "Famelack Sri Lanka TV";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    player.appendChild(iframe);
    openStream.href = ch.official;
    openStream.textContent = "Open Famelack directly ↗";
  } else if (url && (url.includes("youtube.com/watch") || url.includes("youtu.be/"))) {
    let videoId = "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) videoId = parsed.pathname.slice(1);
      else if (parsed.pathname.includes("/live/")) videoId = parsed.pathname.split("/live/")[1].split("/")[0];
      else videoId = parsed.searchParams.get("v");
    } catch(e) {}
    if (videoId) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(videoId) + "?autoplay=1";
      iframe.title = ch.name + " live stream";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      player.appendChild(iframe);
      openStream.href = url;
      openStream.textContent = "Open official stream ↗";
    } else showFallback(ch);
  } else if (ch.kind === "official-page" && ch.official) {
    const box = document.createElement("div");
    box.className = "empty-player";
    const icon = document.createElement("div");
    icon.className = "big-play";
    icon.textContent = "▶";
    const heading = document.createElement("h3");
    heading.textContent = ch.name + " Official Live";
    const message = document.createElement("p");
    message.textContent = "Open the broadcaster's official live page to watch. Some official sites block playback inside other websites.";
    box.append(icon, heading, message);
    player.appendChild(box);
    openStream.href = ch.official;
    openStream.textContent = "Open " + ch.name + " official live ↗";
  } else {
    showFallback(ch);
  }
  renderChannels();
}
function showFallback(ch) {
  const box = document.createElement("div");
  box.className = "empty-player";
  const icon = document.createElement("div");
  icon.className = "big-play";
  icon.textContent = currentTab === "tv" ? "▶" : "♫";
  const heading = document.createElement("h3");
  heading.textContent = ch.name;
  const message = document.createElement("p");
  message.textContent = "This channel's verified stream has not been added yet. Use the button below to find the official live stream.";
  box.append(icon, heading, message);
  player.appendChild(box);
  openStream.href = ch.kind === "radio-search" ? radioSearchUrl(ch.search) : youtubeSearchUrl(ch.search);
  openStream.textContent = ch.kind === "radio-search" ? "Find official radio stream ↗" : "Find official YouTube Live ↗";
}
document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  currentTab = tab.dataset.tab;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === tab));
  renderChannels();
}));
renderChannels();

const playerShell = document.getElementById("player-shell");
document.getElementById("fullscreen-btn").addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      if (playerShell.requestFullscreen) await playerShell.requestFullscreen();
      else if (player.requestFullscreen) await player.requestFullscreen();
    } else await document.exitFullscreen();
  } catch (e) {
    nowType.textContent = "Full Screen is not available for this browser or embedded stream.";
  }
});
document.getElementById("slide-left").addEventListener("click", () => grid.scrollBy({left:-360,behavior:"smooth"}));
document.getElementById("slide-right").addEventListener("click", () => grid.scrollBy({left:360,behavior:"smooth"}));
