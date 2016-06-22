class SketchesController < ApplicationController
  before_action :find_sketch, only: [:show, :update, :destroy]
  before_action :authorize_ownership, only: [:update, :destroy]
  before_action :check_tag_ids, only: [:create, :update] #check that tag_ids are in the proper format

  #uses ActiveModel Serializer to implicitly serialize model (render json), in app/serializers
  def index
    @sketches = Sketch.all
    render json: @sketches
  end

  def show
    render json: @sketch
  end

  def create
    @sketch = current_user.sketches.build(sketch_params)
    if @sketch.save
      render json: @sketch
    else
      render json: { errors: @sketch.errors.full_messages }, status: 422
    end
  end

  def update
    if @sketch.update(sketch_params)
      render json: @sketch
    else
      render json: { errors: @sketch.errors.full_messages }, status: 422
    end
  end

  def destroy
    @sketch.destroy
    render nothing: true
  end

  #--------------------
  private

  def find_sketch
    @sketch = Sketch.find(params[:id])
  end

  def authorize_ownership
    if @sketch.user != current_user
      render nothing: true, status: 403 #403 forbidden
      return #guard clause
    end
  end

  def sketch_params #strong params
    params.require(:sketch).permit(:title, :description, :image, tag_ids: [])
  end

  def check_tag_ids
    if params[:sketch][:tag_ids].is_a?(Hash) #if it looks like this: "tag_ids"=>{"0"=>"2", "1"=>"4"}}
      params[:sketch][:tag_ids] = params[:sketch][:tag_ids].values #then set it to this: "tag_ids"=>["2", "4"]
    end
  end
end
