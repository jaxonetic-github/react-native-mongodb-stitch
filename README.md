

### Architecture
Mongo Stitch Cloud for the backend.
React Native for the front end 
   --redux saga, Native Module, Google Signin, Apple Maps, MongdDB Stitch integration


### Project Structure

* `services/dbServices.js` - essentially a dbo for the MongoStitchbackend
* `redux` - Redux specific files for state, and sagas
* `redux/saga` - Redux Sagas
* `ios` - IOS specific modifications
* `android` - Android specific modifications
* `components` - The applications react components
* `components/Authentication` - The applications react components and redux files that handle authentication and connectivity changes
* `docs` - Documentation coming ...
* `__tests__/DBServicesSpec.js` - Unit Tests for the dbServices.js file
* `__tests__/sagaSpec.js` - Integration Test for Redux Saga flows


*** This app uses KEYS and ID's from Google and StreetySmarts.  They are stored securely (I hope) as Secrets and accessed via Stitch Functions which are similar to AWS Lambdas.  @See services/dbService.


### Vagrant
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
VagrantFile : FYI, It takes 6 hours for vagrant to download the OS X box.
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

### Screenshots

```
react-native run-ios   Or   react-native run-android
```

Produces

<img src="https://github.com/jaxonetic-github/react-native-mongodb-stitch/blob/master/images/profileDemoUpdate.gif" align="left" height="300" width="170" >
