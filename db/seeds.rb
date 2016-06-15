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

  user.sketches.create(
    title: Faker::Book.title,
    description: Faker::Lorem.paragraph
  )
end

User.all.each do |user|
  3.times { user.tags.create(name: Faker::Lorem.word) }

  user.sketches.each do |sketch|
    sketch.tags << user.tags.order("RANDOM()").first
  end
end
