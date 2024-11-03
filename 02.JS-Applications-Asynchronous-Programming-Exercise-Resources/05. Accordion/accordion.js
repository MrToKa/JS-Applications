async function solution() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const main = document.getElementById('main');

    await fetch(url)
        .then(res => res.json())
        .then(data => {
            Object.values(data).forEach(article => {
                const divAccordion = createAccordion(article);
                main.appendChild(divAccordion);
            });
        });

    function createAccordion(article) {
        const divAccordion = document.createElement('div');
        divAccordion.className = 'accordion';

        const divHead = document.createElement('div');
        divHead.className = 'head';

        const spanTitle = document.createElement('span');
        spanTitle.textContent = article.title;

        const button = document.createElement('button');
        button.className = 'button';
        button.textContent = 'More';

        const divExtra = document.createElement('div');
        divExtra.className = 'extra';

        const p = document.createElement('p');
        p.textContent = article.content;

        divHead.appendChild(spanTitle);
        divHead.appendChild(button);
        divExtra.appendChild(p);

        divAccordion.appendChild(divHead);
        divAccordion.appendChild(divExtra);

        button.addEventListener('click', async () => {
            await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`)
                .then(res => res.json())
                .then(data => {
                    p.textContent = data.content;
                });

            if (button.textContent === 'More') {
                button.textContent = 'Less';
                divExtra.style.display = 'block';
            } else {
                button.textContent = 'More';
                divExtra.style.display = 'none';
            }
        });

        return divAccordion;
    }

    return main;
}

solution();