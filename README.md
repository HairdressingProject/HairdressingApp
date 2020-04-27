# Hairdressing App
This project was assigned to us ([Gerardo Gornes](https://github.com/ggornes "ggornes"), [Diego C.](https://github.com/diego-cc "diego-cc"), [Stefan S.](https://github.com/stefan-solmundson "stefan-solmundson"), [Maddy F.](https://github.com/maddyferraloro "maddyferraloro") and [Frazer M.](https://github.com/Frazer-McLennan "Frazer-McLennan")) for our Diploma of Software Development at North Metropolitan TAFE to be developed over the year 2020.

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
For this step, you can use any remote branch that has recent commits. For instance:

`git merge origin/master-d` or `git merge origin/master-g`

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
I recommend using [Postman](https://www.postman.com/ "Postman") for this step. After you download and install it, simply type the URL of the route that you wish to test (e.g. `https://localhost:5001/api/users`) along with the method (`GET` by default) and hit "Send":

![Postman setup][Postman]

[Postman]: https://i.imgur.com/ZbbH4cL.png "Postman setup"

If you got a JSON response like the one in the picture, you're good to go.

##### 11 - Push into the remote repository
After you have committed the first few changes changes in your local repository, run:

`git push -u origin [your branch's name]`

> The `-u` flag sets your local branch to track the remote one (`origin/[your branch's name]`)

If you had any issues along the way, see the FAQ below.

## FAQ

### My branch is missing lots of files and it looks completely different from the others.
Most likely something went wrong when you tried to update your branch. Ask us on Slack and we will figure it out.

### How can I check another person's branch to compare it to mine?
If you have already pushed into your remote branch for the first time, run:

`git checkout --track origin/[branch name]`

### I can't run the application, Yarn says "[something] is not defined"
Some packages are probably missing from your `package.json` file, error messages in the console should mention which ones you need. You can add them manually like this:

`yarn add [package name]`

### Why not just work on the master branch?
Let's say that you are ready to push commits into the remote repository. If someone else has done that before you (after you cloned the repository), your local repository is now outdated and Git will throw an error at you. Now you might try to run `git pull` to fetch changes, but then you could run into merge conflicts if the other person was working on the same files as you. The only way to ensure that your local repository is always in sync with remote is to create your own branch (which in turn creates a new remote branch after you push).
