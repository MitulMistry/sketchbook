require 'rails_helper'

RSpec.describe TagsController, type: :controller do
  shared_examples_for "public access to tags" do
    describe "GET #index" do
      before :each do
        @tag1 = create(:tag) #using FactoryGirl syntax methods in rails_helper.rb
        @tag2 = create(:tag)
        @tag3 = create(:tag)
        get :index
      end

      it "assigns an array of all tags to @tags" do
        expect(assigns(:tags)).to include(@tag1, @tag2, @tag3) #assigns(:tags) checks @tags in the controller
      end

      it "returns JSON-formatted content" do
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body) #an array of hashes: [{id: 1, ...}, {id: 2, ...}]
        expect(json.any? { |hash| hash["id"] == @tag1.id }).to be true #check if any of the user hashes contains the specified tags
        expect(json.any? { |hash| hash["id"] == @tag2.id }).to be true #can also be written: expect(json).to include(include("id" => @tag2.id))
        expect(json.any? { |hash| hash["id"] == @tag3.id }).to be true
      end
    end

    describe "GET #non_empty" do
      before :each do
        @tag1 = create(:tag_with_sketch) #using FactoryGirl syntax methods in rails_helper.rb
        @tag2 = create(:tag_with_sketch)
        @tag3 = create(:tag)
        get :non_empty
      end

      it "assigns an array of tags with sketches to @tags" do
        expect(assigns(:tags)).to include(@tag1, @tag2)
        expect(assigns(:tags)).not_to include(@tag3)
      end

      it "returns JSON-formatted content" do
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body) #an array of hashes: [{id: 1, ...}, {id: 2, ...}]
        expect(json.any? { |hash| hash["id"] == @tag1.id }).to be true
        expect(json.any? { |hash| hash["id"] == @tag2.id }).to be true
        expect(json.none? { |hash| hash["id"] == @tag3.id }).to be true
      end
    end

    describe "GET #show" do
      before :each do
        @tag = create(:tag)
        @sketch1 = create(:sketch)
        @sketch2 = create(:sketch)
        @sketch3 = create(:sketch)
        @tag.sketches << @sketch1
        @tag.sketches << @sketch2
        get :show, id: @tag
      end

      it "assigns the requested tag to @tag" do
        expect(assigns(:tag)).to eq @tag
      end

      it "returns JSON-formatted content" do
        expect(response).to have_http_status(:success)

        json = JSON.parse(response.body) #hash
        expect(json.any? { |hash| hash["id"] == @sketch1.id }).to be true
        expect(json.any? { |hash| hash["id"] == @sketch2.id }).to be true
        expect(json.none? { |hash| hash["id"] == @sketch3.id }).to be true
      end
    end
  end

  shared_examples_for "full access to tag creation" do #define @user for these tests
    describe "POST #create" do
      context "with valid attributes" do
        it "saves the new tag in the database" do
          expect { #proc - evaluates code before and after
            post :create, tag: attributes_for(:tag) #attributes_for (FactoryGirl) creates a params hash, mimicking the hash from a form
          }.to change(Tag, :count).by(1)
        end

        it "returns the created tag as a JSON response" do
          post :create, tag: attributes_for(:tag)
          expect(response).to have_http_status(:success)

          tag = Tag.last
          json = JSON.parse(response.body)
          expect(json["id"]).to eq tag.id
          expect(json["name"]).to eq tag.name
        end
      end

      context "with invalid attributes" do
        it "does not save the new tag in the database" do
          expect {
            post :create, tag: attributes_for(:invalid_tag)
          }.not_to change(Tag, :count)
        end

        it "does not save the duplicate tag in the database" do
          create(:tag, name: "test")
          expect {
            post :create, tag: attributes_for(:tag, name: "test")
          }.not_to change(Tag, :count)
        end

        it "returns error as JSON response" do
          post :create, tag: attributes_for(:invalid_tag)
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json).to include("errors")
        end
      end
    end
  end

  #not used for right now
  shared_examples_for "full access to owned tags" do
    describe "PATCH #update" do
      before :each do
          @tag = create(:tag, name: "Test Name")
      end

      context "with valid attributes" do
        before :each do
          patch :update, id: @tag, tag: attributes_for(:tag, name: "Updated Name")
        end

        it "locates the requested tag" do
          expect(assigns(:tag)).to eq @tag
        end

        it "changes the tag's attributes" do
          @tag.reload #use reload to check that the changes are actually persisted
          expect(@tag.name).to eq "Updated Name"
        end

        it "returns the updated tag as a JSON response" do
          expect(response).to have_http_status(:success)

          json = JSON.parse(response.body)
          expect(json["id"]).to eq @tag.id
          expect(json["name"]).to eq "Updated Name"
        end
      end

      context "with invalid attributes" do
        before :each do
          patch :update, id: @tag, tag: attributes_for(:invalid_tag)
        end

        it "does not change the tag's attributes" do
          @tag.reload
          expect(@tag.name).to eq "Test Name"
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
        @tag = create(:tag)
      end

      it "deletes the tag from the database" do
        expect {
          delete :destroy, id: @tag
        }.to change(Tag, :count).by(-1)
      end
    end
  end

  #all modification is currently blocked in the controller (since users don't own tags, tags are created but exist independently)
  shared_examples_for "no modification access to tags" do #define @user for these tests
    describe "PATCH #update" do
      before :each do
        @tag = create(:tag, name: "Test Name")
        patch :update, id: @tag, tag: attributes_for(:tag)
      end

      it "does not change the tag's attributes" do
        @tag.reload
        expect(@tag.name).to eq "Test Name"
      end

      it "returns 403 forbidden" do
        expect(response).to have_http_status(403)
      end
    end

    describe "DELETE #destroy" do
      before :each do
        @tag = create(:tag)
      end

      it "doesn't delete the tag from the database" do
        expect {
          delete :destroy, id: @tag
        }.not_to change(Tag, :count)
      end

      it "returns 403 forbidden" do
        delete :destroy, id: @tag
        expect(response).to have_http_status(403)
      end
    end
  end

  describe "user access" do
    before :each do
      @user = create(:user)
      sign_in @user # sign in via Devise::Test::ControllerHelpers
    end

    it_behaves_like "public access to tags"
    it_behaves_like "full access to tag creation"
    it_behaves_like "no modification access to tags"
  end

  describe "guest access" do
    it_behaves_like "public access to tags"

    describe "POST #create" do
      it "requires login" do
        post :create, tag: attributes_for(:tag)
        expect(response).to require_login # custom matcher under support/matchers/require_login.rb
      end
    end

    describe "PATCH #update" do
      it "requires login" do
        patch :update, id: create(:tag), tag: attributes_for(:tag)
        expect(response).to require_login
      end
    end

    describe "DELETE #destroy" do
      it "requires login" do
        delete :destroy, id: create(:tag)
        expect(response).to require_login
      end
    end
  end
end
