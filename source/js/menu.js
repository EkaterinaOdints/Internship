const body = document.querySelector('body');

const initMenu = () => {
  const header = body.querySelector('.page-header');
  const navigation = body.querySelector('.navigation-js');
  const menuButton = navigation.querySelector('.navigation-button-js');
  const menu = navigation.querySelector('.menu-js');
  const menuLinkCollection = menu.querySelectorAll('.menu-link-js');
  const submenuCollection = menu.querySelectorAll('.menu-item-sub-js');

  const SUBMENU_MARGIN_TOP = 15;
  let isMenuOpened = false;

  const updateCollectionTabIndex = (collection, tabIndex) => {
    collection.forEach((link) => {
      link.setAttribute('tabindex', tabIndex);
    });
  };

  const openSubmenu = (submenuList) => {
    submenuList.style.height = `${submenuList.scrollHeight}px`;
    submenuList.style.marginTop = `${SUBMENU_MARGIN_TOP}px`;

    const submenuLinkCollection = submenuList.querySelectorAll('.submenu-link-js');

    updateCollectionTabIndex(submenuLinkCollection, 0);

    submenuLinkCollection.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  };

  const closeSubmenu = (submenuList) => {
    submenuList.style.height = null;
    submenuList.style.marginTop = null;

    const submenuLinkCollection = submenuList.querySelectorAll('.submenu-link-js');

    updateCollectionTabIndex(submenuLinkCollection, -1);

    submenuLinkCollection.forEach((link) => {
      link.removeEventListener('click', closeMenu);
    });
  };

  const toggleSubmenu = (evt) => {
    const item = evt.target.parentNode;
    const submenuList = item.querySelector('.submenu-js');

    if (item.classList.contains('menu__item--opened')) {
      closeSubmenu(submenuList);
    } else {
      openSubmenu(submenuList);
    }

    item.classList.toggle('menu__item--opened');
  };

  function closeMenu() {
    submenuCollection.forEach((item) => {
      const submenuButton = item.querySelector('.submenu-button-js');
      submenuButton.removeEventListener('click', toggleSubmenu);

      closeSubmenu(item.querySelector('.submenu-js'));

      item.classList.remove('menu__item--opened');
    });

    updateCollectionTabIndex(menuLinkCollection, -1);

    menuLinkCollection.forEach((link) => {
      if (!link.classList.contains('submenu-button-js')) {
        link.removeEventListener('click', closeMenu);
      }
    });

    menu.setAttribute('aria-hidden', 'true');
    body.classList.remove('overlay');
    header.classList.remove('menu-opened');

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscapeClick);

    isMenuOpened = false;
  }

  const openMenu = () => {
    submenuCollection.forEach((item) => {
      const submenuButton = item.querySelector('.submenu-button-js');
      submenuButton.addEventListener('click', toggleSubmenu);
    });

    updateCollectionTabIndex(menuLinkCollection, 0);

    menuLinkCollection.forEach((link) => {
      if (!link.classList.contains('submenu-button-js')) {
        link.addEventListener('click', closeMenu);
      }
    });

    menu.removeAttribute('aria-hidden');
    body.classList.add('overlay');
    header.classList.add('menu-opened');

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onEscapeClick);

    isMenuOpened = true;
  };

  function onDocumentClick(evt) {
    if (evt.composedPath().includes(navigation)) {
      return null;
    } else {
      closeMenu();
    }
  }

  function onEscapeClick(evt) {
    if(evt.code === 'Escape'){
      closeMenu();
    }
  }

  const toggleMenu = () => {
    if (isMenuOpened) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  menuButton.addEventListener('click', toggleMenu);
};

initMenu();
