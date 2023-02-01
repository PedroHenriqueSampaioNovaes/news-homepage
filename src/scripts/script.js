const menuButton = document.querySelector('#btn-mobile');
const navigation = document.querySelector('.nav');
const events = ['click', 'touchstart'];
const className = 'ativo';
const outside = 'data-outside';

events.forEach((userEvent) => menuButton.addEventListener(userEvent, openMenu));

function openMenu(event) {
  if (event.type === 'touchstart') event.preventDefault();

  navigation.classList.add(className);

  outsideClick(document.querySelector('.menu'), events, () => {
    navigation.classList.remove(className);
  });
}

function outsideClick(element, events, callback) {
  const html = document.documentElement;

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach((userEvent) =>
        html.removeEventListener(userEvent, handleOutsideClick),
      );

      callback();
    }
  }

  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) =>
      setTimeout(() => html.addEventListener(userEvent, handleOutsideClick)),
    );
    element.setAttribute(outside, '');
  }
}
