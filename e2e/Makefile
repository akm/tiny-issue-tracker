.PHONY: default
default: setup run

# https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#default-environment-variables
ifeq (${GITHUB_ACTIONS},true)
DB_CONNECTION_INTERVAL:=10
else
DB_CONNECTION_INTERVAL?=5
endif

.PHONY: setup
setup: down up
	sleep $(DB_CONNECTION_INTERVAL) && \
	$(MAKE) db-push

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

# See https://dotenvx.com/ for more information about dotenvx

.PHONY: db-push
db-push:
	cd .. && \
	npx dotenvx run -f .env.test -- npx drizzle-kit push --force


.PHONY: run
run: run-test-crud run-test-create run-test-list

.PHONY: run-test-crud
run-test-crud:
	cd .. && npx dotenvx run -f .env.test -- npx playwright test e2e/login-and-crud.test.ts

.PHONY: run-test-create
run-test-create:
	cd .. && npx dotenvx run -f .env.test -- npx playwright test e2e/01_organization_create.test.ts

.PHONY: run-test-list
run-test-list:
	cd .. && npx dotenvx run -f .env.test -- npx playwright test e2e/02_organization_list.test.ts
