# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_29_193504) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: :cascade do |t|
    t.boolean "from_spotify"
    t.string "artist_name"
    t.string "name", null: false
    t.text "cover_image"
    t.decimal "acousticness_average", null: false
    t.decimal "danceability_average", null: false
    t.decimal "energy_average", null: false
    t.decimal "instrumentalness_average", null: false
    t.decimal "liveness_average", null: false
    t.decimal "tempo_average", null: false
    t.string "cover_art"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_albums_on_user_id"
  end

  create_table "playlists", force: :cascade do |t|
    t.bigint "song_id"
    t.bigint "album_id"
    t.index ["album_id"], name: "index_playlists_on_album_id"
    t.index ["song_id"], name: "index_playlists_on_song_id"
  end

  create_table "songs", force: :cascade do |t|
    t.string "name", null: false
    t.decimal "acousticness", null: false
    t.decimal "danceability", null: false
    t.decimal "energy", null: false
    t.decimal "instrumentalness", null: false
    t.decimal "liveness", null: false
    t.decimal "tempo", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
