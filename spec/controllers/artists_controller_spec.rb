require 'rails_helper'

RSpec.describe ArtistsController, type: :controller do
  shared_examples_for "public access to artists" do
    describe "GET #index" do
      it "populates an array of all artists" do
        artist1 = create(:user) #using FactoryGirl syntax methods in rails_helper.rb
        artist2 = create(:user)
        artist3 = create(:user)
        get :index
        expect(assigns(:artists)).to include(artist1, artist2, artist3) #assigns(:artists) checks @artists in the controller
      end

      it "returns JSON-formatted content" do
        artist = create(:user)
        get :index, format: :json
        expect(response.body).to have_content artist.to_json
      end
    end

    describe "GET #show" do

    end

    describe "GET #sketches" do

    end
  end

  shared_examples_for "full access to owned artists" do #define @user for these tests
    describe "PATCH #update" do

    end
  end

  shared_examples_for "no modification access to non-owned artists" do #define @user for these tests
    describe "PATCH #update" do

    end
  end

  describe "user access" do
    before :each do
      @user = create(:user)
      sign_in @user # sign in via Devise::Test::ControllerHelpers
    end

    it_behaves_like "public access to artists"
    it_behaves_like "full access to owned artists"
    it_behaves_like "no modification access to non-owned artists"
  end

  describe "guest access" do
    it_behaves_like "public access to artists"

  end
end
