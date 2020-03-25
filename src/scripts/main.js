import renderMathInElement from "katex/dist/contrib/auto-render";

const baseUrl = "https://pastex.cgm616.me/"

document.addEventListener('DOMContentLoaded', () => {

    const url = new URL(window.location.href);
    const pid = url.searchParams.get("id");

    if (pid != null) {
        showPaste(pid);
    } else {
        const goButton = document.getElementById("go-to-pastex-id");
        const pastexId = document.getElementById("pastex-id");

        goButton.addEventListener('click', () => {
            disable(goButton);
            goToId(pastexId.value);
        })

        const shareButton = document.getElementById("share-button");
        const shareText = document.getElementById("share-text");

        shareButton.addEventListener('click', () => {
            disable(shareButton);
            var s = new String(shareText.value);

            fetch('https://cors-anywhere.herokuapp.com/http://ix.io', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ "f:1": s, }),
            }).then((data) => data.text())
                .then((text) => goToId(text.replace("http://ix.io/", "")));
        })
    }
});

function disable(button) {
    button.classList.add("is-loading")
}

function goToId(id) {
    window.location.href = baseUrl + "?id=" + id;
}

function showPaste(id) {
    const home = document.getElementById('home');
    const paste = document.getElementById('paste');
    toggleHidden(home);
    toggleHidden(paste);

    document.getElementById('pasteid').append(id);
    const link = document.getElementById('link');
    link.innerHTML = window.location.href;
    link.href = window.location.href;

    const pasteContent = document.getElementById('paste-content');

    fetch('https://cors-anywhere.herokuapp.com/http://ix.io/' + id, {
        method: 'GET'
    })
        .then((data) => data.text())
        .then((text) => {
            var node = document.createElement("p");
            node.append(document.createTextNode(text));
            pasteContent.append(node);
            renderMathInElement(pasteContent);
        });
}

function toggleHidden(element) {
    element.classList.toggle("is-hidden");
}