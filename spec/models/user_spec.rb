require 'rails_helper'

RSpec.describe User, type: :model do
  it "has a valid factory" do
    expect(build(:user)).to be_valid #using FactoryGirl syntax methods in rails_helper.rb
  end

  describe "associations" do
    it { should have_many(:sketches) } #using shoulda-matchers
    it { should have_many(:comments) }
  end

  describe "validations" do
    context "required validations" do
      it { should validate_presence_of(:username) }
      it { should validate_uniqueness_of(:username) }
      it { should validate_length_of(:username).is_at_most(40) }

      it "has an alphanumeric username" do
        expect(build(:user, username: "testUser1")).to be_valid
        expect(build(:user, username: "test-user2")).to be_valid
        expect(build(:user, username: "test_user3")).to be_valid
        expect(build(:user, username: "test user4")).to be_invalid
        expect(build(:user, username: "testUser5$")).to be_invalid
      end
    end

    context "other validations" do
      it { should validate_length_of(:first_name).is_at_most(50) }
      it { should validate_length_of(:last_name).is_at_most(50) }
      it { should validate_length_of(:bio).is_at_most(3000) }
    end
  end
end
