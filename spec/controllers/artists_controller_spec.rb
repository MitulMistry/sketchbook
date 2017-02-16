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

      # it "renders user serializer" do
      #   get :index
      #   assert_serializer "UserSerializer"
      # end

      it "returns JSON-formatted content" do
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
        json = JSON.parse(response.body)
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
        json = JSON.parse(response.body) #an array of hashes: [{id: 1, ...}, {id: 2, ...}]
        expect(json.any? { |hash| hash["title"] == @sketch1.title }).to be true #check if any of the sketch hashes contains the specified title
        expect(json.any? { |hash| hash["title"] == @sketch2.title }).to be true #can also be written: expect(json).to include(include("title" => @sketch2.title))
        expect(json.none? { |hash| hash["title"] == @sketch3.title }).to be true
      end
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
