const version = "0.26"

const metadata = 
`// ==UserScript==
// @name        toshino
// @namespace   Violentmonkey Scripts
// @match       *://boards.4channel.org/*/*
// @match       *://boards.4chan.org/*/*
// @grant       none
// @version     ${version}
// @author      toshino developer
// @run-at      document-end
// @homepageURL https://github.com/toshinoo/toshino
// @downloadURL https://github.com/toshinoo/toshino/raw/main/toshino.user.js
// @description 4chan quality of life tweaks
// @icon https://raw.githubusercontent.com/toshinoo/toshino/main/icon.png
// ==/UserScript==

`

export default {
	input: 'src/main.js',
	output: [
		{
			file: 'toshino.user.js',
			format: 'cjs',
			banner: metadata,
		}
	]
};