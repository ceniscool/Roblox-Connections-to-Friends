function replaceText(node) {
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    ['SCRIPT', 'STYLE', 'IFRAME'].includes(node.tagName)
  ) {
    return;
  }

  try {
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
  } catch (e) {
    console.error('replaceText error:', e);
  }
}

// Run immediately
replaceText(document.body);

// Change the tab title if it contains 'Connections'
if (document.title.includes('Connections')) {
  document.title = document.title.replace(/Connections/g, 'Friends');
}

// Watch for future changes
let isProcessing = false;
const observer = new MutationObserver((mutations) => {
  if (isProcessing) return;
  isProcessing = true;

  requestAnimationFrame(() => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        replaceText(node);
      }
    }

    // Re-check the tab title in case it changed dynamically
    if (document.title.includes('Connections')) {
      document.title = document.title.replace(/Connections/g, 'Friends');
    }

    isProcessing = false;
  });
});

observer.observe(document.body, { childList: true, subtree: true });
