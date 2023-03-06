class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.integer :user_id, null: false
      t.integer :restaurant_id, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :phone_number, null: false
      t.integer :party_size, null: false
      t.datetime :date, null: false
      t.datetime :time, null: false
      t.text :special_request

      t.timestamps
    end

    add_index :reservations, :restaurant_id
    add_index :reservations, :user_id
  end
end
