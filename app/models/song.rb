require 'rspotify'
require_relative 'playlist'

class Song < ApplicationRecord
  validates :name, presence: true
  validates :acousticness, presence: true
  validates :danceability, presence: true
  validates :energy, presence: true
  validates :instrumentalness, presence: true
  validates :liveness, presence: true
  validates :tempo, presence: true
  
  has_many :playlists, :dependent => :destroy
  has_many :albums, through: :playlists
end
