
apt-get install mysql-server
apt install python3-dev build-essential
apt install libssl1.1
apt install libssl1.1=1.1.1f-1ubuntu2
apt install libssl-dev
apt install libmysqlclient-dev
ufw enable 
ufw allow mysql
systemctl start mysql
systemctl enable mysql
mysql_secure_installation utility