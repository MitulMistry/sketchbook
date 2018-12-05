require 'rails_helper'

RSpec.describe Comment, type: :model do
  it "has a valid factory" do
    expect(build(:comment)).to be_valid #using FactoryBot syntax methods in rails_helper.rb
  end

  describe "associations" do
    it { should belong_to(:user) } #using shoulda-matchers
    it { should belong_to(:sketch) }
  end
end
