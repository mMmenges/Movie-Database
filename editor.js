/*
mongoimport --host atlas-jqm3mv-shard-0/myflixdb-shard-00-00.ugffl.mongodb.net:27017,myflixdb-shard-00-01.ugffl.mongodb.net:27017,myflixdb-shard-00-02.ugffl.mongodb.net:27017 --ssl --username myflixDBadmin --password <PASSWORD> --authenticationDatabase admin --db <DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>
mongo "mongodb+srv://myflixdb.ugffl.mongodb.net/<myFlixDB>" --username <User_Michael>

mongoimport --host
atlas-jqm3mv-shard-0/myflixdb-shard-00-00.ugffl.mongodb.net:27017,
myflixdb-shard-00-01.ugffl.mongodb.net:27017,
myflixdb-shard-00-02.ugffl.mongodb.net:27017 
--ssl --username myflixDBadmin --password <PASSWORD>
 --authenticationDatabase admin --db <DATABASE>
  --collection <COLLECTION>
   --type <FILETYPE>
    --file <FILENAME>


// 27.07.2020

mongoimport --host atlas-jqm3mv-shard-0/myflixdb-shard-00-00.ugffl.mongodb.net:27017,myflixdb-shard-00-01.ugffl.mongodb.net:27017,myflixdb-shard-00-02.ugffl.mongodb.net:27017 --ssl --username myflixDBadmin --password control --authenticationDatabase admin --db myFlixD --collection movies --type json --file ../exported_collections/movies.json

mongo "mongodb+srv://myflixdb.ugffl.mongodb.net/myFlixDB" --username myflixDBadmin */

mongodb + srv: //myflixDBadmin:control>@myflixdb.ugffl.mongodb.net/myFlixDB?retryWrites=true&w=majority