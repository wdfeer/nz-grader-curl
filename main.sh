curl --cookie-jar cjar --output log/one.html https://nz.ua/
login=`cat env/login.txt`
password=`cat env/password.txt`
csrf="oHt8SCVsQ5Q4cc2AV301jKRh2i09WoH0CYY4yAym6m_vASV6Xxly809Du8RhMHTZ7xPpdwQMtZBtwGGqZ-SAPw=="
curl --cookie cjar --cookie-jar cjar \
	--output log/two.html \
	--location \
	--data "_csrf=$csrf" \
	--data "LoginForm[login]=$login" \
	--data "LoginForm[password]=$password" \
	--data "LoginForm[rememberMe]=1" \
	https://nz.ua/
mv cjar log/cjar
