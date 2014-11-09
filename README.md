##Reddability
Reddit, but readable. A Google Chrome Extension made by Andreas Backx that can be downloaded right [at the Google Chrome Web Store](https://chrome.google.com/webstore/detail/reddability/plcdgkcofciichapgeafkaefggdnklho).

If you have any questions, feel free to join the #reddability channel on the [Freenode IRC network](https://freenode.net/).

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
The repository does not include the compiled CSS files to keep the commits clean. In order to compile the scss-files, you will need to install the command line sass compiler. [How to install the command line sass compiler can be found here.](http://sass-lang.com/install) Secondly you'll need to have `make` available. Once ready, just run the command `make` in the root project folder. The .crx file for the extension and .zip file containing the subreddit stylesheet and images will be published to a newly generated folder publish. There is no need to rename the images when you are uploading them to Reddit, everything is taken care of.

Please refer to Reddabiltiy in the sidebar when you are using Reddabilty as the stylesheet on your subreddit. This way I can get more feedback and are bugs quickly reported and to the right person. You can copy and paste the following or be creative and create your own!

```
This subreddit uses the Reddability stylesheet made by Andreas Backx. [More information.](https://github.com/AndreasBackx/Reddability/)
```

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
