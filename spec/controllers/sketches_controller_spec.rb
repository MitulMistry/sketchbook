require 'rails_helper'

RSpec.describe SketchesController, type: :controller do
  shared_examples_for "public access to sketches" do
    describe "GET #index" do
      before :each do
        @sketch1 = create(:sketch) #using FactoryGirl syntax methods in rails_helper.rb
        @sketch2 = create(:sketch)
        @sketch3 = create(:sketch)
        get :index
      end

      it "assigns an array of all sketches to @sketches" do
        expect(assigns(:sketches)).to include(@sketch1, @sketch2, @sketch3) #assigns(:tags) checks @tags in the controller
      end

      it "returns JSON-formatted content" do
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body) #an array of hashes: [{id: 1, ...}, {id: 2, ...}]
        expect(json.any? { |hash| hash["id"] == @sketch1.id }).to be true #check if any of the sketch hashes contains the specified tags
        expect(json.any? { |hash| hash["id"] == @sketch2.id }).to be true #can also be written: expect(json).to include(include("id" => @sketch2.id))
        expect(json.any? { |hash| hash["id"] == @sketch3.id }).to be true
      end
    end

    describe "GET #show" do
      before :each do
        @sketch = create(:sketch)
        get :show, id: @sketch
      end

      it "assigns the requested sketch to @sketch" do
        expect(assigns(:sketch)).to eq @sketch
      end

      it "returns JSON-formatted content" do
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body) #hash
        expect(json["id"]).to eq(@sketch.id)
        expect(json["title"]).to eq(@sketch.title)
      end
    end
  end

  shared_examples_for "full access to sketch creation" do #define @user for these tests
    describe "POST #create" do
      context "with valid attributes" do
        it "saves the new sketch in the database" do
          expect { #proc - evaluates code before and after
            post :create, sketch: attributes_for(:sketch) #attributes_for (FactoryGirl) creates a params hash, mimicking the hash from a form
          }.to change(Sketch, :count).by(1)
        end

        it "returns the created tag as a JSON response" do
          post :create, sketch: attributes_for(:sketch)
          expect(response).to have_http_status(:success)

          sketch = Sketch.last
          json = JSON.parse(response.body)
          expect(json["id"]).to eq sketch.id
          expect(json["name"]).to eq sketch.name
        end
      end

      context "with invalid attributes" do
        it "does not save the new sketch in the database" do
          expect {
            post :create, sketch: attributes_for(:invalid_sketch)
          }.not_to change(Sketch, :count)
        end

        it "returns error as JSON response" do
          post :create, sketch: attributes_for(:invalid_sketch)
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json).to include("errors")
        end
      end
    end
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
    it_behaves_like "full access to sketch creation"
    it_behaves_like "full access to owned sketches"
    it_behaves_like "no modification access to non-owned sketches"
  end

  describe "guest access" do
    it_behaves_like "public access to sketches"

  end
end
