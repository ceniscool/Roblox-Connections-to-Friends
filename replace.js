function replaceText(node) {
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    ['SCRIPT', 'STYLE', 'IFRAME'].includes(node.tagName)
  ) {
    return;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = node.textContent
      .replace(/\bConnections\b/g, 'Friends')
      .replace(/\bConnect\b/g, 'Friends')
      .replace(/\bAdd Connection\b/g, 'Add Friend')
      .replace(/\bRemove Connection\b/g, 'Unfriend')
      .replace(/\bSearch for Connections\b/g, 'Search for Friends')
      .replace(/\bSearch Connections\b/g, 'Search Friends');
  } else {
    for (let child of node.childNodes) {
      replaceText(child);
    }
  }
}

// Run immediately
replaceText(document.body);

// Watch for body changes (dynamic content)
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      replaceText(node);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Continuously update title every 500ms
setInterval(() => {
  if (document.title.includes('Connections')) {
    document.title = document.title.replace(/Connections/g, 'Friends');
  }
}, 500);
