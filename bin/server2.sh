cd ..

docker build -t klnet.owner.node .

docker stop server2

docker run -d -it --rm --name "server2" -p 5002:5000 -v /KLNET/OWNER:/OWNER klnet.owner.node

echo "build finish"

docker logs -f server2