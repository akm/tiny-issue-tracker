PATH_TO_ROOT=.

include $(PATH_TO_ROOT)/.config.mk

.PHONY: default
default: build

.PHONY: build
build: npm-install docker-build

npm-run-%:
	npm run $*

npm-install:
	npm install

.PHONY: docker-build
docker-build: npm-run-build
	docker build . -t $(APP_NAME):$(APP_VERSION)

ARCHIVE_DIR=./archive
$(ARCHIVE_DIR):
	mkdir -p $(ARCHIVE_DIR)

.PHONY: build-archive
build-archive: docker-build docker-save

.PHONY: docker-save
docker-save: $(ARCHIVE_DIR)
	docker save $(APP_NAME):$(APP_VERSION) | gzip > $(ARCHIVE_DIR)/$(APP_NAME)-$(APP_VERSION).tar.gz
