
(async function () {
  const currentVersion = chrome.runtime.getManifest().version;

  try {
    const response = await fetch('https://api.github.com/repos/ceniscool/Roblox-Connections-to-Friends/releases/latest');
    const data = await response.json();
    const latestVersion = data.tag_name?.replace(/^v/, ''); 

    if (latestVersion && latestVersion !== currentVersion) {
      alert(`A new version of the Roblox Friends extension is available!\n\nLatest: ${latestVersion}\nYou have: ${currentVersion}\n\nVisit the GitHub repo to update.`);
    }
  } catch (err) {
    console.error('Version check failed:', err);
  }
})();
