class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  has_many :sketches
  has_many :comments

  validates :username, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9_-]+\Z/ }
  validates :first_name, length: { maximum: 200 }
  validates :last_name, length: { maximum: 200 }
  validates :bio, length: { maximum: 4000 }  
end
