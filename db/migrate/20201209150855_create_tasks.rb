class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.integer :user_id
      t.string :title
      t.text :description
      t.date :deadline
      t.time :time
      t.string :flag

      t.timestamps
    end
  end
end
