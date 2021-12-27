[root@localhost ~]# vi if_and.sh
#!/bin/bash

echo "Do you want to install IOT2050FE Server?? Yes (y) or No (n)?"
read decision2

if [[ ( $decision2 == "y") ]]; then

sudo apt-get install curl software-properties-common 
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash - 
sudo apt-get install nodejs
sudo npm update
sudo npm i dotenv
sudo cp /home/ubuntu/IOT2050FEServer/IOT2050FE_Server_Service/mqttservice.sh /usr/bin/mqttservice.sh
sudo cp /home/ubuntu/IOT2050FEServer/IOT2050FE_Server_Service/dbapiservice.sh /usr/bin/dbapiservice.sh

sudo chmod +x /usr/bin/dbapiservice.sh
sudo chmod +x /usr/bin/mqttservice.sh


sudo cp /home/ubuntu/IOT2050FEServer/IOT2050FE_Server_Service/mqttservice.service /lib/systemd/system/mqttservice.service
sudo cp /home/ubuntu/IOT2050FEServer/IOT2050FE_Server_Service/dbapiservice.service /etc/systemd/system/dbapiservice.service

sudo chmod 644 /etc/systemd/system/mqttservice.service
sudo chmod 644 /etc/systemd/system/dbapiservice.service

sudo systemctl start mqttservice
sudo systemctl start dbapiservice

sudo systemctl enable mqttservice
sudo systemctl enable dbapiservice

//systemctl status IOTgatewatservice
echo "------Installation finished--------"
else
echo "------Instalation cancelled!!!--------"
fi

