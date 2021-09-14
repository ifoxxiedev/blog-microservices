## Using curl
```shell
$ curl --header "Content-Type: application/json" --request POST --data '{"type":"NewEvent!", "data": "{}"}' http://localhost:4005/events
$ curl --header "Accept: application/json" --request GET http://localhost:4005/events
```