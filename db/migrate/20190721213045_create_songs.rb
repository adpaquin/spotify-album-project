class CreateSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :songs do |t|
      t.string :name, null: false
      t.decimal :acousticness, null: false
      t.decimal :danceability, null: false
      t.decimal :energy, null: false
      t.decimal :instrumentalness, null: false
      t.decimal :liveness, null: false
      t.decimal :tempo, null: false

      t.timestamps
    end
  end
end
