class Reservation < ApplicationRecord
  validates_presence_of :restaurant_id, :party_size, :date, :time, :phone_number 

  belongs_to :restaurant
  belongs_to :user, optional: true
end
