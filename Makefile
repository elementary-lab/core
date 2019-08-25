build:
	docker-compose build
down:
	docker-compose down
up:
	docker-compose up
clear:
	sudo rm -rf app/node_modules
	sudo rm -rf app/yarn-error.log

fix-permission:
	sudo chown -R $(shell whoami):$(shell whoami) *
	sudo chown -R $(shell whoami):$(shell whoami) .docker/*/logs/
