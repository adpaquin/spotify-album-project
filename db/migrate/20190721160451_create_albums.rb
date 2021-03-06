class CreateAlbums < ActiveRecord::Migration[5.2]
  def change
    create_table :albums do |t|

      t.boolean :from_spotify
      t.string :artist_name
      t.string :name, null: false
      t.text :cover_image
      t.decimal :acousticness_average, null: false
      t.decimal :danceability_average, null: false
      t.decimal :energy_average, null: false
      t.decimal :instrumentalness_average, null: false
      t.decimal :liveness_average, null: false
      t.decimal :tempo_average, null: false
      t.string :cover_art
      t.belongs_to :user

      t.timestamps
    end
  end
end
