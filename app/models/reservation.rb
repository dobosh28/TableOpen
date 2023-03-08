class Reservation < ApplicationRecord
  validates_presence_of :restaurant_id, :user_id, :date, :time, :party_size, :phone_number, :email

  belongs_to :restaurant
  belongs_to :user
end
