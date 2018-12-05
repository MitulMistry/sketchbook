FactoryBot.define do
  factory :tag do
    sequence(:name) { |n| Faker::Lorem.word + n.to_s } #iterate to ensure uniqueness

    factory :tag_with_sketch do #inherited factory
      after(:build) do |tag|
        tag.sketches << create(:sketch)
      end
    end

    factory :invalid_tag do
      name { Faker::Lorem.characters(50) }
    end
  end
end
