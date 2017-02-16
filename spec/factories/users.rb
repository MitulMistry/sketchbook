FactoryGirl.define do
  factory :user do
    username { Faker::Internet.user_name(nil, %w(_ -)) }
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { Faker::Internet.password(8, 20) }
    bio { Faker::Lorem.paragraph }

    factory :invalid_user do #(inherited) child factory
      first_name { Faker::Lorem.characters(51) }
    end
  end
end
