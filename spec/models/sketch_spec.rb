require 'rails_helper'

RSpec.describe Sketch, type: :model do
  it "has a valid factory" do
    expect(build(:sketch)).to be_valid
  end

  describe "associations" do
    it { should belong_to(:user) } #using shoulda-matchers
    it { should have_many(:tags) }
  end

  describe "validations" do
    context "required validations" do
      it { should validate_presence_of(:title) }
      it { should validate_length_of(:title).is_at_most(100) }
      #validate has_attached_file
      #validate attachment image - file type, attachment size
    end

    context "other validations" do
      it { should validate_length_of(:description).is_at_most(2000) }
    end
  end

  describe "image from url" do
    it "creates an image from a url" do
      pending "implement"
      raise "fail"
    end
  end
end
