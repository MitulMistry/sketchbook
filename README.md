# Sketchbook

Sketchbook is a web application used to help artists manage and share their sketches, and to allow users to search and explore the sketches of others. It is built with an Angular 1 front end and a Rails serialized JSON back end.

![screenshot](readme_sketchbook.jpg)

## Demo App
You can see a demo version of the application deployed to Heroku here: https://angular-sketchbook.herokuapp.com/

## Functionality
Users can create an account, upload images (sketches), and view the sketches of other artists through searching and filtering based on tags. With Angular, it works as a single page application and communicates with the back end asynchronously.

## Application Info
- Back end dependencies are handled by [Bundler][bundler] and specified in the [Gemfile][gemfile].
- Front end dependencies are handled by [Bower][bower] and specified in the [bower.json][bower.json] file.
- Authentication (user registration and login) is handled by the [Rails Devise][devise] gem and implemented in Angular with [Angular Devise][angular-devise].
- Image uploading is managed by the [Rails Paperclip][paperclip] gem, and facilitated in Angular with [ng-file-upload][ng-file-upload]. For production, it's configured to use [AWS S3][s3] to store images.
- Serialization (responding to requests with data converted to JSON) is handled by [Active Model Serializers][active-model-serializers].

## Install Instructions
To get it running in development, install dependencies from the [Gemfile][gemfile] via [Bundler][bundler] by running `bundle install`. Front end dependencies are managed with Bower, but Bower dependencies are checked in to git under [`vendor/assets/bower_components`][vendor]. If you want to update them, you can run `bundle exec rails bower:update`. Bower components are included in the [JavaScript manifest file][js-manifest] to add them to the Rails asset pipeline, then included in the Angular [app.js file][app-js]. Styles are included in the [CSS manifest file][css-manifest].

Since the application uses PostgreSQL, you need to have it installed locally on your machine with a user that has table creation privileges. You can get further instructions [here][postgres-local-setup]. If you'd rather not bother with PostgreSQL, you can use an older version of the application that uses SQLite3 [here][old-version-1].

Create the database with `bundle exec rails db:create` and run migrations with `bundle exec rails db:migrate`, then run `bundle exec rails db:seed` to populate the database with sample artists and sketches.

For production, the application is configured to use [AWS S3][s3]. You can read more about setting up S3 [here][heroku-s3-setup] (with Heroku).

## Testing
The back end test suite is developed using Rspec via the [rspec-rails gem][rspec-rails] with [shoulda-matchers][shoulda]. Model factories are set up with [FactoryGirl][factory-girl].

Rspec tests are located under the `/spec` directory. In order to run tests, run `bundle exec rspec` followed by an optional folder or file under the `/spec` directory (for example, if you only want to test models, run `bundle exec rspec spec/models`).

## More Info
You can read a blog post going further into the application [here][blog-post].

## License
This project is open source under the terms of the [MIT License][mit].

[bundler]: http://bundler.io/
[gemfile]: https://github.com/MitulMistry/sketchbook/blob/master/Gemfile
[bower]: https://bower.io/
[bower.json]: https://github.com/MitulMistry/sketchbook/blob/master/bower.json
[devise]: https://github.com/plataformatec/devise
[angular-devise]: https://github.com/cloudspace/angular_devise
[paperclip]: https://github.com/thoughtbot/paperclip
[ng-file-upload]: https://github.com/danialfarid/ng-file-upload
[s3]: https://aws.amazon.com/s3/
[active-model-serializers]: https://github.com/rails-api/active_model_serializers
[vendor]: https://github.com/MitulMistry/sketchbook/tree/master/vendor/assets/bower_components
[js-manifest]: https://github.com/MitulMistry/sketchbook/blob/master/app/assets/javascripts/application.js
[app-js]: https://github.com/MitulMistry/sketchbook/blob/master/app/assets/javascripts/angular-app/app.js
[css-manifest]: https://github.com/MitulMistry/sketchbook/blob/master/app/assets/stylesheets/application.css
[postgres-local-setup]: https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
[old-version-1]: https://github.com/MitulMistry/sketchbook/tree/c0a0dc6d35e8a459846ffb7a57b1f3f3eb5aa4b2
[heroku-s3-setup]: https://devcenter.heroku.com/articles/s3
[rspec-rails]: https://github.com/rspec/rspec-rails
[shoulda]: https://github.com/thoughtbot/shoulda-matchers
[factory-girl]: https://github.com/thoughtbot/factory_girl_rails
[blog-post]: http://mitulmistry.github.io/javascript/rails/angular-rails-app/
[mit]: http://opensource.org/licenses/MIT
