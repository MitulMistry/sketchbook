require 'rails_helper'

RSpec.describe HomeController, type: :controller do
  shared_examples_for "public access to home" do
    describe "GET #index" do
      it "renders the application layout template" do
        get :index
        expect(response).to render_template :application
      end
    end
  end

  describe "user access" do
    before :each do
      @user = create(:user)
      sign_in @user # sign in via Devise::Test::ControllerHelpers
    end

    it_behaves_like "public access to home"
  end

  describe "guest access" do
    it_behaves_like "public access to home"
  end
end
