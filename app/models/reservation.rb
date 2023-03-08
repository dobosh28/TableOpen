class Reservation < ApplicationRecord
  validates :first_name, :last_name, :phone_number, :date, :email, :time, presence: true, unless: :user_id? 
  validates :phone_number, :email, presence: true, unless: :user_id?

  belongs_to :restaurant
  belongs_to :user, optional: true
end
