const apiUrl = "http://localhost:3000/api/messages"; // URL to your backend server

        // Load posts from the server on page load
        document.addEventListener("DOMContentLoaded", loadPosts);

        // Fetch and display posts
        function loadPosts() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(posts => {
                    posts.forEach(addPostToFeed);
                })
                .catch(error => console.error("Error loading posts:", error));
        }

        // Function to create a new post
        function postMessage() {
            const input = document.getElementById("postInput");
            const message = input.value.trim();

            if (message) {
                const post = {
                    username: "/user",
                    message: message,
                };

                // Send post to the server
                fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(post),
                })
                    .then(response => response.json())
                    .then(savedPost => {
                        addPostToFeed(savedPost);
                        input.value = "";
                    })
                    .catch(error => console.error("Error posting message:", error));
            }
        }

        // Add post to the feed
        function addPostToFeed(post) {
            const feed = document.getElementById("feed");

            const postElement = document.createElement("li");
            postElement.classList.add("post");

            postElement.innerHTML = `
                <span class="username">${post.username}</span>
                <div class="message">${post.message}</div>
            `;

            feed.appendChild(postElement);
        }
