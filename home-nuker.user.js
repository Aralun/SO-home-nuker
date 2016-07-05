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

// To avoid having the "home" tab question list blinking we'll first hide it,
// then once it's changed we'll show it again
let didHide = false
if(!(document.URL.indexOf('questions') > -1)) {
  GM_addStyle(`
    #qlist-wrapper, .pager.fl, .page-sizer {
      display: none;
    }
  `)
  didHide = true
}

// Click on first next tab
window.addEventListener('load', () => {
  document.querySelector('span.intellitab:nth-child(2)').click()

  if(didHide) {
    const
        questionList = document.getElementById('qlist-wrapper')
        // We're going to wait for the question list to change,
        // indicating that we switched tab
        , observer = new MutationObserver(
          // We'll just wait for the first mutation
          // It should be triggered when the tab has loaded
          () => {
            // Add the default styles back.
            // Won't have any effect if we didn't alter them before
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

    observer.observe(
      questionList,
      observerConfig
    )
  }
})
