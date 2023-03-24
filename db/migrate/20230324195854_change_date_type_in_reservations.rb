class ChangeDateTypeInReservations < ActiveRecord::Migration[7.0]
  def change
    change_column :reservations, :date, :string
  end
end
