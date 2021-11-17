const faker = require('faker');
let users = '';

/* This if/else statement is either getting the users from local storage on 
the page or generating a new array if it doesnt exist. We use JSON.parse()
to turn a string on the client side back to an object. It is the opposite
of JSON.stringify() */


if (window.localStorage.getItem('users')) {
  users = JSON.parse(window.localStorage.getItem('users'));
}
else {
  users = new Array(50).fill('').map(_ => faker.helpers.userCard());
  window.localStorage.setItem('users', JSON.stringify(users));
}

/* const ul is targeting the #user-list class in the index.html. */
const ul = document.querySelector('#user-list');

/* The render function generates html. It is called once in the eventListener on 
the hash change and again at the end of the index.js It is being called to generate
the html. If you didn't call render() inside of the eventListener nothing would change on 
the page when you clicked on it. */


/* NOTE: the _idx variable  */


const render = () => {
  const _idx = window.location.hash.slice(1) * 1;
  const html = `
  ${ users.map((user, idx) => `
      <li>
        <a href='#${ idx }'>
          ${ user.name }
        </a>
        ${idx === _idx ? `<pre>${JSON.stringify(user, null, 2)}</pre>` : ''}
      </li>
        `).join('')}
`;
  ul.innerHTML = html;
}

window.addEventListener('hashchange', () => {
  render()
})

render();