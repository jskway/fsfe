# Server Setup

## 1 - Update Software

Update software

`apt update`

Upgrade software

`apt upgrade`

## 2 - Create a new user

Add new user

`adduser $USERNAME`

## 3 - Make the user a super user

Add user to "sudo" group

`usermod -aG sudo $USERNAME`

Switch user

`su $USERNAME`

Check sudo access

`sudo cat /var/log/auth.log`

Your auth log is just a log people that are attempting to do something on your
server or log into your server. Everybody, all the time are going to try to
break into your server constantly, so don't be surprised by all the attempts on
your log. This is why we use SSH keys.

Log the first 10 lines of a file

`sudo head <file>`

Log the last 10 lines of a file

`sudo tail <file>`

Log and follow the last 10 lines of your auth log

`sudo tail -f /var/log/auth.log`

## 4 - Enable login for new user

Change to home directory

`cd ~`

Create a new ssh directory if it doesn't exist

`mkdir -p ~/.ssh`

Create authorized_keys file and paste PUBLIC key

`vim ~/.ssh/authorized_keys`

Exit

`$ exit`

`# exit`

Login with new user

`ssh $USERNAME@IP_ADDRESS`

## 5 - Disable the root user

Change file permissions

`chmod 644 ~/.ssh/authorized_keys`

Disable root login

`sudo vim /etc/ssh/sshd_config`

Inside sshd_config, set `PermitRootLogin` to `no`

Restart ssh daemon

`sudo service sshd restart`

[Back](./README.md)
