.PHONY: default
default: setup run

.PHONY: setup
setup: down up
	sleep 5 && \
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
run:
	cd .. && \
	npx dotenvx run -f .env.test -- npm run test:e2e
