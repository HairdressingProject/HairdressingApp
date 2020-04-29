# Hairdressing App
This project was assigned to us ([Gerardo Gornes](https://github.com/ggornes "ggornes"), [Diego C.](https://github.com/diego-cc "diego-cc"), [Stefan S.](https://github.com/stefan-solmundson "stefan-solmundson"), [Maddy F.](https://github.com/maddyferraloro "maddyferraloro") and [Frazer M.](https://github.com/Frazer-McLennan "Frazer-McLennan")) for our Diploma of Software Development at North Metropolitan TAFE to be developed over the year 2020.

# Table of contents

  * [Setting up your local development environment](#setting-up-your-local-development-environment)
      - [1 - Clone the repository](#1---clone-the-repository)
      - [2 - Move to the repository's directory](#2---move-to-the-repositorys-directory)
      - [3 - Create your own branch (important!)](#3---create-your-own-branch-important)
      - [4 - Update your branch to a more recent version](#4---update-your-branch-to-a-more-recent-version)
      - [Frontend](#frontend)
        * [5 - Install packages](#5---install-packages)
        * [6 - Start server](#6---start-server)
      - [Backend](#backend)
        * [7 - Database setup (without Laragon)](#7---database-setup-without-laragon)
        * [8 - Creating and seeding the database](#8---creating-and-seeding-the-database)
        * [9 - Running the API server](#9---running-the-api-server)
        * [10 - Testing backend connection](#10---testing-backend-connection)
          + [10.1 - Sign in](#101---sign-in)
        * [11 - Push into the remote repository](#11---push-into-the-remote-repository)  
  * [FAQ](#faq)
    + [My branch is missing lots of files and it looks completely different from the others.](#my-branch-is-missing-lots-of-files-and-it-looks-completely-different-from-the-others)
    + [How can I check another person's branch to compare it to mine?](#how-can-i-check-another-persons-branch-to-compare-it-to-mine)
    + [I made a mistake in my commit and want to revert it to the previous one, how do I do that?](#i-made-a-mistake-in-my-commit-and-want-to-revert-it-to-the-previous-one-how-do-i-do-that)
    + [How do I update my local branch?](#how-do-i-update-my-local-branch)
    + [How do I delete a branch?](#how-do-i-delete-a-branch)
    + [I can't run the application, Yarn says "[something] is not defined"](#i-cant-run-the-application-yarn-says-something-is-not-defined)
    + [Why not just work on the master branch?](#why-not-just-work-on-the-master-branch)    
  * [Documentation & Trello](#documentation--trello)

## Setting up your local development environment
To start working on the Admin Portal, a few steps are necessary:

#### 1 - Clone the repository
`git clone https://github.com/HairdressingProject/HairdressingApp.git`

#### 2 - Move to the repository's directory
`cd HairdressingApp`

#### 3 - Create your own branch (important!)
`git checkout -b [your branch's name]`

> The `-b` flag creates a new branch.

#### 4 - Update your branch to a more recent version
The master branch should now always be the most up-to-date one.

~~For this step, you can use any remote branch that has recent commits. For instance:~~

~~`git merge origin/master-d` or `git merge origin/master-g`~~

#### Frontend

##### 5 - Install packages
Move to the `Admin/Frontend` directory and run:

`yarn`

##### 6 - Start server
`yarn start:frontend`

#### Backend

##### 7 - Database setup (without Laragon)
If you do not have Laragon installed or wish to get the database up and running without using it, head to [MySQL Community Download](https://dev.mysql.com/downloads/installer/ "Download MySQL installer") and download MySQL (choose any option, the first one requires internet connection when you install MySQL). 

This [tutorial](https://mysql.tutorials24x7.com/blog/how-to-install-mysql-8-on-windows "How To Install MySQL 8 on Windows") might help if you are on Windows.

##### 8 - Creating and seeding the database
After downloading and installing MySQL, run `mysql -u root` in your terminal and follow the steps as described in the [database.sql](https://github.com/HairdressingProject/HairdressingApp/blob/master/Database/database.sql "Hairdressing Project database") file.

__NOTE__: Do **not** copy and paste the entire file into your terminal, do it step by step.

##### 9 - Running the API server
In your terminal, move to the `Admin/Backend/AdminApi` directory and run: 

`dotnet watch run`

The previous command is also available from the `Admin/Frontend` directory by running:

`yarn start:backend`

If no errors are shown and your frontend environment is also working, you can now run both simultaneously from the `Admin/Frontend` directory with:

`yarn start`

> Take note of the URL / port number that your server is running on, should be either 5000 for the HTTP protocol or 5001 for HTTPS.

Now you should be ready to connect to the backend.

##### 10 - Testing backend connection
I recommend using [Postman](https://www.postman.com/ "Postman") for this step. After you download and install it, follow the steps below to test the backend:

###### 10.1 - Sign in
As authentication has been implemented, most routes will not be available unless you are signed in. To do that, copy and paste this URL to the address bar in Postman and change the request method from `GET` to `POST`:

`https://localhost:5000/api/users/sign_in`

Now click on the request `Body` tab and select the `raw` option. Change the dropdown from `Text` to `JSON`. Copy and paste the JSON request body below into Postman:

`{
	"UserName": "admin",
	"UserPassword": "123456"
}`

This is a sample admin account that was previously seeded into the database. See step **8** if you have not yet done so.

Once you have entered those details in the request body, you are ready to submit your request to the backend. Simply click the `Send` button to do so.

![Postman setup][Postman]

[Postman]: https://imgur.com/U42bBLQ.png "Postman setup"

If you got a JSON response like the one in the picture, you're good to go.

If you wish to test other routes, you should now go to the `Authorization` tab in Postman, select the `Bearer Token` type and copy and paste the `token` that you got into the Token field. This token was digitally signed when you sent the previous `POST` request to `/api/users/sign_in` and will be authenticated in subsequent requests.

##### 11 - Push into the remote repository
After you have committed the first few changes changes in your local repository, run:

`git push -u origin [your branch's name]`

> The `-u` flag sets your local branch to track the remote one (`origin/[your branch's name]`)

Then, to submit those changes to the `master` branch, go to https://github.com/HairdressingProject/HairdressingApp/pulls and open a new pull request. Select your branch from the dropdown on the right to compare it to the `master` branch. Even if there are any merge conflicts, you can still submit it and we can review it later.

![Submitting a PR][PR]

[PR]: https://imgur.com/kjsp10b.jpg "Submitting a Pull Request"

If you had any issues along the way, see the FAQ below.

## FAQ

### My branch is missing lots of files and it looks completely different from the others.
Most likely something went wrong when you tried to update your branch. Ask us on Slack and we will figure it out.

### How can I check another person's branch to compare it to mine?
If you have already pushed into your remote branch for the first time, run:

`git checkout --track origin/[branch name]`

### I made a mistake in my commit and want to revert it to the previous one, how do I do that?
If you have already committed, run: `git reset HEAD~1`

Otherwise, to backup unstaged files and clean up your branch, run: `git stash`

### How do I update my local branch?
* To update your local `[branch name]` from `origin/[branch name]` (your remote branch), run:

`git pull`

* To update your local `[branch name]` from `origin/master` (the main branch of the project), first your have to update your local `master` branch:

`git checkout master`

`git pull`

Now you can switch back to your local branch to update it:

`git checkout [your branch's name]`

`git merge master`

Additionally, you should also update your remote branch (`origin/[your branch's name]`):

`git push -u origin [your branch's name]`

### How do I delete a branch?
Deleting a local branch: 
`git branch -d [branch name]`

Deleting a remote branch:
`git push origin --delete [branch name]`

### I can't run the application, Yarn says "[something] is not defined"
Some packages are probably missing from your `package.json` file, error messages in the console should mention which ones you need. You can add them manually like this:

`yarn add [package name]`

### Why not just work on the master branch?
Let's say that you are ready to push commits into the remote repository. If someone else has done that before you (after you cloned the repository), your local repository is now outdated and Git will throw an error at you. Now you might try to run `git pull` to fetch changes, but then you could run into merge conflicts if the other person was working on the same files as you. The only way to ensure that your local repository is always in sync with remote is to create your own branch (which in turn creates a new remote branch after you push).

## Documentation & Trello
The [`gh-pages`](https://github.com/HairdressingProject/HairdressingApp/tree/gh-pages "gh-pages") branch contains documentation regarding wireframes, design and the purpose of each UI element in each page. You can also read more about how to set up the backend API from scratch and the design of each table present in the database over there. It is available at: [Hairdressing Project Documentation](https://hairdressingproject.github.io/HairdressingApp/index.html "Hairdressing Project Documentation")

If you want to track the project's progress, post new cards and checklists with tasks that need to be done and generally be more organised, our Trello board is available at: [Hairdressing Project Trello board](https://trello.com/b/9yl1qgvH/hairdressing-project "Hairdressing Project Trello board")
