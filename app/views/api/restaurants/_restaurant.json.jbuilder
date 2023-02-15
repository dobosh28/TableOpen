json.extract! restaurant,
             :id,
             :name,
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
             :description,
             :created_at,
             :updated_at

json.photoUrl restaurant.photo.attached? ? url_for(restaurant.photo) : nil