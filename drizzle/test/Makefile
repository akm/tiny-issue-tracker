.PHONY: default
default: setup test

# https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#default-environment-variables
ifeq (${GITHUB_ACTIONS},true)
DB_CONNECTION_INTERVAL:=10
else
DB_CONNECTION_INTERVAL?=5
endif

.PHONY: setup
setup: down up
	sleep $(DB_CONNECTION_INTERVAL)
.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

.PHONY: test
test:
	cd ../.. && \
	npx dotenvx run -f .env.test -- npm run atlas:migrate:apply
