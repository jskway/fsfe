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
