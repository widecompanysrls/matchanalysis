apt-get install mysql-server
ufw enable 
ufw allow mysql
systemctl start mysql
systemctl enable mysql
mysql_secure_installation utility