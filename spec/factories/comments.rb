FactoryBot.define do
    factory :comment do
      body { "This is a test comment." }
      user
      question
    end
  end
  