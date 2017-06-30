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
        get :show, params: { id: @sketch }
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

    describe "GET #random_sketches" do
      before :each do
        7.times { create(:sketch) }
        get :random_sketches
      end

      it "assigns 6 sketches to @sketches" do
        expect(assigns(:sketches).first).to be_a(Sketch)
        expect(assigns(:sketches).length).to eq 6
      end

      it "returns JSON-formatted content" do
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body) #an array of hashes: [{id: 1, ...}, {id: 2, ...}]
        sketch1 = Sketch.find(json[0]["id"])
        expect(json[0]["title"]).to eq(sketch1.title)

        sketch2 = Sketch.find(json[1]["id"])
        expect(json[1]["title"]).to eq(sketch2.title)

        sketch3 = Sketch.find(json[2]["id"])
        expect(json[2]["title"]).to eq(sketch3.title)
      end
    end
  end

  shared_examples_for "full access to sketch creation" do #define @user for these tests
    describe "POST #create" do
      context "with valid attributes" do
        it "saves the new sketch in the database" do
          expect { #proc - evaluates code before and after
            post :create, params: { sketch: attributes_for(:sketch_with_uploaded_file) } #attributes_for (FactoryGirl) creates a params hash, mimicking the hash from a form
          }.to change(Sketch, :count).by(1)
        end

        it "returns the created tag as a JSON response" do
          post :create, params: { sketch: attributes_for(:sketch_with_uploaded_file) }
          expect(response).to have_http_status(:success)

          sketch = Sketch.last
          json = JSON.parse(response.body)
          expect(json["id"]).to eq sketch.id
          expect(json["title"]).to eq sketch.title
        end
      end

      context "with invalid attributes" do
        it "does not save the new sketch in the database" do
          expect {
            post :create, params: { sketch: attributes_for(:invalid_sketch_with_uploaded_file) }
          }.not_to change(Sketch, :count)
        end

        it "returns error as JSON response" do
          post :create, params: { sketch: attributes_for(:invalid_sketch_with_uploaded_file) }
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json).to include("errors")
        end
      end
    end
  end

  shared_examples_for "full access to owned sketches" do #define @user for these tests
    describe "PATCH #update" do
      before :each do
          @sketch = create(:sketch, title: "Test Title", user: @user)
      end

      context "with valid attributes" do
        before :each do
          patch :update, params: { id: @sketch, sketch: attributes_for(:sketch_with_uploaded_file, title: "Updated Title") }
        end

        it "locates the requested sketch" do
          expect(assigns(:sketch)).to eq @sketch
        end

        it "changes the sketch's attributes" do
          @sketch.reload #use reload to check that the changes are actually persisted
          expect(@sketch.title).to eq "Updated Title"
        end

        it "returns the updated sketch as a JSON response" do
          expect(response).to have_http_status(:success)

          json = JSON.parse(response.body)
          expect(json["id"]).to eq @sketch.id
          expect(json["title"]).to eq "Updated Title"
        end
      end

      context "with invalid attributes" do
        before :each do
          patch :update, params: { id: @sketch, sketch: attributes_for(:invalid_sketch_with_uploaded_file) }
        end

        it "does not change the sketch's attributes" do
          @sketch.reload
          expect(@sketch.title).to eq "Test Title"
        end

        it "returns error as JSON response" do
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json).to include("errors")
        end
      end
    end

    describe "DELETE #destroy" do
      before :each do
        @sketch = create(:sketch, user: @user)
      end

      it "deletes the sketch from the database" do
        expect {
          delete :destroy, params: { id: @sketch }
        }.to change(Sketch, :count).by(-1)
      end
    end
  end

  shared_examples_for "no modification access to non-owned sketches" do #define @user for these tests
    before :each do
      user2 = create(:user)
      @sketch = create(:sketch, title: "Test Title", user: user2)
    end

    describe "PATCH #update" do
      before :each do
        patch :update, params: { id: @sketch, sketch: attributes_for(:sketch_with_uploaded_file) }
      end

      it "does not change the sketch's attributes" do
        @sketch.reload
        expect(@sketch.title).to eq "Test Title"
      end

      it "returns 403 forbidden" do
        expect(response).to have_http_status(403)
      end
    end

    describe "DELETE #destroy" do
      it "doesn't delete the sketch from the database" do
        expect {
          delete :destroy, params: { id: @sketch }
        }.not_to change(Sketch, :count)
      end

      it "returns 403 forbidden" do
        delete :destroy, params: { id: @sketch }
        expect(response).to have_http_status(403)
      end
    end
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

    describe "POST #create" do
      it "requires login" do
        post :create, params: { sketch: attributes_for(:sketch_with_uploaded_file) }
        expect(response).to require_login # custom matcher under support/matchers/require_login.rb
      end
    end

    describe "PATCH #update" do
      it "requires login" do
        patch :update, params: { id: create(:sketch), sketch: attributes_for(:sketch_with_uploaded_file) }
        expect(response).to require_login
      end
    end

    describe "DELETE #destroy" do
      it "requires login" do
        delete :destroy, params: { id: create(:sketch) }
        expect(response).to require_login
      end
    end
  end

  describe "check tag ids" do
    context "#check_tag_ids_if_hash" do
      it "converts an associated tags hash to an array" do
        pending "implement"
        raise "fail"
      end
    end

    context "#check_tag_ids_if_nil" do
      it "converts associated tags from nil to an empty array" do
        pending "implement"
        raise "fail"
      end
    end
  end
end
