.PHONY: default
default: build

.PHONY: build
build: npm-build npm-check docker-build

npm-%:
	npm run $*

docker-%:
	docker $*

