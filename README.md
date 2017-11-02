# Usage #
In order to run the script nodejs will need to be installed/configured. You can obtain nodejs from this [Link](https://nodejs.org). After installing nodejs a restart of the operating system may be necessary.

```
npm install
````

### Apply new module to devDependencies ###

```
npm install [package] --save-dev
```

# Tasks #

* `gulp build` Run all tasks together
* `gulp clean` Clean dist folder
* `gulp pagelayouts` Run task to build Page Layouts
* `gulp displaytemplates` Run task to build Display Templates
* `gulp scss` Run task to build scss
* `gulp images` Run task to distribute images
* `gulp scripts` Run task to distribute scripts
* `gulp fonts` Run task to distribute font
* `gulp components` Run task to distribute component items like .txt or .html snippets
* `gulp` Run local server with watch task and Browsersync

_*Items will be distributed from the src to the dist folder._

# File structure #
* `gulpfile.js` Gulp tasks and configuration files
* `package.json` Specifics of npm's package.json handling including dependencies

# Folder structure #
* `dist` Generated distribution folder for serving files to SharePoint
* `src` Local source files stored in source control
* `node modules` Generated folder containing node modules from package.json

# Updates / Version History #
* V1.0.0.3 added livereload
* V1.0.0.2 added sourcemaps
* V1.0.0.1 added webserver
* V1.0.0.1 initial version

Markdown style [cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)