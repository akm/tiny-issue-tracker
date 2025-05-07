PATH_TO_ROOT=.

include $(PATH_TO_ROOT)/.config.mk

.PHONY: default
default: build check lint

.PHONY: build
build: npm-install

.PHONY: check
check: npm-run-check

.PHONY: lint
lint: npm-run-lint

.PHONY: test
test: test-unit test-e2e

.PHONY: test-unit
test-unit:
	npm run test:unit

.PHONY: test-e2e
test-e2e:
	$(MAKE) -C test/e2e

npm-run-%:
	npm run $*

npm-install:
	npm install

GOOS=$(shell go env GOOS)
GOARCH=$(shell go env GOARCH)
DOCKER_ARCH=$(shell docker info 2>/dev/null | grep Architecture: | cut -d ':' -f 2 | xargs echo)

.PHONY: docker-build
ifeq ($(GOOS),darwin)
docker-build: npm-run-build docker-build-native docker-build-x86_64
else ifeq ($(GOOS),linux)
docker-build: npm-run-build docker-build-native
else
docker-build:
	echo "Unsupported OS: $(GOOS)"
endif

.PHONY: docker-build-native
docker-build-native:
	docker build -t $(APP_NAME):$(APP_VERSION)-$(DOCKER_ARCH) .

.PHONY: docker-build-x86_64
docker-build-x86_64:
	docker build -t $(APP_NAME):$(APP_VERSION)-x86_64 --platform linux/amd64 .

ARCHIVE_DIR=./archive
$(ARCHIVE_DIR):
	mkdir -p $(ARCHIVE_DIR)

.PHONY: build-archive
ifeq ($(GOOS),darwin)
docker-archive: docker-build docker-save-native docker-save-x86_64
else ifeq ($(GOOS),linux)
docker-archive: docker-build docker-save-native
else
docker-archive:
	echo "Unsupported OS: $(GOOS)"
endif

.PHONY: docker-save-native
docker-save-native: $(ARCHIVE_DIR)
	docker save $(APP_NAME):$(APP_VERSION)-$(DOCKER_ARCH) | gzip > $(ARCHIVE_DIR)/$(APP_NAME)-$(APP_VERSION)-$(DOCKER_ARCH).tar.gz

.PHONY: docker-save-x86_64
docker-save-x86_64: $(ARCHIVE_DIR)
	docker save $(APP_NAME):$(APP_VERSION)-x86_64 | gzip > $(ARCHIVE_DIR)/$(APP_NAME)-$(APP_VERSION)-x86_64.tar.gz
