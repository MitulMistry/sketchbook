class ArtistsController < ApplicationController
  before_action :find_artist, only: [:show, :update]

  #uses ActiveModel Serializer to implicitly serialize model (render json), in app/serializers
  def index
    @artists = User.all
    render json: @artists
  end

  def show
    render json: @artist
  end

  def update
    if @artist.update(artist_params)
      render json: @artist
    else
      #error
    end
  end

  #--------------------
  private

  def find_artist
    @artist = User.find(params[:id])
  end

  def artist_params #strong params
    params.require(:user).permit(:first_name, :last_name, :bio, :email, :username)
  end
end
