# sketchbook

Sketchbook is a web application used to help artists manage and share their sketches, and to allow users to search and explore the sketches of others. It is built with an Angular front end and a Rails serialized JSON back end.

In order to get it running, just `bundle install` to install Rails dependencies, `rake db:migrate` to migrate the database, and `rake db:seed` to populate the database with sample artists and sketches. Front end dependencies are managed with Bower, but Bower dependencies are checked in to git under vendor/assets/bower_components. If you want to update them, you can run `rake bower:update`.