function applyReplacements(text) {
  if (!text) return text;
  return text
    .replace(/\bConnections\b/g, 'Friends')
    .replace(/\bConnect\b/g, 'Friends')
    .replace(/\bAdd Connection\b/g, 'Add Friend')
    .replace(/\bRemove Connection\b/g, 'Unfriend')
    .replace(/\bSearch for Connections\b/g, 'Search for Friends')
    .replace(/\bSearch Connections\b/g, 'Search Friends');
}

function replaceTextContent(node) {
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    ['SCRIPT', 'STYLE', 'IFRAME'].includes(node.tagName)
  ) {
    return;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = applyReplacements(node.textContent);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Replace value of inputs and textareas
    if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
      node.value = applyReplacements(node.value);

      // Also replace placeholder attribute
      const placeholder = node.getAttribute('placeholder');
      if (placeholder) {
        const newPlaceholder = applyReplacements(placeholder);
        if (newPlaceholder !== placeholder) {
          node.setAttribute('placeholder', newPlaceholder);
        }
      }
    }

    // Recursively process child nodes
    for (let child of node.childNodes) {
      replaceTextContent(child);
    }
  }
}

// Initial run
replaceTextContent(document.body);

// MutationObserver to handle dynamic content
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      replaceTextContent(node);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Continuously replace document title
setInterval(() => {
  document.title = applyReplacements(document.title);
}, 500);

// Periodically update input values and placeholders (in case React updates them)
setInterval(() => {
  document.querySelectorAll('input, textarea').forEach((el) => {
    el.value = applyReplacements(el.value);

    const placeholder = el.getAttribute('placeholder');
    if (placeholder) {
      const newPlaceholder = applyReplacements(placeholder);
      if (newPlaceholder !== placeholder) {
        el.setAttribute('placeholder', newPlaceholder);
      }
    }
  });
}, 1000);
