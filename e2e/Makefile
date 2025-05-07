.PHONY: default
default: db-setup run

.PHONY: db-setup
db-setup: db-up
	sleep 5 && \
	$(MAKE) db-push

.PHONY: db-up
db-up:
	docker-compose up -d

.PHONY: db-down
db-down:
	docker-compose down

# See https://dotenvx.com/ for more information about dotenvx

.PHONY: db-push
db-push:
	cd .. && \
	npx dotenvx run -f .env.test -- npx drizzle-kit push --force


.PHONY: run
run:
	cd .. && \
	npx dotenvx run -f .env.test -- echo "npm run test:e2e"
