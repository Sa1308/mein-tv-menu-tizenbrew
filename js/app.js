(function () {
    "use strict";

    var tiles = Array.prototype.slice.call(document.querySelectorAll(".tile"));
    var focusIndex = 0;
    var panel = document.getElementById("panel");
    var panelTitle = document.getElementById("panel-title");
    var panelLabel = document.getElementById("panel-label");
    var panelContent = document.getElementById("panel-content");
    var toast = document.getElementById("toast");
    var toastTimer;

    var panels = {
        television: {
            label: "FERNSEHEN",
            title: "Live-TV",
            items: [["Hinweis", "Samsung erlaubt einer normalen App nicht, das geschützte Systemmenü oder Live-TV direkt zu ersetzen."], ["Schneller Weg", "Drücke die Source-Taste der Fernbedienung und wähle TV."], ["Zurück", "Zur eigenen Startseite zurückkehren."]]
        },
        youtube: {
            label: "STREAMING",
            title: "YouTube",
            items: [["YouTube öffnen", "Über die Samsung-Apps-Leiste starten."], ["Favoriten", "Hier können später eigene Web-Videos eingebaut werden."], ["Zurück", "Zur eigenen Startseite zurückkehren."]]
        },
        sources: {
            label: "EINGÄNGE",
            title: "Quellen",
            items: [["HDMI 1", "Konsole oder Receiver"], ["HDMI 2", "Streaming-Gerät"], ["TV", "Antennen- oder Kabelsignal"]]
        },
        media: {
            label: "BIBLIOTHEK",
            title: "Meine Medien",
            items: [["Fotos", "Eigene Bildergalerie"], ["Videos", "Eigene Videodateien"], ["Musik", "Eigene Musiksammlung"]]
        },
        settings: {
            label: "ANPASSEN",
            title: "Mein Menü",
            items: [["Design", "Dunkles Design ist aktiv"], ["Kacheln", "Kacheln später frei belegen"], ["Info", "Version 1.0 · Tizen 4.0"]]
        }
    };

    function pad(value) { return value < 10 ? "0" + value : String(value); }

    function updateClock() {
        var now = new Date();
        var days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        var months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        document.getElementById("time").textContent = pad(now.getHours()) + ":" + pad(now.getMinutes());
        document.getElementById("date").textContent = days[now.getDay()] + ", " + now.getDate() + ". " + months[now.getMonth()];
    }

    function focusTile(index) {
        if (index < 0) { index = tiles.length - 1; }
        if (index >= tiles.length) { index = 0; }
        focusIndex = index;
        tiles.forEach(function (tile, i) {
            tile.className = tile.className.replace(" is-focused", "") + (i === focusIndex ? " is-focused" : "");
        });
    }

    function showToast(message) {
        toast.textContent = message;
        toast.className = "toast show";
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.className = "toast"; }, 2600);
    }

    function openPanel(action) {
        var data = panels[action];
        var html = '<div class="panel-grid">';
        data.items.forEach(function (item, index) {
            html += '<div class="panel-item' + (index === 0 ? ' focused' : '') + '"><b>' + item[0] + '</b><span>' + item[1] + '</span></div>';
        });
        html += "</div>";
        panelLabel.textContent = data.label;
        panelTitle.textContent = data.title;
        panelContent.innerHTML = html;
        panel.className = "panel is-open";
        panel.setAttribute("aria-hidden", "false");
    }

    function closePanel() {
        panel.className = "panel";
        panel.setAttribute("aria-hidden", "true");
    }

    function isPanelOpen() { return panel.className.indexOf("is-open") !== -1; }

    function handleBack() {
        if (isPanelOpen()) {
            closePanel();
            return;
        }
        try { tizen.application.getCurrentApplication().exit(); }
        catch (error) { showToast("App wird auf dem Fernseher geschlossen"); }
    }

    document.addEventListener("keydown", function (event) {
        var key = event.keyCode;
        if (key === 10009 || key === 27) { handleBack(); return; }
        if (isPanelOpen()) {
            if (key === 13) { showToast("Diese Funktion kann als Nächstes verbunden werden"); }
            return;
        }
        if (key === 37) { focusTile(focusIndex - 1); }
        else if (key === 39) { focusTile(focusIndex + 1); }
        else if (key === 13) { openPanel(tiles[focusIndex].getAttribute("data-action")); }
    });

    tiles.forEach(function (tile, index) {
        tile.addEventListener("click", function () { focusTile(index); openPanel(tile.getAttribute("data-action")); });
    });

    updateClock();
    setInterval(updateClock, 30000);
    focusTile(0);
}());

