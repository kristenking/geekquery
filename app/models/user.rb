class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :lockable
         enum role: [:regular, :admin]

         has_one_attached :profile_picture

  has_many :questions
  

  has_many :likes

  has_many :comments
end
