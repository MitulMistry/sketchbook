class SketchesController < ApplicationController
  before_action :find_sketch, only: [:show, :update, :destroy]

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
      #error
    end
  end

  def update
    if @sketch.update(sketch_params)
      render json: @sketch
    else
      #error
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

  def sketch_params #strong params
    params.require(:sketch).permit(:title, :description, :image, tag_ids: [])
  end
end
