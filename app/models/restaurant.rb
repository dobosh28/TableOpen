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

    validates_uniqueness_of :address, :phone_number
    validates :phone_number, length: { in: 10..15 }, format: { with: /\A\(\d{3}\) \d{3}-\d{4}\z/}
end
