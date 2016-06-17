# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

5.times do
  User.create(
    username: Faker::Internet.user_name,
    email: Faker::Internet.email,
    password: "password",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    bio: Faker::Lorem.paragraph
    )
end

15.times do
  user = User.order("RANDOM()").first

  sketch = user.sketches.create(
    title: Faker::Book.title,
    description: Faker::Lorem.paragraph
  )

  sketch.image_from_url("http://loremflickr.com/800/600/sketch")
  #sketch.image_from_url("http://www.nasa.gov/sites/default/files/styles/image_card_4x3_ratio/public/thumbnails/image/idcs1426.jpg")
end

6.times { Tag.create(name: Faker::Lorem.word) }

Sketch.all.each do |sketch|
  random_tags = Tag.all.order("RANDOM()")
  sketch.tags << random_tags.first
  sketch.tags << random_tags.second if Faker::Number.between(1, 2) == 1
end
