# Google Tasks Milestones

University small projecrt web application to create tasks for a Google user through the Google Tasks API using GitHub project milestones also using Github API.

## Featues

-   Can list all your google tasks.
-   Can list all your milestones in github.
-   Can add milestones as tasks in google.
-   Simple UI with development enviromnent where to can change from "free" to "premium" account.

## How to install

1. Clone the repository: `git clone https://github.com/DavidmLopes/Google-Tasks-Milestones`
2. Create .env file with the following variables:
    - CLIENT_ID: Id of your Google OAuth
    - CLIENT_SECRET: Secret key of your Google OAuth
    - GITHUB_CLIENT_ID: Id of your Github OAuth.
    - GITHUB_CLIENT_SECRET: Secret of your Github OAuth.
3. Install dependencies: `npm install`
4. Start the server: `npm run dev`
5. Open `http://localhost:3000` in a web browser.
