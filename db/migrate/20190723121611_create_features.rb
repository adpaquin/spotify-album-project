class CreateFeatures < ActiveRecord::Migration[5.2]
  def change
    create_table :features do |t|
      t.decimal :acousticness, null: false
      t.decimal :danceability, null: false
      t.decimal :energy, null: false
      t.decimal :instrumentalness, null: false
      t.decimal :liveness, null: false
      t.decimal :loudness, null: false
      t.decimal :speechiness, null: false
      t.decimal :tempo, null: false

      t.belongs_to :song

      t.timestamps
    end
  end
end
