FROM meteorhacks/meteord:onbuild
MAINTAINER Maxime Quandalle <mquandalle@spartug.io>

# Run as you wish!
# docker run -d --name spartug-db mongo
# docker run -d --link "spartug-db:db" -e "MONGO_URL=mongodb://db" \
#   -e "ROOT_URL=http://example.com" -p 8080:80 mquandalle/spartug
