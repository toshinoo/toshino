# Toshino
4chan quality of life improvements

Toshino is a userscript designed to co-exist with the native extension

## Install
You need a userscript manager to install toshino permanently, the recommended one is [Violentmonkey](https://violentmonkey.github.io/).

Then you can just open [toshino.user.js](https://raw.githubusercontent.com/toshinoo/toshino/main/toshino.user.js) in your browser and confirm the installation.

Toshino's menu will appear next to the 4chan's native settings menu on the navbar, below boards.

That's it!

### One-time use
If you don't have a userscript manager and you just want to try out the script, open [toshino.user.js](https://raw.githubusercontent.com/toshinoo/toshino/main/toshino.user.js) in your browser, copy all contents, and paste the script to your browser's console (on 4chan). This way the script will be active until you reload the page. A convenient way to see if you like it.

## Common problems / questions

### "I don't see the settings menu!"

You need to enable `persistent drop-down navigation bar` in `Navigation`

### "Strip 4chan links from tracking doesn't do anything!"

Enable `Linkify URLs` in `Miscellaneous`

### What does WIP mean?

Work in progress. Features labeled as WIP may have occasional bugs or may be not implemented entirely, but should work fine for the majority of time

## Features

### Strip 4chan links from tracking
Links on 4chan don't take you to the destination you would expect, you are instead directed to a page which only purpose is to redirect you to the correct address. This could be used to track what links you click, and also takes some time before you are redirected. This option allows to completely disable this behavior.

### Add a scroll to top/bottom button
Lets you scroll to the top/bottom of the page by clicking one of the two buttons added by this button. Especially useful on mobile, but handy on desktop too.

### Hide namefags' posts
This options hides replies of users who chose to break the anonymity on the board. Doesn't hide replies to namefags, which can be used to read the namefags's post.

### Move pagination to the top of the page
Pagination gets docked to the navbar in the upper right hand corner, and jumps to the place you are used to seeing it only when it is expected to be there.

### Center hovered images
Speaks for itself.

### Move backlinks below replies
Basically moves backlinks to the bottom of replies saving space. Some users like it that way, some don't. Very useful on mobile devices.

### Hide side arrows
Hides the two arrows that point to every reply on the board. Not sure why they are here for the first place

#### And much, much more!
More features are continously being added and worked on, I didn't list some of the already implemented features here on purpose, I encourage you to check them out by yourself
