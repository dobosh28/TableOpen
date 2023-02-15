class CreateRestaurants < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.string :cross_street, null: false
      t.string :neighborhood, null: false
      t.string :hours_of_operation, null: false
      t.string :cuisines, null: false
      t.string :dining_style, null: false
      t.string :dress_code, null: false
      t.string :parking_details, null: false
      t.string :payment_options, null: false
      t.string :website, null: false
      t.string :address, null: false
      t.string :phone_number, null: false
      t.string :cost, null: false
      t.text :description, null: false
      t.timestamps
    end
  end
end
