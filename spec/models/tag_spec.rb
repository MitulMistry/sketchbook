require 'rails_helper'

RSpec.describe Tag, type: :model do
  it "has a valid factory" do
    expect(build(:tag)).to be_valid #using FactoryGirl syntax methods in rails_helper.rb
  end

  describe "associations" do
    it { should have_many(:sketches) } #using shoulda-matchers
  end

  describe "validations" do
    context "required validations" do
      it { should validate_presence_of(:name) }
      it { should validate_length_of(:name).is_at_most(40) }
      it { should validate_uniqueness_of(:name) }
    end
  end

  describe "non-empty" do
    it "returns an array of all tags that have at least 1 associated sketch" do
      pending "implement"
      raise "fail"
    end

    it "doesn't return duplicate tags" do
      pending "implement"
      raise "fail"
    end
  end
end
