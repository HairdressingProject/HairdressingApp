# Hairdressing App
This project was assigned to us ([Gerardo Gornes](https://github.com/ggornes "ggornes"), [Diego C.](https://github.com/diego-cc "diego-cc"), [Stefan S.](https://github.com/stefan-solmundson "stefan-solmundson"), [Maddy F.](https://github.com/maddyferraloro "maddyferraloro") and [Frazer M.](https://github.com/Frazer-McLennan "Frazer-McLennan")) for our Diploma of Software Development at North Metropolitan TAFE to be developed over the year 2020.

## Setting up your local development environment
To start working on the Admin Portal, a few steps are necessary:

### 1 - Clone the repository
`git clone https://github.com/HairdressingProject/HairdressingApp.git`

### 2 - Move to the repository's directory
`cd HairdressingApp`

### 3 - Create your own branch (important!)
`git checkout -b [your branch's name]`

> The `-b` flag creates a new branch.

### 4 - Update your branch to a more recent version
For this step, you can use any remote branch that has recent commits. For instance:

`git merge origin/master-d` or `git merge origin/master-g`

### 5 - Install packages
Move to the `Admin/Frontend` directory and run:

`yarn`

### 6 - Start server
`yarn start`

### 7 - Push into the remote repository
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