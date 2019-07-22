class CreateAlbums < ActiveRecord::Migration[5.2]
  def change
    create_table :albums do |t|
      t.string :artist_name, null: false
      t.string :name, null: false
      t.integer :duration, null: false
      t.text :cover_image

      t.timestamps
    end
  end
end
