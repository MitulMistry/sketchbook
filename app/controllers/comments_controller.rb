class CommentsController < ApplicationController
  before_action :find_comment, only: [:update, :destroy]

  #uses ActiveModel Serializer to implicitly serialize model (render json), in app/serializers
  def create
    #@comment = current_user.comments.build(comment_params)
    #if @comment.save
      #render json: @comment
    #else
      #error
    #end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
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

  def find_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params #strong params
    params.require(:comment).permit(:content)
  end
end
