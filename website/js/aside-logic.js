const body = document.querySelector('body');
const asideBtn = document.querySelector('aside .aside__toggle-input');

asideBtn.addEventListener('click', () => {
    asideBtn.checked ? body.classList.add('--open') : body.classList.remove('--open');
});


const pageTitle = document.querySelector('header h1');
const navbar = document.querySelector('.navigation ul');
const navbarItems = document.querySelectorAll('.navigation .navigation__item');

navbar.addEventListener('click', (e) => {

    console.log(navbarItems);
    const navItem = e.target.closest('li');
    if (navItem !== null) {
        for (let i = 0; i < navbarItems.length; i += 1) {
            navbarItems[i].classList.remove('--active');
        }

        navItem.classList.add('--active');
        const text = navItem.childNodes[3].innerText;
        if (text !== null) {
            pageTitle.innerText = text;
        }

    }
});