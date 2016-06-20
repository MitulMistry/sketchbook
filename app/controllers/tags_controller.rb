class TagsController < ApplicationController
  before_action :find_tag, only: [:show, :update, :destroy]

  #uses ActiveModel Serializer to implicitly serialize model (render json), in app/serializers
  def index
    @tags = Tag.all
    render json: @tags
  end

  def show
    render json: @tag.sketches
  end

  def create
    @tag = Tag.build(tag_params)
    if @tag.save
      render json: @tag
    else
      render json: { errors: @tag.errors.full_messages }, status: 422
    end
  end

  def update
    # if @tag.update(tag_params)
    #   render json: @tag
    # else
    #   render json: { errors: @tag.errors.full_messages }
    # end
  end

  def destroy
    # @tag.destroy
    # render nothing: true
  end

  #--------------------
  private

  def find_tag
    @tag = Tag.find(params[:id])
  end

  def tag_params #strong params
    params.require(:tag).permit(:name, sketch_ids: [])
  end
end
