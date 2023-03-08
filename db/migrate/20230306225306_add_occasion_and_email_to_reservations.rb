class AddOccasionAndEmailToReservations < ActiveRecord::Migration[7.0]
  def change
    add_column :reservations, :occasion, :string
    add_column :reservations, :email, :string, null: false
  end
end
