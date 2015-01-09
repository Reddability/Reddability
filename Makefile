files = $(shell git ls-tree --name-only -r HEAD)
images = $(filter %.png,$(files))
imagesList = {$(subst $(space),$(comma),$(images))}

chromeFiles = $(strip $(filter-out Makefile README.md .gitignore %.scss,$(files)))
safariFiles = $(strip $(filter-out Makefile README.md .gitignore %.scss _locales/% manifest.json,$(files)))
safariIcon = img/branding/app_iconx256.png

chromePath = publish/chrome/
safariPath = publish/Reddability.safariextension/
subredditPath = publish/subreddit/

comma := ,

# += adds a space, making $(space) equal to a space
space :=
space +=

all: subreddit chrome safari

dev: subreddit chromewebstore

subreddit: scss/subreddit.scss subredditimages
	sass --update scss/subreddit.scss:$(subredditPath)main.css --scss --sourcemap=none
	cd publish/subreddit; zip -r ../Reddability-stylesheet.zip *
	rm -rf $(subredditPath)

subredditimages:
	mkdir -p $(subredditPath)img
	cp $(imagesList) $(subredditPath)img

chromecopy:
	while IFS=' ' read -ra ADDR; do \
		for i in "$${ADDR[@]}"; do \
			mkdir -p $(chromePath)$$i; \
			rmdir $(chromePath)$$i; \
			cp $$i $(chromePath)$$i; \
		done \
	done <<< "$(chromeFiles)"

safaricopy:
	while IFS=' ' read -ra ADDR; do \
		for i in "$${ADDR[@]}"; do \
			mkdir -p $(safariPath)$$i; \
			rmdir $(safariPath)$$i; \
			cp $$i $(safariPath)$$i; \
		done \
	done <<< "$(safariFiles)"

chrome: scss/main.scss chromecopy
	sass --update scss/main.scss:$(chromePath)css/main.css --scss --sourcemap=none
	cd $(chromePath); zip -r ../Reddability-chrome.crx *
	rm -rf $(chromePath)

chromewebstore: chrome
	cp publish/Reddability-chrome.crx publish/Reddability-chrome.zip

safari: scss/main.scss safaricopy
	sass --update scss/safari.scss:$(safariPath)css/main.css --scss --sourcemap=none
	cp $(safariIcon) $(safariPath)/icon.png


clean:
	rm -rf publish
