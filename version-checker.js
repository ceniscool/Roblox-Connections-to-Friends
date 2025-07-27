(async function () {
  const currentVersion = chrome.runtime.getManifest().version;

  try {
    const response = await fetch('https://api.github.com/repos/ceniscool/Roblox-Connections-to-Friends/releases/latest');
    const data = await response.json();
    const latestVersion = data.tag_name?.replace(/^v/, ''); // strip "v" if present

    if (latestVersion && latestVersion !== currentVersion) {
      const alertKey = `updateNotified_${latestVersion}`;

      if (!localStorage.getItem(alertKey)) {
        chrome.runtime.sendMessage({
          type: "SHOW_NOTIFICATION",
          title: "Roblox Friends Extension Update",
          message: `A new version (${latestVersion}) is available! You have ${currentVersion}.`,
        });
        localStorage.setItem(alertKey, 'true');
      }
    }
  } catch (err) {
    console.error('Version check failed:', err);
  }
})();
