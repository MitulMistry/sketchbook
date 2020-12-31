FactoryBot.define do
  factory :sketch do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph }
    association :user    

    # image { Rack::Test::UploadedFile.new("#{Rails.root}/spec/support/assets/test_sketch_image_01.png", "image/png") }
    # image { fixture_file_upload(Rails.root.join("spec", "support", "assets", "test_sketch_image_01.png"), "image/png") }
    # image { fixture_file_upload("#{Rails.root}/spec/support/assets/test_sketch_image_01.png", "image/png") }
    # image { attach(io: File.open("#{Rails.root}/spec/support/assets/test_sketch_image_01.png"), filename: "test-image.png", content_type: "image/png") }
    # # }
    # image { File.new("#{Rails.root}/spec/support/assets/test_sketch_image_01.png") }

    # @message.image.attach(io: File.open('/path/to/file'), filename: 'file.pdf', content_type: 'application/pdf')


    factory :invalid_sketch do
      title { nil }
    end

    factory :sketch_with_uploaded_file do #use this child factory when making a post/patch request with attributes_for
      image { Rack::Test::UploadedFile.new("#{Rails.root}/spec/support/assets/test_sketch_image_01.png", "image/png") }
      # image { fixture_file_upload(Rails.root.join("spec", "support", "assets", "test_sketch_image_01.png"), "image/png") }
    end

    factory :invalid_sketch_with_uploaded_file do #use this child factory when making a post/patch request with attributes_for
      image { Rack::Test::UploadedFile.new("#{Rails.root}/spec/support/assets/test_sketch_image_01.png", "image/png") }
      # image { fixture_file_upload(Rails.root.join("spec", "support", "assets", "test_sketch_image_01.png"), "image/png") }
      title { nil }
    end

    after(:build) do |sketch| #attach a file without uploading if a file hasn't been attached using a prior method
      if !(sketch.image.attached?)
        sketch.image.attach(io: File.open("#{Rails.root}/spec/support/assets/test_sketch_image_01.png"), filename: "test-image.png", content_type: "image/png")
      end
    end
  end
end
