cd ..

docker build -t klnet.owner.node .

docker stop server1

docker run -d -it --rm --name "server1" -p 5001:5000 -v /KLNET/OWNER:/OWNER klnet.owner.node

echo "build finish"

docker logs -f server1