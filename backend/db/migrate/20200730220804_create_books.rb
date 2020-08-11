class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.integer :pages
      t.date :date_finished
      t.string :characters
      t.text :problem
      t.text :solution
      t.text :genre_rationale
      t.text :words_learned
      t.text :something_learned
      t.text :question
      t.integer :genre_id
      t.timestamps
    end
  end
end
