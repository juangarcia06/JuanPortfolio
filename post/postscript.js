function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Fetch the skills
fetch('../posts.json')
    .then(response => response.json())
    .then(data => {
        let post = data.posts.filter((post) => post.parameter == getParameterByName("name"))

        post = post[0]
        console.log(post)

        const postsSection = document.getElementById('.content')

        const header = document.querySelector("h1");
        header.textContent = post.title;

        const img = document.createElement('img')
        img.src = "../blogimages/" + post.img
        postsSection.appendChild(img)

        const p = document.createElement('p')
        p.innerText = post.description
        postsSection.appendChild(p)

        for (const comment of post.comments) {
            const img = document.createElement('img')
            img.src = "../blogimages/" + comment.img
            postsSection.appendChild(img)

            const h3 = document.createElement('h3')
            h3.textContent = comment.title.charAt(0).toUpperCase() + comment.title.slice(1)
            postsSection.appendChild(h3)

            const p = document.createElement('p');
            p.textContent = comment.comment;
            postsSection.appendChild(p)
            
            const hr = document.createElement("hr");
            postsSection.appendChild(hr);
        }
    })