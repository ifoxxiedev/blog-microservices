## Using curl
```shell
$ curl --header "Content-Type: application/json" --request POST --data '{"content":"Hello Dare!"}' http://localhost:4003/post/8d88c4546a48edc3cf633132d130/comments
$ curl --header "Accept: application/json" --request GET http://localhost:4003/post/8d88c4546a48edc3cf633132d130/comments
```