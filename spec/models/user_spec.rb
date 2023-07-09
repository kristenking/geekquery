require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validation tests' do
    it 'ensures email presence' do
      user = build(:user, email: nil)
      expect(user).to_not be_valid
    end

    it 'ensures password presence' do
      user = build(:user, password: nil)
      expect(user).to_not be_valid
    end

    it 'should save successfully' do
      user = build(:user)
      expect(user).to be_valid
    end
  end

  context 'attachment tests' do
    it "can have one attached picture" do
      user = create(:user)
      user.profile_picture.attach(io: File.open('spec/fixtures/test_portrait1.jpg'), filename: 'test_portrait1.jpg', content_type: 'image/jpeg')
      expect(user.profile_picture).to be_attached
    end
  end
end