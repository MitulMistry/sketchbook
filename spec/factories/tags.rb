FactoryGirl.define do
  factory :tag do
    name { Faker::Lorem.word }

    factory :tag_with_sketch do #inherited factory
      after(:build) do |tag|
        tag.sketches << create(:sketch)
      end
    end
  end
end
