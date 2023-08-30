function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Fetch the post data
fetch('../posts.json')
    .then(response => response.json())
    .then(data => {
        let post = data.posts.filter((post) => post.parameter == getParameterByName("name"))

        post = post[0]

        document.title = post.title.charAt(0).toUpperCase() + post.title.slice(1)

        const postsSection = document.querySelector('.content')

        const header = document.querySelector("h1");
        header.textContent = post.title;

        const img = document.createElement('img')
        img.src = "../blogimages/" + post.img
        img.alt = (post.img.charAt(0).toUpperCase() + post.img.slice(1)).replace(/\.[^/.]+$/, "")
        img.classList.add("titleimage")
        img.loading = "lazy";
        postsSection.appendChild(img)

        const p = document.createElement('p')
        p.innerText = post.description
        postsSection.appendChild(p)

        for (const comment of post.comments) {
            const h2 = document.createElement('h2')
            h2.textContent = comment.title.charAt(0).toUpperCase() + comment.title.slice(1)
            postsSection.appendChild(h2)

            const img = document.createElement('img')
            img.src = "../blogimages/" + comment.img
            postsSection.appendChild(img)

            const p = document.createElement('p');
            p.textContent = comment.comment;
            postsSection.appendChild(p)
        }
    })