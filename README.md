# Comet

| Chrome                                                                                                                                                                       | Firefox                                                                                                                       | Edge                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p align="center"><a href="https://chrome.google.com/webstore/detail/voat-reddit-comments-on-y/amlfbbehleledmbphnielafhieceggal"><img src="/promo/chrome_64x64.png"></a></p> | <p align="center"><a href="https://addons.mozilla.org/en-CA/firefox/addon/voat/"><img src="/promo/firefox_64x64.png"></a></p> | <p align="center"><a href="https://microsoftedge.microsoft.com/addons/detail/voat-reddit-comments-on/cccloigbofabjmobhmcnpaekcifmpjlb"><img src="/promo/edge_64x64.png"></a></p> |
| [Download](https://chrome.google.com/webstore/detail/voat-reddit-comments-on-y/amlfbbehleledmbphnielafhieceggal)                                                             | [Download](https://addons.mozilla.org/en-CA/firefox/addon/voat/)                                                              | [Download](https://microsoftedge.microsoft.com/addons/detail/voat-reddit-comments-on/cccloigbofabjmobhmcnpaekcifmpjlb)                                                           |

Replace Youtube comments with Reddit comments or view the Reddit comments of any webpage.

This browser extension allows users to replace the comment section on YouTube videos with the comments from the corresponding Reddit post. It also allows users to view the Reddit post and comments associated with the current URL in the extension popup.

By default YouTube comments will be replaced with the relevant Reddit comments. YouTube comments can still be viewed by clicking the YouTube icon located at the top right of the comments section.

The extension icon will turn blue when the current web page has been submitted to Reddit, and clicking on it will open a popup where users can view the posts and comments.

Voat contains no ads, collects no data and signup is not required.

Note: This extension is not affiliated with Reddit or YouTube.

![Image of extension popup with browser](/promo/screenshot1.png)

![Image of YouTube comment section](/promo/screenshot2.png)

![Image of extension popup](/promo/screenshot3.png)

# Troubleshoot

If you're having problems that aren't addressed or fixed by this section please open an issue.

### The YouTube comments are stuck at 'loading...' or 'Error: Reddit might be down or another extension is blocking Voat'.

Reddit.com or api.reddit.com may be down and you will have to wait until they are back up to use the extension.

If you are using the DuckDuckGo Privacy Essentials extension you must go to the settings of the DuckDuckGo extension and add api.reddit.com and youtube.com as unprotected sites.

If you are using uMatrix or uBlock origin advanced mode you need to allow the Reddit 3rd party domain to run on YouTube.

If you are not using any of these extensions check if any other extensions are preventing the comments from loading.

### Dark theme is not loading.

If the default system theme is not automatically being selected (sometimes happens on linux), you can manually select the dark theme in the extension settings.

# Dev

Install dependencies

```
yarn install
```

Build for Chromium

```
yarn build-chrome
```

Build for Firefox

```
yarn build-firfox
```
