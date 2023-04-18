class Reservation < ApplicationRecord
  validates :phone_number, presence: true, length: { is: 10 }, format: { with: /\A[0-9]{10}\z/, message: "Your phone number format is invalid." }
  validates_presence_of :restaurant_id, :user_id, :date, :time, :email
  validates :party_size, presence: true, numericality: { greater_than: 0 }, allow_blank: true
  belongs_to :restaurant
  belongs_to :user
end
