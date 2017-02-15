require 'rails_helper'

RSpec.describe TagsController, type: :controller do
  shared_examples_for "public access to tags" do

  end

  shared_examples_for "full access to owned tags" do #define @user for these tests

  end

  shared_examples_for "no modification access to non-owned tags" do #define @user for these tests

  end

  describe "user access" do
    before :each do
      @user = create(:user)
      sign_in @user # sign in via Devise::Test::ControllerHelpers
    end

    it_behaves_like "public access to tags"
    it_behaves_like "full access to owned tags"
    it_behaves_like "no modification access to non-owned tags"
  end

  describe "guest access" do
    it_behaves_like "public access to tags"

  end
end
