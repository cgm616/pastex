import renderMathInElement from "katex/dist/contrib/auto-render";

const baseUrl = "https://pastex.cgm616.me/"

document.addEventListener('DOMContentLoaded', () => {

    const url = new URL(window.location.href);
    const pid = url.searchParams.get("id");

    if (pid != null) {
        showPaste(pid);
    }

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }


    const goButton = document.getElementById("go-to-pastex-id");
    const pastexId = document.getElementById("pastex-id");

    goButton.addEventListener('click', () => {
        // TODO: make this use query string
        // window.location.href = window.location.href + pastexId.value;
    })

    const shareButton = document.getElementById("share-button");
    const shareText = document.getElementById("share-text");

    shareButton.addEventListener('click', () => {
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

});

function goToId(id) {
    window.location.href = baseUrl + "?id=" + id;
}

function showPaste(id) {
    const home = document.getElementById('home');
    const paste = document.getElementById('paste');
    toggleHidden(home);
    toggleHidden(paste);


    document.getElementById('pasteid').append(id);

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
    element.classList.toggle("is-hidden-tablet");
    element.classList.toggle("is-hidden-mobile");
}