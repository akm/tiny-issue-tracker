PATH_TO_ROOT:=..
include ./.config.mk

.PHONY: default
default: build

.PHONY: build
build:
	$(MAKE) -C .. build

SECRET_ENVS=$(shell cat .env)
CONTAINER_ENVS=\
	APP_NAME=$(APP_NAME) \
	APP_VERSION=$(APP_VERSION) \
	MYSQL_ROOT_PASSWORD=$(MYSQL_ROOT_PASSWORD) \
	MYSQL_PASSWORD=$(MYSQL_PASSWORD) \
	MYSQ_DATABASE=$(MYSQ_DATABASE) \
	GOOGLE_AUTH_CALLBACK_ORIGIN=$(GOOGLE_AUTH_CALLBACK_ORIGIN) \
	$(SECRET_ENVS)

.PHONY: upd
upd:
	$(CONTAINER_ENVS) docker compose up -d

.PHONY: down
down:
	$(CONTAINER_ENVS) docker compose down

.PHONY: clean
clean:

.PHONY: clobber
clobber: down clean
	rm -rf data	
