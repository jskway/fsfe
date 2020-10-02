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

### Nginx (engine-x)

Nginx is one of the most popular web servers. It's lightweight and extremely
fast.

Popular uses:

- Reverse proxy
- Web server
- Proxy server

**Proxy server**: a proxy server acts as an intermediary between a client and
destination server – it hides the identity of the client.

**Reverse proxy**: With a reverse proxy - the client doesn't know which server
it's connecting to. A reverse proxy hides the identity of the server.

**Web server**: Any internet server that responds to HTTP requests to deliver
content and services.

Install nginx

`sudo api install nginx`

Start nginx

`sudo service nginx start`

Now when you go to your domain (or public IP address), you should see the default
nginx welcome page.

Show nginx configuration

`sudo less /etc/nginx/sites-available/default`

Create and edit index.html

`sudo vi /var/www/html/index.html`

### NodeJS

Install NodeJS and npm

`sudo apt install nodejs npm`

Install git

`sudo api install git`

### Application Architecture

The difference between a senior engineer and a junior engineer is not about the
code, it's about the architecture. It's how you arrange your files, how you
arrange your code. How you think about long-term maintainability versus just
"I'm a hacker who solves bugs every day."

**Basic Application Architecture**

```
|- UI
  |-- css
  |-- js
  |-- html
|- helpers
|- utils
|- auth
```

As a full stack engineer, you have to think about your architecture, the stack
you're gonna use, the code you're gonna use - and think about 'can other people
use it'?

Change ownership of the www directory to the current user

`sudo chown -R $USER:$USER /var/www`

Create application directory

`mkdir /var/www/app`

Move into app directory and initialize empty git repo

`cd /var/www/app && git init`

Create directories

`mkdir -p ui/js ui/html ui/css`

Create empty app file

`touch app.js`

Initialize project

`npm init`

Install express

`npm i express --save`

Edit app

`vi app.js`

Create a barebones express server

https://expressjs.com/en/starter/hello-world.html

Run the app

`node app.js`

Now we need to tune Nginx to point to our Express app. To do that, we can use
directives.

Edit nginx config

`sudo vi /etc/nginx/sites-available/default`

```
location / {
  proxy_pass http://127.0.0.1:3000/;
}
```

This will pass all the traffic going to `/` (the root domain) to the actual Node
server on port 3000

Restart the nginx server

`sudo service nginx reload`

Make sure to start the node app back up before checking if it's live on your
domain.

It's inconvenient to run `node app.js` every single time after server restarts.
We can use a process manager to handle this.

### Process Manager

A **process manager**:

- Keeps your application running
- Handles errors and restarts
- Can handle logging and clustering

Install PM2

`sudo npm i -g pm2`

Start PM2

`pm2 start app.js`

Setup auto restart

`pm2 startup`

### Version Control

**Version control** records changes to a file system to preserve the history.

- Git
- Subversion
- Mercurial

1. Create git repository
2. Create SSH key

```
cd ~/.ssh/
ssh-keygen
```

3. Add SSH key to Github (https://github.com/settings/keys)
4. Add remote repo

```
cd /var/www/app/
```

https://docs.github.com/en/free-pro-team@latest/github/using-git/adding-a-remote

5. Push local repo to Github

After doing this we can develop locally, and push our changes to Github.
Then we can pull the changes down to our server, and restart the server.

[Back](./README.md)
