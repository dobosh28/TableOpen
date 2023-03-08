class RemoveColumnsFromReservations < ActiveRecord::Migration[7.0]
  def change
    remove_column :reservations, :first_name, :string
    remove_column :reservations, :last_name, :string
  end
end
