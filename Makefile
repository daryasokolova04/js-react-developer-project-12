start-frontend:
	make -C frontend start

start-backend:
	npx start-server

build:
	rm -rf frontend/build
	npm run build


start:
	make start-backend