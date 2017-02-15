require 'rails_helper'

RSpec.describe SketchesController, type: :controller do
  shared_examples_for "public access to sketches" do

  end

  shared_examples_for "full access to owned sketches" do #define @user for these tests

  end

  shared_examples_for "no modification access to non-owned sketches" do #define @user for these tests

  end

  describe "user access" do
    before :each do
      @user = create(:user)
      sign_in @user # sign in via Devise::Test::ControllerHelpers
    end

    it_behaves_like "public access to sketches"
    it_behaves_like "full access to owned sketches"
    it_behaves_like "no modification access to non-owned sketches"
  end

  describe "guest access" do
    it_behaves_like "public access to sketches"

  end
end
