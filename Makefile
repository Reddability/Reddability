files=$(shell git ls-tree --name-only -r HEAD)
images=$(filter %.png, $(files))

comma := ,
# += adds a space, making $(space) equal to a space
space :=
space +=

subreddit: scss/subreddit.scss subredditimages
	sass --update scss/subreddit.scss:publish/subreddit/main.css --scss --sourcemap=none
	cd publish/subreddit; zip -r ../subreddit.zip *

subredditimages:
	mkdir -p publish/subreddit/img
	cp {$(subst $(space),$(comma),$(images))} publish/subreddit/img

clean:
	rm -rf publish
