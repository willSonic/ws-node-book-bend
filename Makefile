
all:


CONTAINER_NAME = ws-node-book-bend-container
IMAGE_NAME = local-ws-node-book-bend-dev

build-clean:
	rm -rf node_modules
	rm -rf dist

clean: build-clean

build:
	docker build -t  ws-node-demo -f  .

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
