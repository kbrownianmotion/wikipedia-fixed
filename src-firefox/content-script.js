let msg = {
    state: "narrow"
}
browser.runtime.sendMessage(msg);

let narrowOnLoadCSS = document.createElement("link");
narrowOnLoadCSS.href = browser.runtime.getURL("narrow-onload-style.css");
narrowOnLoadCSS.type = "text/css";
narrowOnLoadCSS.rel = "stylesheet";

let narrowCSS = document.createElement("link");
narrowCSS.href = browser.runtime.getURL("narrow-style.css");
narrowCSS.type = "text/css";
narrowCSS.rel = "stylesheet";

let wideCSS = document.createElement("link");
wideCSS.href = browser.runtime.getURL("wide-style.css");
wideCSS.type = "text/css";
wideCSS.rel = "stylesheet";

document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);

function fireContentLoadedEvent() {

    if (document.body.contains(document.getElementById("mw-navigation"))) {
        document.head.prepend(narrowOnLoadCSS);
        let nav = document.getElementById("mw-navigation");
        let sidebar = document.getElementById('mw-panel');

        nav.id = "mw-navigation-mod";
        nav.className = "noprint";

        document.body.prepend(nav);
        nav.prepend(sidebar);

        msg.state = "narrow";
        browser.runtime.sendMessage(msg);

        browser.runtime.onMessage.addListener(gotMessage);
    } else {
        msg.state = "not-wiki";
        browser.runtime.sendMessage(msg);
    }
}

function gotMessage(message, sender, sendResponse) {

    if (message.txt === "switch") {

        let css_string = document.head.childNodes[0].href;
        fixed = css_string.includes("narrow");
        document.head.removeChild(document.head.childNodes[0]);

        if (fixed == true) {
            document.head.prepend(wideCSS);
            let nav = document.getElementById("mw-navigation-mod");
            let sidebar = document.getElementById('mw-panel');
            nav.insertBefore(sidebar, null);
            document.body.insertBefore(nav, document.getElementById("footer"));
            msg.state = "wide";
            browser.runtime.sendMessage(msg);
        }

        if (fixed == false) {
            document.head.prepend(narrowCSS);
            let nav = document.getElementById("mw-navigation-mod");
            let sidebar = document.getElementById('mw-panel');
            document.body.prepend(nav);
            nav.prepend(sidebar);
            msg.state = "narrow";
            browser.runtime.sendMessage(msg);
        }
    }
}