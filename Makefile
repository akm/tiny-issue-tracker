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

prod-%:
	$(MAKE) -C production $*
