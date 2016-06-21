class ArtistsController < ApplicationController
  before_action :find_artist, only: [:show, :update, :sketches]
  before_action :authorize_ownership, only: :update

  #uses ActiveModel Serializer to implicitly serialize model (render json), in app/serializers
  def index
    @artists = User.all
    render json: @artists
  end

  def show
    render json: @artist
  end

  def sketches
    render json: @artist.sketches
  end

  def update
    if @artist.update(artist_params)
      render json: @artist
    else
      render json: { errors: @artist.errors.full_messages }, status: 422
    end
  end

  #--------------------
  private

  def find_artist
    @artist = User.find(params[:id])
  end

  def authorize_ownership
    if @artist != current_user
      render nothing: true, status: 403 #403 forbidden
      return #guard clause
    end
  end

  def artist_params #strong params
    params.require(:user).permit(:first_name, :last_name, :bio, :email, :username)
  end
end
