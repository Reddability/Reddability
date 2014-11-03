##Reddablity
Reddit, but readable. A Google Chrome Extension made by Andreas Backx that can be downloaded right [at the Google Chrome Web Store](https://chrome.google.com/webstore/detail/reddability/plcdgkcofciichapgeafkaefggdnklho).

##Why should you use it and why did I make it?
I personally find Reddit not one of the most easy to browse websites nowadays. Since I'm on Reddit quite a bit, I decided do create something to make the experience even better. If you agree with me here, then I think this is a great Google Chrome Extension you should give a shot!

Besides the clean look, I often have Reddit open on one of the sides of my laptop and find the sidebar to be in the way. By hiding the sidebar, it is now possible to browse Reddit when doing something else in the meantime.

###Features
 - Images support more dense high resolution displays like a Retina display.
 - The right sidebar can be hidden.
 - Reddit makes better usage of larger screens.
 - A more clean and open look.
 - Fixes to make everything align better.
 - Full Reddit Enhancement Suite (RES) support.
 - Capitalization has been taken care of (mostly).
 - Spoiler tags used on some subreddits are supported.
 - Current localization for English, German, French and Dutch.

Feel free to fork the repository or issue any suggestions or bugs.

##Setup and compiling
The repository does not include the compiled CSS files to keep the commits clean. In order to compile the scss-files, you will need to install a compiler. [SCSS compilers can be found on their website.](http://sass-lang.com/install)

Make sure the compiler does not export the `_*.scss` files since these are imported in `main.scss`.

###Compile for a Google Chrome Extension
You need to compile `scss/main.scss` and export it to `css/main.css`. Then enable the developer mode in Google Chrome and load the rootfolder of this project.

###Compile for a subreddit
If you want to use Reddability on your subreddit, there is `scss/subreddit.scss` that you can compile. Just make sure you also upload the images. Do not rename the images or it will give problems.

##License
Reddability, a simple Google Chrome Extension that keeps Reddit, but makes it readable.

Copyright (C) 2014  Andreas Backx

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
