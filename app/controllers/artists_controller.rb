class ArtistsController < ApplicationController
  before_action :find_artist, only: [:show, :update]

  #uses ActiveModel Serializer to implicitly serialize model (render json), in app/serializers
  def show
    render json: @artist.sketches
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
    params.require(:user).permit(:first_name, :last_name, :bio)
  end
end