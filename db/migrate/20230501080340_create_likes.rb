class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :question, null: false, foreign_key: true
      
      t.index [:user_id, :question_id], unique: true
      t.timestamps
    end
  end
end
