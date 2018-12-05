FactoryBot.define do
  factory :sketch do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph }
    association :user
    image { File.new("#{Rails.root}/spec/support/fixtures/images/test_sketch_image_01.png") }

    factory :invalid_sketch do
      title { Faker::Lorem.characters(101) }
    end

    factory :sketch_with_uploaded_file do #use this child factory when making a post/patch request with attributes_for
      image { Rack::Test::UploadedFile.new("#{Rails.root}/spec/support/fixtures/images/test_sketch_image_01.png", "image/png") } #issues multi-part request
    end

    factory :invalid_sketch_with_uploaded_file do #use this child factory when making a post/patch request with attributes_for
      image { Rack::Test::UploadedFile.new("#{Rails.root}/spec/support/fixtures/images/test_sketch_image_01.png", "image/png") } #issues multi-part request
      title { Faker::Lorem.characters(101) }
    end
  end
end
