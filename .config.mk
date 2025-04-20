APP_NAME = tiny-issue-tracker
APP_VERSION = $(shell jq -r .version $(PATH_TO_ROOT)/package.json)
