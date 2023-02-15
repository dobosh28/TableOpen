# == Schema Information
#
# Table name: reviews
#
#  id            :bigint           not null, primary key
#  nickname      :string           not null
#  body          :text             not null
#  overall       :integer          not null
#  food          :integer          not null
#  service       :integer          not null
#  ambience      :integer          not null
#  value         :integer          not null
#  user_id       :integer          not null
#  restaurant_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Review < ApplicationRecord
    validates_presence_of :nickname, :body, :overall, :food, :service, :ambience, :value, :user_id, :restaurant_id
    vlaidates :overall, :food, :service, :ambience, :value, inclusion: { in: (1..5), message: "The rating must be between 1 and 5 stars" }

    validates :body, length: { minimum: 50, maximum: 5000, message: "Must be between 50 and 5000 characters" }
    validates :nickname, length: { minimum: 4, maximum: 24, message: "Must be between 4 and 24 characters" }

    belongs_to :user
    belongs_to :restaurant
end
