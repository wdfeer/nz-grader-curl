curl --cookie-jar cjar --output log/one.html https://nz.ua/
login=`cat env/login.txt`
password=`cat env/password.txt`
echo "Enter the CSRF:"
read csrf
curl --cookie cjar --cookie-jar cjar \
	--output log/two.html \
	--location \
	--data "_csrf=$csrf" \
	--data "LoginForm[login]=$login" \
	--data "LoginForm[password]=$password" \
	--data "LoginForm[rememberMe]=1" \
	https://nz.ua/
mv cjar log/cjar