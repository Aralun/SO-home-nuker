// ==UserScript==
// @name        home tab nuker
// @namespace   Kyll
// @description Removes home tab, shows first other tab by default
// @include     *://stackoverflow.com/
// @include     *://stackoverflow.com/questions/*
// @version     2
// @grant       GM_addStyle
// @run-at      document-start
// @eat         Waffles
// ==/UserScript==

// Hide "home" tab forever
GM_addStyle(`
  span.intellitab:nth-child(1) {
    display : none!important;
  }
`)

// Only do something if we're on the home tab
if(!(document.URL.indexOf('questions') > -1)) {
  // To avoid having the "home" tab question list blinking we'll first hide it,
  // then once it's changed we'll show it again
  GM_addStyle(`
    #qlist-wrapper, .pager.fl, .page-sizer {
      display: none;
    }
  `)
  window.addEventListener('load', () => {
    // Click on first next tab
    document.querySelector('span.intellitab:nth-child(2)').click()

    const
        questionList = document.getElementById('qlist-wrapper')
        // We're going to wait for the question list to change,
        // indicating that we switched tab
        , observer = new MutationObserver(
          () => {
            GM_addStyle(`
                #qlist-wrapper, .pager.fl, .page-sizer {
                  display: inline;
                }
            `)
            observer.disconnect()
          }
        )
        , observerConfig = {
          childList: true,
        }

    observer.observe(questionList, observerConfig)
  })
}
