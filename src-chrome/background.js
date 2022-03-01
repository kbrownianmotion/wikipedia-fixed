chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    if (message.state === "narrow") {
      chrome.action.setIcon({tabId: sender.tab.id, path: "icons/icon-48.png"});
      chrome.action.setTitle({tabId: sender.tab.id, title:  "Disable fixed Wikipedia view"});
      console.log(message.state);
    }
    if (message.state === "wide") {
      chrome.action.setIcon({tabId: sender.tab.id, path: "icons/grey-48.png"});
      chrome.action.setTitle({tabId: sender.tab.id, title:  "Enable fixed Wikipedia view"});
      console.log(message.state);
    }
    if (message.state === "not-wiki") {
      chrome.action.setIcon({tabId: sender.tab.id, path: "icons/disabled-48.png"});
      console.log("Not Eligible");
      chrome.action.setTitle({tabId: sender.tab.id, title: "Wikipedia Fixed"});
      console.log(message.state);
    }
  }
);

chrome.action.setIcon({path: "icons/disabled-48.png"});
chrome.action.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  console.log("clicked");
  let msg = {
    txt: "switch"
  }
  chrome.tabs.sendMessage(tab.id, msg);
}