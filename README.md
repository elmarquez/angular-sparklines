Angular Sparklines
==================



Installation
------------

Use Bower to automatically install the library and its dependencies in your project:

    bower install -S angular-sparklines


Dependencies
------------

The library has the following runtime dependencies:

 * Angular.js
 * d3.js

To compile the library from sources, you will require the following dependencies:

 * Nodejs
 * Bower
 * Grunt

Install all build and run time dependencies as follows:

    npm install; bower install

Run `grunt` at the console to see the list of build commands.


Usage
-----

In your HTML, add a reference to the angular-sparklines library and associated
JavaScript and CSS dependencies:

    <link type="text/css" rel="stylesheet" href="path/to/angular-sparklines/dist/angular-sparklines.css" media="all">
    <script type="text/javascript" src="path/to/d3/d3.min.js"></script>
    <script type="text/javascript" src="path/to/angular/angular.min.js"></script>
    <script type="text/javascript" src="path/to/angular-sparklines/dist/angular-sparklines.js"></script>

Create a sparkline and set the data source as the `data` variable from the
controller scope. Set the configuration options from the variable `options`
in the controller scope:

    <sparkline data="{{ data }}" options="{{ options }}"></sparkline>

Use a test dataset to evaluate the sparkline while designing.

    <sparkline test="true"></sparkline>


License
-------

Please see the LICENSE file for licensing and copyright information.


Backlog
-------

Sparklines
    static and animated
    standard deviation
    line, bar, area, binary
Heat Circles
Heat Rectangles

* http://prag.ma/code/sparky/
* https://blog.safaribooksonline.com/2014/02/12/inline-visualization-d3-js/