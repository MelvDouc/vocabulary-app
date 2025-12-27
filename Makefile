.PHONY: help up down build install

help:
	@echo "make up|down MODE=prod|dev"
	@echo "make build APP=server|client"
	@echo "make install APP=server|client"

up:
	docker compose -f docker-compose.$(MODE).yml up --build

down:
	docker compose -f docker-compose.$(MODE).yml down

build:
	npm --prefix $(APP) run build

install:
	npm --prefix $(APP) install