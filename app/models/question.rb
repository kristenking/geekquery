class Question < ApplicationRecord
  belongs_to :user

  has_many_attached :images

  validates :images, blob: { content_type: :image } 

  has_many :likes
  has_many :likers, through: :likes, source: :user

  has_many :comments

  def image_urls
    images.map do |image|
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true)
    end
  end
end
