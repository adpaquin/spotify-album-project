class CreatePlaylists < ActiveRecord::Migration[5.2]
  def change
    create_table :playlists do |t|
      t.belongs_to :song
      t.belongs_to :album
    end
  end
end