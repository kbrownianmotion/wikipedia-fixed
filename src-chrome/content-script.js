let msg = {
    state: "narrow"
}
chrome.runtime.sendMessage(msg);

let narrowCSS = document.createElement("link");
narrowCSS.href = chrome.runtime.getURL("narrow-style.css");
narrowCSS.type = "text/css";
narrowCSS.rel = "stylesheet";

let wideCSS = document.createElement("link");
wideCSS.href = chrome.runtime.getURL("wide-style.css");
wideCSS.type = "text/css";
wideCSS.rel = "stylesheet";

document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);

function fireContentLoadedEvent() {

    if(document.body.contains(document.getElementById("mw-navigation"))){
        document.head.prepend(narrowCSS);
        let nav = document.getElementById("mw-navigation");
        let sidebar = document.getElementById('mw-panel');

        nav.id = "mw-navigation-mod";
        
        nav.className = "noprint";
        
        document.body.prepend(nav);
        nav.prepend(sidebar);

        msg.state = "narrow";
        chrome.runtime.sendMessage(msg);

        chrome.runtime.onMessage.addListener(gotMessage);

    } else{
        msg.state = "not-wiki";
        chrome.runtime.sendMessage(msg);
    }
    console.log(msg.state);
}

function gotMessage(message, sender, sendResponse) {

    if (message.txt === "switch") {
        
        let css_string = document.head.childNodes[0].href;
        fixed = css_string.includes("narrow");
        document.head.removeChild(document.head.childNodes[0]);
        
        if (fixed == true) {
            if(document.body.contains(document.getElementById("mw-navigation-mod"))){
                document.head.prepend(wideCSS);
                let nav = document.getElementById("mw-navigation-mod");
                let sidebar = document.getElementById('mw-panel');
                nav.insertBefore(sidebar, null);
                document.body.insertBefore(nav, document.getElementById("footer"));
                msg.state = "wide";
                chrome.runtime.sendMessage(msg);
                console.log("hey");
            } else{
                msg.state = "not-wiki";
                chrome.runtime.sendMessage(msg);
            }
        }

        if (fixed == false) {
            if(document.body.contains(document.getElementById("mw-navigation-mod"))){
                document.head.prepend(narrowCSS);
                let nav = document.getElementById("mw-navigation-mod");
                let sidebar = document.getElementById('mw-panel');
                document.body.prepend(nav);
                nav.prepend(sidebar);
                msg.state = "narrow";
                chrome.runtime.sendMessage(msg);
            } else{
                msg.state = "not-wiki";
                chrome.runtime.sendMessage(msg);
            }
        }
    }
}