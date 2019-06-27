[![Build Status](https://travis-ci.com/jaxonetic-github/react-native-mongodb-stitch.svg?branch=master)](https://travis-ci.com/jaxonetic-github/react-native-mongodb-stitch)

#### This repo is still in active development. (06/27/2019)
Please keep this in mind when reviewing this repo that there are many details that I haven't tackled YET; in other words, it's not a finished project.  It does include many important modern development techniques like continuous integration and development, communicating with multiple third party services (i.e. googlesignin), and redux sagas(generator functions).  

### Architecture
[Mongo Stitch Atlas Cloud](https://www.mongodb.com/cloud/stitch) for the backend as a new and cloud alternative to Google Cloud or AWS. 
React Native for the front end 
   --redux saga, Native Module, Google Signin, Apple Maps, MongdDB Stitch integration

### Project Structure
* `index.js/` - react-native-web entry
* `src/index.js/` - react-native-web entry
* `src/services/` - essentially a dbo for the MongoStitchbackend
* `src/redux` - Redux specific files for state, and sagas
* `src/redux/saga` - Redux Sagas
* `src/components` - The applications react components (mobile & web)
* `src/components/Authentication` - The applications react components and redux files that handle authentication and connectivity changes
* `ios/Podfile` - IOS specific modifications
* `android` - Android specific modifications
* `docs` - Documentation coming ... Until then, I am temporarily serving github pages from here with the react-native-web version. 
* `__tests__/DBServicesSpec.js` - Unit Tests for the dbServices.js file
* `__tests__/sagaSpec.js` - Integration Test for Redux Saga flows



### How build and run

##### IOS
```
cd ios && pod install
cd ..
react-native run-ios 
```

##### Android
```
react-native run-android
```

Produces
<div>
<img src="https://github.com/jaxonetic-github/react-native-mongodb-stitch/blob/master/images/ios_demo.gif" align="left" height="300" width="170" >
</div>
<hr/>

#### Web
To view the react-native-web results 
```
yarn start-web  or yarn build-web 
```

The results of which can be found [here](https://jaxonetic-github.github.io/react-native-mongodb-stitch/)


### Docker Hub (Portable staging implementation)
The webpack bundle for the react-native-web build can be pulled from -->  https://hub.docker.com/r/jaxonetic/tawy.
An initial 


### Vagrant (Portable Dev box)
<div>
Bootstrap.sh : a script to install the dependencies to the box and load the app from github
<pre>
<code>
apt-get install -y git
apt-get install -y nodejs
apt-get install -y build-essential
apt-get install -y npm
rm -rf projectDir
mkdir  projectDir
cd projectDir 
git clone "https://github.com/jaxonetic-github/react-native-mongodb-stitch.git" .
ls
sudo npm install
react-native link
cd ios && pod install
cd ..
react-native run-ios
</code>
</pre>
</div>


<div>
VagrantFile : FYI, It takes 6 hours for vagrant to download the OS X box.  A linux box will be faster but won't be able to build the ios app because. of the xcode dependence
<pre>
<code>
Vagrant.configure("2") do |config|
  config.vm.box = "alopezh/osx-xcode-brew"
  config.vm.box_version = "1.0"
  config.vm.provision :shell, path:"bootstrap.sh"
end
</code>
</pre>
</div>


<div><pre>
<code>
 vagrant init alopezh/osx-xcode-brew --box-version 1.0
 vagrant up
</code>
</pre></div>


