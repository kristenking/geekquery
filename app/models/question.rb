class Question < ApplicationRecord
  belongs_to :user

  has_many_attached :images

  validates :images, blob: { content_type: :image } 
end
