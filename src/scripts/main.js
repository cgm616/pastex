import renderMathInElement from "katex/dist/contrib/auto-render";

const baseUrl = "https://pastex.cgm616.me/";

window.addEventListener("pageshow", function (event) {
  var historyTraversal =
    event.persisted ||
    (typeof window.performance != "undefined" &&
      window.performance.navigation.type === 2);
  if (historyTraversal) {
    // Handle page restore.
    window.location.reload();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  const pid = url.searchParams.get("id");

  if (pid != null) {
    showPaste(pid);
  } else {
    const goButton = document.getElementById("go-to-pastex-id");
    const pastexId = document.getElementById("pastex-id");

    goButton.addEventListener("click", () => {
      disable(goButton);
      goToId(pastexId.value);
    });

    const shareButton = document.getElementById("share-button");
    const shareText = document.getElementById("share-text");

    shareButton.addEventListener("click", () => {
      disable(shareButton);
      var s = new String(shareText.value);

      if (0 === s.length) {
        showPasteError("You cannot paste with no content.");
        enable(shareButton);
        return;
      }

      fetch("https://cors-anywhere.herokuapp.com/http://ix.io", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ "f:1": s })
      })
        .then(data => data.text())
        .then(text => goToId(text.replace("http://ix.io/", "")));
    });
  }
});

function disable(button) {
  button.classList.add("is-loading");
}

function enable(button) {
  button.classList.remove("is-loading");
}

function goToId(id) {
  window.location.href = baseUrl + "?id=" + id;
}

function showPaste(id) {
  const home = document.getElementById("home");
  const paste = document.getElementById("paste");
  toggleHidden(home);
  toggleHidden(paste);

  document.getElementById("pasteid").append(id);
  const link = document.getElementById("link");
  link.innerHTML = window.location.href;
  link.href = window.location.href;

  const pasteContent = document.getElementById("paste-content");

  fetch("https://cors-anywhere.herokuapp.com/http://ix.io/" + id, {
    method: "GET"
  })
    .then(data => data.text())
    .then(text => {
      var node = document.createElement("p");
      node.style.whiteSpace = "pre-wrap";
      node.append(document.createTextNode(text));
      pasteContent.append(node);
      renderMathInElement(pasteContent, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false }
        ]
      });
    });
}

function toggleHidden(element) {
  element.classList.toggle("is-hidden");
}

function showPasteError(error) {
  var errorBox = document.getElementById("share-error");
  errorBox.innerText = error;
  errorBox.classList.remove("is-hidden");
}