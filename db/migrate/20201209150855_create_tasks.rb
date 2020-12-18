class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.integer :user_id
      t.text :title
      t.text :description
      t.date :deadline
      t.time :time
      t.text :flag

      t.timestamps
    end
  end
end
