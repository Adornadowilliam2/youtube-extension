const customThumbnail = "https://img.youtube.com/vi/0LEc7es4_rE/maxresdefault.jpg";
const customBackgroundImage = "https://preview.redd.it/fun-fact-the-blue-toad-is-the-character-that-has-the-most-v0-3gygk95lbf5b1.png?width=1080&crop=smart&auto=webp&s=43de8e6e9e63d1b826eb20d6d9e498208c8f5219";

// Apply image background and remove default white containers
function applyCustomBackground() {
  document.documentElement.style.backgroundImage = `url('${customBackgroundImage}')`;
  document.documentElement.style.backgroundSize = "cover";
  document.documentElement.style.backgroundPosition = "center";
  document.documentElement.style.backgroundRepeat = "no-repeat";
  document.documentElement.style.backgroundAttachment = "fixed";

  const transparentize = (selectors) => {
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.background = "transparent";
        el.style.backgroundColor = "transparent";
      });
    });
  };

  // Remove white backgrounds from major containers
  transparentize([
    "ytd-app", 
    "ytd-page-manager", 
    "ytd-watch-flexy", 
    "#page-manager", 
    "#content", 
    "#container", 
    "tp-yt-app-drawer", 
    "#masthead-container", 
    "ytd-masthead",
    "#primary", 
    "ytd-rich-grid-renderer"
  ]);
}

// Replace all thumbnails with a custom image
function replaceAllThumbnails() {
  const thumbnails = document.querySelectorAll("a#thumbnail img");
  thumbnails.forEach(img => {
    if (!img.dataset.replaced) {
      img.src = customThumbnail;
      img.dataset.replaced = "true";
    }
  });
}

// Initial load
applyCustomBackground();
replaceAllThumbnails();

// Reapply on YouTube dynamic content load
const observer = new MutationObserver(() => {
  applyCustomBackground();
  replaceAllThumbnails();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
