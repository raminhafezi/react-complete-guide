This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



========== Resolve Note =======
How to resolve "Permission denied (publickey). fatal: Could not read from remote repository. Please make sure you have the correct access rights and the repository exists." Errro in github

1- make sure you have added the remote URL into your git 
---> git remote -v
2- if nothing return, set your remote url 
---> git remote set-url origin git://github.com/YourDirectory/YourProject.git

3- make sure you the right publik key set in your local workstation and your github
---> cat ~/.ssh/
you have to see id_rsa.pub and id_rsa files

4- if not, generate SSH rsa key by
---> ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

--) the open id_rsa.pub with the note editor, copy the content (might start with ssh-rsa ....... ),
--) go to your github, setting, SSH and GPG keys, New SSH Key,
--) paste your generated key.

5- git push origin master --force to resolve conflict by your local workstation codes.

Ramin


