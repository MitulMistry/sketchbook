FactoryGirl.define do
  factory :sketch do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph }
    association :user
    image { File.new("#{Rails.root}/spec/support/fixtures/test_sketch_image_01.png") }
  end
end