function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = node.textContent
      .replace(/\bConnections\b/g, 'Friends')
      .replace(/\bConnect\b/g, 'Friends');
  } else {
    for (let child of node.childNodes) {
      replaceText(child);
    }
  }
}

// Run immediately on page load
replaceText(document.body);

// Watch for future page changes (dynamic content)
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      replaceText(node);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
