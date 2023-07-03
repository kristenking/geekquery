require 'rails_helper'

RSpec.describe User, type: :model do
  it "can have one attached picture" do
    user = User.create!(email: 'test@example.com', password: 'password', password_confirmation: 'password')
    user.profile_picture.attach(io: File.open('spec/fixtures/test_portrait1.jpg'), filename: 'test_image.png', content_type: 'image/jpeg')

    expect(user.profile_picture).to be_attached
  end
end