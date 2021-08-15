# Reddit Wherever

View the Reddit comments of any YouTube video or web page.

By default YouTube comments will be replaced with the relevant Reddit comments. YouTube comments can still be viewed by clicking the YouTube icon located at the top right of the comments section.

If the extension icon turns red while browsing it means that the current web page has been submitted to Reddit. Clicking the icon will open a popup where you can view the posts and comments associated with the URL. 

Options:
- Dark mode (based on system settings)
- Run browser popup only when icon is clicked
- Show YouTube comments as default

Reddit Wherever contains no ads, collects no data and signup is not required.

Download from Chrome Web Store:

https://chrome.google.com/webstore/detail/reddit-wherever/delfgcgfgfjlllhhcgiaacchlnhljbcm

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

Switch files in the 'firefox' folder and then re-build for firefox version. 