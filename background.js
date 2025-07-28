chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SHOW_NOTIFICATION") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "rsz_maxresdefault.png", // You can change or remove this if no icon
      title: message.title,
      message: message.message
    });
  }
});
