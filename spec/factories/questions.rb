FactoryBot.define do
    factory :question do
      title { "This is a test title" }
      tag { "this is test_tag"}
      user
    end
  end