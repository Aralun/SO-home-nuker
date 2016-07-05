// ==UserScript==
// @name        home tab nuker
// @namespace   Kyll
// @description Removes home tab, shows first other tab by default
// @include     *://stackoverflow.com/*
// @version     1
// @grant       GM_addStyle
// @run-at      document-start
// @eat         Waffles
// ==/UserScript==

// Hide home
GM_addStyle(`
  span.intellitab:nth-child(1) {
    display : none!important;
  }
`)

// Click on first next tab
window.addEventListener('load', () => document.querySelector('span.intellitab:nth-child(2)').click())
