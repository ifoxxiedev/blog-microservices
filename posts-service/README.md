## Using curl
```shell
$ curl --header "Content-Type: application/json" --request POST --data '{"title":"post1"}' http://localhost:4000/posts
$ curl --header "Accept: application/json" --request GET http://localhost:4000/posts
```