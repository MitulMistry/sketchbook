# Sketchbook

## Intro
Sketchbook is a web application used to help artists manage and share their sketches, and to allow users to search and explore the sketches of others. It is built with an Angular front end and a Rails serialized JSON back end.

## Functionality
With Sketchbook, you can create a user account, upload images (sketches), and view the sketches of other artists through searching and filtering based on tags. With Angular, it works as a single page application and communicates with the back end asynchronously. While functionality is relatively simple, it has a strong foundation that can be built upon going forward.

## Application Info
- Back end dependencies are handled by [Bundler][bundler] and specified in the [Gemfile][gemfile].
- Front end dependencies are handled by [Bower][bower] and specified in the [bower.json][bower.json] file.
- Authentication (user registration and login) is handled by the [Rails Devise][devise] gem, and implemented in Angular with [Angular Devise][angular-devise].
- Image uploading is managed by the [Rails Paperclip][paperclip] gem, and facilitated in Angular with [ng-file-upload][ng-file-upload].
- Serialization (responding to requests with data converted to JSON) is handled by [Active Model Serializers][active-model-serializers].

## Install Instructions
In order to get it running, just run `bundle install` to install Rails dependencies from the gemfile, `rake db:migrate` to migrate the database, and `rake db:seed` to populate the database with sample artists and sketches. Front end dependencies are managed with Bower, but Bower dependencies are checked in to git under [`vendor/assets/bower_components`][vendor]. If you want to update them, you can run `rake bower:update`.

## More Info
You can read a blog post going further into the application [here][blog-post].

[bundler]: http://bundler.io/
[gemfile]: https://github.com/MitulMistry/sketchbook/blob/master/Gemfile
[bower]: https://bower.io/
[bower.json]: https://github.com/MitulMistry/sketchbook/blob/master/bower.json
[devise]: https://github.com/plataformatec/devise
[angular-devise]: https://github.com/cloudspace/angular_devise
[paperclip]: https://github.com/thoughtbot/paperclip
[ng-file-upload]: https://github.com/danialfarid/ng-file-upload
[active-model-serializers]: https://github.com/rails-api/active_model_serializers
[vendor]: https://github.com/MitulMistry/sketchbook/tree/master/vendor/assets/bower_components
[blog-post]: http://mitulmistry.github.io/javascript/rails/angular-rails-app/
