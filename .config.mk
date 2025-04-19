APP_NAME=$(shell basename $(shell pwd))
APP_VERSION=$(shell jq .version package.json)
