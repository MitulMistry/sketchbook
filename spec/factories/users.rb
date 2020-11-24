FactoryBot.define do
  factory :user do
    sequence(:username) { |n| Faker::Internet.user_name(separators: %w(_ -)) + n.to_s } #iterate to ensure uniqueness 
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { Faker::Internet.password(min_length: 8, max_length: 20) }
    bio { Faker::Lorem.paragraph }

    factory :invalid_user do #(inherited) child factory
      first_name { Faker::Lorem.characters(number: 51) }
    end
  end
end
