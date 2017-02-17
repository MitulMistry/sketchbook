require 'rails_helper'

RSpec.describe ArtistsController, type: :controller do
  shared_examples_for "public access to artists" do
    describe "GET #index" do
      before :each do
        @artist1 = create(:user) #using FactoryGirl syntax methods in rails_helper.rb
        @artist2 = create(:user)
        @artist3 = create(:user)
        get :index
      end

      it "assigns an array of all artists to @artists" do
        expect(assigns(:artists)).to include(@artist1, @artist2, @artist3) #assigns(:artists) checks @artists in the controller
      end

      it "returns JSON-formatted content" do
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body) #an array of hashes: [{id: 1, ...}, {id: 2, ...}]
        expect(json.any? { |hash| hash["username"] == @artist1.username }).to be true #check if any of the user hashes contains the specified username
        expect(json.any? { |hash| hash["username"] == @artist2.username }).to be true #can also be written: expect(json).to include(include("username" => @artist2.username))
        expect(json.any? { |hash| hash["username"] == @artist3.username }).to be true
      end
    end

    describe "GET #show" do
      before :each do
        @artist = create(:user)
        get :show, id: @artist #make a GET request with id for user
      end

      it "assigns the requested artist to @artist" do
        expect(assigns(:artist)).to eq @artist #assigns checks value of @artist in controller
      end

      it "returns JSON-formatted content" do
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body) #hash
        expect(json["username"]).to eq @artist.username
      end
    end

    describe "GET #sketches" do
      before :each do
        @artist = create(:user)
        @sketch1 = create(:sketch, user: @artist)
        @sketch2 = create(:sketch, user: @artist)
        @sketch3 = create(:sketch)
        get :sketches, id: @artist
      end

      it "assigns the requested artist to @artist" do
        expect(assigns(:artist)).to eq @artist
      end

      it "returns JSON-formatted content" do
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body) #an array of hashes: [{id: 1, ...}, {id: 2, ...}]
        expect(json.any? { |hash| hash["title"] == @sketch1.title }).to be true #check if any of the sketch hashes contains the specified title
        expect(json.any? { |hash| hash["title"] == @sketch2.title }).to be true #can also be written: expect(json).to include(include("title" => @sketch2.title))
        expect(json.none? { |hash| hash["title"] == @sketch3.title }).to be true
      end
    end
  end

  shared_examples_for "full access to owned artists" do #define @user for these tests
    describe "PATCH #update" do
      context "with valid attributes" do
        before :each do
          patch :update, id: @user, user: attributes_for(:user, bio: "Updated bio")
        end

        it "locates the requested artist" do
          expect(assigns(:artist)).to eq @user
        end

        it "changes the artist's attributes" do
          @user.reload #use reload to check that the changes are actually persisted
          expect(@user.bio).to eq "Updated bio"
        end

        it "returns the updated artist as a JSON response" do
          expect(response).to have_http_status(:success)

          json = JSON.parse(response.body)
          expect(json["id"]).to eq @user.id
          expect(json["bio"]).to eq "Updated bio"
        end
      end

      context "with invalid attributes" do
        it "does not change the artist's attributes" do
          first_name = @user.first_name
          patch :update, id: @user, user: attributes_for(:invalid_user)
          @user.reload
          expect(@user.first_name).to eq first_name
        end

        it "returns error as JSON response" do
          patch :update, id: @user, user: attributes_for(:invalid_user)
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json).to include("errors")
        end
      end
    end
  end

  shared_examples_for "no modification access to non-owned artists" do #define @user for these tests
    describe "PATCH #update" do
      before :each do
        @artist2 = create(:user)
      end

      it "does not change the artist's attributes" do
        first_name = @artist2.first_name
        patch :update, id: @artist2, user: attributes_for(:user)
        @artist2.reload
        expect(@artist2.first_name).to eq first_name
      end

      it "returns 403 forbidden" do
        patch :update, id: @artist2, user: attributes_for(:user)
        expect(response).to have_http_status(403)
      end
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

    describe "PATCH #update" do
      it "requires login" do
        patch :artist, id: create(:user), tag: attributes_for(:user)
        expect(response).to require_login # custom matcher under support/matchers/require_login.rb
      end
    end
  end
end
