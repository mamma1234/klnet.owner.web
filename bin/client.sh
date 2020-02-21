cd ../material-react-mobx


docker build -t klnet.owner.web .

docker stop client

docker run -d -it --rm --name "client" -p 80:80 -v /KLNET/OWNER:/OWNER --link server1:server1 --link server2:server2 klnet.owner.web

echo "build finish"

docker logs -f client