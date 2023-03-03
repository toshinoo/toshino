const version = 0.8

const metadata = 
`// ==UserScript==
// @name        toshino
// @namespace   Violentmonkey Scripts
// @match       *://boards.4channel.org/*/*
// @match       *://boards.4chan.org/*/*
// @grant       none
// @version     ${version}
// @author      - https://github.com/toshinoo/toshino
// @description  4chan quality of life tweaks
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