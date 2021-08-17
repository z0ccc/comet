# Reddit Wherever
<a href="https://chrome.google.com/webstore/detail/reddit-wherever/delfgcgfgfjlllhhcgiaacchlnhljbcm"><img src="https://raw.githubusercontent.com/z0ccc/Reddit-Wherever/master/promo/chrome.png" alt="Get Reddit Wherever for Chromium"></a>
<a href="https://addons.mozilla.org/en-CA/firefox/addon/reddit-wherever/"><img src="https://raw.githubusercontent.com/z0ccc/Reddit-Wherever/master/promo/firefox.png" alt="Get Reddit Wherever for Firefox"></a> 


View the Reddit comments of any YouTube video or web page.

By default YouTube comments will be replaced with the relevant Reddit comments. YouTube comments can still be viewed by clicking the YouTube icon located at the top right of the comments section.

If the extension icon turns red while browsing it means that the current web page has been submitted to Reddit. Clicking the icon will open a popup where you can view the posts and comments associated with the URL.

Options:

- Dark mode
- Run browser popup only when icon is clicked
- Show YouTube comments as default

Reddit Wherever contains no ads, collects no data and signup is not required.

![Image of YouTube comment section](https://raw.githubusercontent.com/z0ccc/Reddit-Wherever/master/promo/screenshot-1.png)

![Image of extension popup](https://raw.githubusercontent.com/z0ccc/Reddit-Wherever/master/promo/screenshot-2.png)

# Dev

Built with React, Typescript and Webpack.

Setup:

```
yarn install
yarn run start
```

Then load the dist folder as an unpacked extension in Chrome.

For the firefox version switch files in the 'firefox' folder and then re-build.

# Troubleshoot

If you're having problems that aren't addressed or fixed by this section please open an issue.

<br />

### The YouTube comments are stuck at 'loading...'.

If you are using the DuckDuckGo Privacy Essentials extension you must go to the settings of the DuckDuckGo extension and add api.reddit.com and youtube.com as unprotected sites.
 
If you are not using DuckDuckGo Privacy Essentials extension check if any other extensions are preventing the comments from loading.

<br />

### Dark theme is not loading.

If the default system theme is not automatically being selected (sometimes happens on linux), you can manually select the dark theme in the extension settings.