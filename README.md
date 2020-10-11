## Introduction

### Terminal vs Shell

**Terminal**: Runs shell applications (eg. iTerm2)

**Shell**: Command interpreter that interfaces with the system (eg. bash, zsh,
fish)

**ping \<url\>** - used as a simple way to verify that a computer can communicate
over the network with another computer

**traceroute \<url\>** - shows you the route a packet takes, starting from your computer
to the destination

## Servers

**kernel**: the core component of an operating system. It acts as
a bridge between applications and the machine hardware. It's responsible for
low-level tasks such as: disk management, task management and memory management.

**utilities (OS)**: essentially tiny little applications that do one thing

**SSH (Secure Shell):** enables you to securely log on
to a remote computer and perform shell and network services.

A **SSH key pair** is made up a public key and a private key. The private key stays
on your computer and the public key goes on a server. Everything is encrypted
with the private key.

### Creating ssh keys

Move into .ssh directory

`cd ~/.ssh`

Generate ssh key

`ssh-keygen`

\<filename\>.pub is the public SSH key, which you can copy and add to your
server instance.

### Connecting to the server

SSH into server

`ssh root@<SERVER_IP>`

If you get Permission Denied, it's because the default key pair is `id_ssh` and
SSH is going to try to look there first. If that doesn't work, it essentially
says "I don't know, your key is not matching the public key that we have in the
server". We get solve this by running:

`ssh -i <private_key_name> root@<SERVER_IP>`

On the latest versions of macOS, once you've successfully connected it will
automatically add the private key to the keychain so can just run
`ssh root@<SERVER_IP>` in the future.

## Domain Setup

### DNS Records

**A Records**: map names to IP addresses

**CNAME**: map names to other names (eg. custom domain -> netlify
domain)

Add 2 `A Records` with your IP address

- @
- www

Add the A Records with your new domain on your cloud provider's dashboard

Update the nameservers on your domain registrar's dashboard

## [Server Setup (Ubuntu)](./serverSetup.md)

1. Update software
2. Create a new user
3. Make that user a super user
4. Enable login for new user
5. Disable root login

** You always want to disable root login. There's never a reason to login as
root. It will only expose yourself to more attacks. **

## Bash Basics

### Standard Streams

**Standard Streams** are interconnected input/output
communication channels between a computer program and its environment.

- Standard output (`stdout`)

- Standard input (`stdin`)

- Standard error (`stderr`)

This is the standard API across nearly all Unix applications.

### Redirection

- | (read from stdout)
- \> (write stdout to file)
- \>\> (append stdout to file)
- < (read from stdin)
- 2> (read from stderr)

`ps` - shows a snapshot of the current processes

`grep 'REGEX_PATTERN'` - prints lines that match patterns

`ps | grep bash` - takes all the output of PS, passes it to `grep` which will
run a regex on it, and returns the lines that match `bash`

### Finding Things

#### Find

`find /directory -option file.txt` - search for file/folder names

Find all log files in /var/log/nginx

`find /var/log/nginx -type f -name "*.log"`

Find all directories with the name 'log'

`find / -type d -name log`

#### Grep

`grep -options 'expression' /path/to/directory` - search file contents

Over time, log files automatically get concatenated and gzipped. zgrep can be
very useful for searching inside these files.

`zgrep FILE` - search inside gzip file

Find running node processes

`ps aux | grep node`

## Security

Read auth log

`sudo cat /var/log/auth.log`

### Security Checklist

- SSH
- Firewalls
- Updates
- Two factor authentication
- VPN

#### Application Updates

Install unattended upgrades

`sudo apt install unattended-upgrades`

This will automatically upgrade your software for security or minor fixes

View configuration file

`cat /etc/apt/apt.conf.d/50unattended-upgrades`

#### Firewalls

**Firewall:** A network security device that monitors incoming and outgoing
network traffic and decides whether to allow or block specific traffic based on
a defined set of security rules.

**nmap:** a port scanner that can run over an entire range of ip addresses and
checks for open ports

**port**: a communication endpoint that maps to a specific process or network
service

Every port that is open to the Internet exposes another potential vulnerability
that can be exploited.  In general, you want the minimum amount of ports you
need running - ports are closed by default.

Install nmap

`sudo apt install nmap`

Run nmap

`nmap YOUR_SERVER_IP_ADDRESS`

Run nmap with more service/version info

`nmap -sV YOUR_SERVER_IP_ADDRESS`

#### ufw

**ufw (uncomplicated firewall)**: a program for managing a Linux firewall 

Check firewall status

`sudo ufw status`

Enable ssh

`sudo ufw allow ssh`

Enable http

`sudo ufw allow http`


Enable firewall

`sudo ufw enable`

#### Permissions

Permissions are kind of based on the idea that eventually someone probably will
get into your server.  Permissions mean locking down what you can do with a
file. Eg. read, write and execute.

[Linux Chmod Permissions Cheat Sheet](https://isabelcastillo.com/linux-chmod-permissions-cheat-sheet)

Apply the least priviledge principle - don't give any  more permissions then a user
needs.

#### Upgrade Node

[Nodesource](https://github.com/nodesource/distributions)




