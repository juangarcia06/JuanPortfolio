// Fetch the techstack information
fetch('techstack.json')
    .then(response => response.json())
    .then(data => {
        const technologiesSection = document.getElementById('technologies');

        for (const property in data) {
            const h3 = document.createElement('h3');
            h3.textContent = property.charAt(0).toUpperCase() + property.slice(1);

            const divContainer = document.createElement('div');
            divContainer.classList.add(property);

            technologiesSection.appendChild(h3);
            technologiesSection.appendChild(divContainer);

            if (Array.isArray(data[property])) {
                data[property].forEach(item => {
                    const div = document.createElement('div');

                    const icon = document.createElement('i');
                    icon.classList.add(item.iconType, item.icon);

                    const p = document.createElement('p');
                    p.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1);;

                    div.appendChild(icon);
                    div.appendChild(p);

                    divContainer.appendChild(div);
                });
            }
        }
    });