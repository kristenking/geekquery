class Question < ApplicationRecord
  belongs_to :user

  has_many_attached :images

  validates :images, blob: { content_type: :image } 

  has_many :likes
  has_many :likers, through: :likes, source: :user
end
