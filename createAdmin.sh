#/bin/bash

DATABASE='bot'
ADMIN_ID='346981846653075459'
KEY=`node -e '\
const { createDiffieHellman } = require("crypto"); \
const hell = createDiffieHellman(256);\
hell.generateKeys();\
console.log(hell.getPrivateKey("hex"));'`

echo $KEY

psql --dbname=$DATABASE -c "INSERT INTO user_entity(id, role, key) VALUES('$ADMIN_ID', 'admin', '$KEY');"
psql --dbname=$DATABASE -c "INSERT INTO inventory_entity(id) VALUES('$ADMIN_ID');"
psql --dbname=$DATABASE -c "INSERT INTO profile_entity(id) VALUES('$ADMIN_ID');"