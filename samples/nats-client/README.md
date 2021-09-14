# Running nats on docker
```
$ docker run -d -p 8222:8222 -p 4222:4222 nats-streaming -p 4222 -m 8222 -hbi 5s -hbt 5s -hbf 2 -SD -cid eventbus
```