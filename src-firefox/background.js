browser.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    if (message.state === "narrow") {
      browser.pageAction.setIcon({tabId: sender.tab.id, path: "icons/icon-48.png"});
      browser.pageAction.setTitle({tabId: sender.tab.id, title:  "Disable fixed view"});
      console.log(message.state);
    }
    if (message.state === "wide") {
      browser.pageAction.setIcon({tabId: sender.tab.id, path: "icons/grey-48.png"});
      browser.pageAction.setTitle({tabId: sender.tab.id, title:  "Enable fixed view"});
      console.log(message.state);
    }
  }
);

browser.pageAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  let msg = {
    txt: "switch"
  }
  browser.tabs.sendMessage(tab.id, msg);
}