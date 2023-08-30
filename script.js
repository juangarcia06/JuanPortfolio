// Fetch the skills
fetch('skills.json')
    .then(response => response.json())
    .then(data => {
        const technologiesSection = document.getElementById('technologies')

        for (const property in data) {
            const h3 = document.createElement('h3')
            h3.textContent = property.charAt(0).toUpperCase() + property.slice(1)

            const divContainer = document.createElement('div')
            divContainer.classList.add(property)

            technologiesSection.appendChild(h3)
            technologiesSection.appendChild(divContainer)

            if (Array.isArray(data[property])) {
                data[property].forEach(item => {
                    const div = document.createElement('div')

                    const icon = document.createElement('i')
                    icon.classList.add(item.iconType, item.icon)

                    const p = document.createElement('p')
                    p.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1)

                    div.appendChild(icon)
                    div.appendChild(p)

                    divContainer.appendChild(div)
                })
            }

            const skillCss = `#technologies .${property} {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-wrap: wrap;
            }`
            const technologiesContainerCss = `#technologies .${property} div {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-flow: row wrap;
                cursor: pointer;
                color: rgba(255, 255, 255, 1);
                width: 140px;
                height: 60px;
                padding: 0.2rem;
                margin: 2px;
                border: rgb(38, 38, 38) solid 1px;
                border-radius: 0.375rem;
                overflow: hidden;
            }`
            const style = document.createElement('style')
            style.innerText = technologiesContainerCss + skillCss
            document.head.appendChild(style)
        }
    })

// Fetch the skills
fetch('posts.json')
    .then(response => response.json())
    .then(data => {
        const postsSection = document.getElementById('posts')

        for (const post of data.posts) {

            const aTag = document.createElement('a')
            if (post.url != "") {
                aTag.href = post.url
            } else if (post.parameter != "") {
                aTag.href = "./post?name=" + post.parameter
            }

            aTag.target = "_blank"
            postsSection.appendChild(aTag)

            const articleContainer = document.createElement('article')
            aTag.appendChild(articleContainer)

            const img = document.createElement('img')
            img.src = "./blogimages/" + post.img

            articleContainer.appendChild(img)

            const h3 = document.createElement('h3')
            h3.textContent = post.title.charAt(0).toUpperCase() + post.title.slice(1)

            articleContainer.appendChild(h3)

            const p = document.createElement('p');
            const maxLength = 150;
            const shortDescription = post.description.length > maxLength ? post.description.substring(0, maxLength) + "..." : post.description;
            p.textContent = shortDescription;

            articleContainer.appendChild(p)
        }
    })