class CreateSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :songs do |t|
      t.string :name, null: false
      t.string :token, null: false
      t.integer :duration, null: false
      t.integer :track_number, null: false

      t.belongs_to :album

      t.timestamps
    end
  end
end
