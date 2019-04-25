
all:


CONTAINER_NAME = ws-node-book-bin-container
IMAGE_NAME = local-ws-node-book-bin-dev

MONGODB_PRIMARY = mongodb-primary
REDIS_DB_CONTAINER = tokenholder


build-clean:
	rm -rf node_modules
	rm -rf dist

clean: build-clean

build:
	docker build -t  ws-node-book-bin -f  .

build-dev:
	docker build -t $(IMAGE_NAME) -f Dockerfile.dev .


run-container:
	docker run --name $(CONTAINER_NAME) -d -p 8080:8080  $(IMAGE_NAME)

start:
	docker start $(CONTAINER_NAME)

stop:
	docker stop $(CONTAINER_NAME)


flush:
	docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME)

rm:
	docker rm $(CONTAINER_NAME)

rm-image:
	docker rmi $(IMAGE_NAME)

up:
	docker-compose up

down:
	docker-compose down

logs:
	docker logs -f  $(CONTAINER_NAME)

ssh-exec:
	docker exec -it $(CONTAINER_NAME) sh

mongo-dump-primary:
	docker exec $(MONGODB_PRIMARY) sh -c 'mongodump --archive' > ../mongo-dump/db.dump


mongo-restore-primary:
	docker exec -i $(MONGODB_PRIMARY) sh -c 'mongorestore --archive' < ../mongo-dump/db.dump

redis-cli:
	docker exec -it  $(REDIS_DB_CONTAINER) redis-cli
