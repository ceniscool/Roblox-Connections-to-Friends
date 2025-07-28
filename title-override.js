// Set a custom title
document.title = document.title.replace(/Connections/g, 'Friends').replace(/\bConnect\b/g, 'Friends');

// Optional: observe and re-set if Roblox changes the title dynamically
const titleObserver = new MutationObserver(() => {
  if (!document.title.includes('Friends')) {
    document.title = document.title.replace(/Connections/g, 'Friends').replace(/\bConnect\b/g, 'Friends');
  }
});

const titleTag = document.querySelector('title');
if (titleTag) {
  titleObserver.observe(titleTag, { childList: true });
}
