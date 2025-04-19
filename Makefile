PATH_TO_ROOT=.

include $(PATH_TO_ROOT)/.config.mk

.PHONY: default
default: build

.PHONY: build
build: npm-install npm-run-build docker-build

npm-run-%:
	npm run $*

npm-install:
	npm install

.PHONY: docker-build
docker-build:
	docker build . -t $(APP_NAME):$(APP_VERSION)
