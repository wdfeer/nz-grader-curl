# Setup
npm i jsdom

curl --cookie-jar cjar \
	--output log/one.html \
	"https://nz.ua/"
if [ -s "env/login.txt" ] && [ -s "env/password.txt" ]
then
	login=`cat env/login.txt`
	password=`cat env/password.txt`
else
	echo "Enter your nz.ua login:"
	read login
	echo "Enter your nz.ua password:"
	read -s password
fi
csrf=`node ./csrf-collector.js ./log/one.html`
curl --cookie cjar --cookie-jar cjar \
	--output log/two.html \
	--location \
	--data "_csrf=$csrf" \
	--data "LoginForm[login]=$login" \
	--data "LoginForm[password]=$password" \
	--data "LoginForm[rememberMe]=1" \
	"https://nz.ua/"
curl --cookie cjar --cookie-jar cjar \
	--output log/grades.html \
	"https://nz.ua/schedule/grades-statement"
echo -e `node grader.js ./log/grades.html`

# Clean up
mv cjar log/cjar