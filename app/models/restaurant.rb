# == Schema Information
#
# Table name: restaurants
#
#  id                 :bigint           not null, primary key
#  name               :string           not null
#  cross_street       :string           not null
#  neighborhood       :string           not null
#  hours_of_operation :string           not null
#  cuisines           :string           not null
#  dining_style       :string           not null
#  dress_code         :string           not null
#  parking_details    :string           not null
#  payment_options    :string           not null
#  website            :string           not null
#  address            :string           not null
#  phone_number       :string           not null
#  cost               :string           not null
#  description        :text             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class Restaurant < ApplicationRecord
    validates_presence_of :name,
                          :cross_street,
                          :neighborhood,
                          :hours_of_operation,
                          :cuisines,
                          :dining_style,
                          :dress_code,
                          :parking_details,
                          :payment_options,
                          :website,
                          :address,
                          :phone_number,
                          :cost,
                          :description

    validates :phone_number, length: { in: 10..15 }, format: { with: /\A\(\d{3}\) \d{3}-\d{4}\z/}

    has_many :reviews
end
