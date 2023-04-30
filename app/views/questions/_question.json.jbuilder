json.extract! question, :id, :title, :tag, :user_id, :created_at, :updated_at
json.url question_url(question, format: :json)
