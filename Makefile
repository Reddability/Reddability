files = $(shell git ls-tree --name-only -r HEAD)
images = $(filter %.png,$(files))
imagesList = {$(subst $(space),$(comma),$(images))}

extensionFiles = $(strip $(filter-out Makefile README.md %.scss,$(files)))

extensionPath = publish/extension/
subredditPath = publish/subreddit/

comma := ,

# += adds a space, making $(space) equal to a space
space :=
space +=

all: subreddit extension

dev: subreddit extensionwebstore

subreddit: scss/subreddit.scss subredditimages
	sass --update scss/subreddit.scss:$(subredditPath)main.css --scss --sourcemap=none
	cd publish/subreddit; zip -r ../Reddability-stylesheet.zip *
	rm -rf $(subredditPath)

subredditimages:
	mkdir -p $(subredditPath)img
	cp $(imagesList) $(subredditPath)img

extensioncopy:
	while IFS=' ' read -ra ADDR; do \
		for i in "$${ADDR[@]}"; do \
			mkdir -p $(extensionPath)$$i; \
			rmdir $(extensionPath)$$i; \
			cp $$i $(extensionPath)$$i; \
		done \
	done <<< "$(extensionFiles)"

extension: scss/main.scss extensioncopy
	sass --update scss/main.scss:$(extensionPath)css/main.css --scss --sourcemap=none
	cd $(extensionPath); zip -r ../Reddability-extension.crx *
	rm -rf $(extensionPath)

extensionwebstore: extension
	cp publish/Reddability-extension.crx publish/Reddability-extension.zip

clean:
	rm -rf publish
