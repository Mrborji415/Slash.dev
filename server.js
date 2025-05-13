const apiUrl = "http://localhost:3000/api/messages";

// Load posts from the server on page load
document.addEventListener("DOMContentLoaded", loadPosts);

function loadPosts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(addPostToFeed);
        })
        .catch(error => console.error("Error loading posts:", error));
}

function postMessage() {
    const input = document.getElementById("postInput");
    const imageInput = document.getElementById("imageInput");
    const message = input.value.trim();
    const timestamp = new Date().toISOString();

    if (!message && !imageInput.files.length) return;

    const post = {
        username: "/user",
        message: message,
        timestamp: timestamp,
    };

    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            post.image = reader.result;
            sendPost(post);
        };
        reader.readAsDataURL(file);
    } else {
        sendPost(post);
    }
}

function sendPost(post) {
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    })
        .then(response => response.json())
        .then(savedPost => {
            addPostToFeed(savedPost);
            document.getElementById("postInput").value = "";
            document.getElementById("imageInput").value = "";
        })
        .catch(error => console.error("Error posting message:", error));
}

function addPostToFeed(post) {
    const feed = document.getElementById("feed");

    const postElement = document.createElement("li");
    postElement.classList.add("post");

    let imageHtml = "";
    if (post.image) {
        imageHtml = `<div class="post-image"><img src="${post.image}" alt="Uploaded Image" /></div>`;
    }

    postElement.innerHTML = `
        <div class="username">${post.username}</div>
        <div class="message">${post.message}</div>
        ${imageHtml}
        <div class="timestamp">${new Date(post.timestamp).toLocaleString()}</div>
    `;

    feed.prepend(postElement); // newest at top
}
