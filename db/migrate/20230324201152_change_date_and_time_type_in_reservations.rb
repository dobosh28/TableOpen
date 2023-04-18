class ChangeDateAndTimeTypeInReservations < ActiveRecord::Migration[7.0]
  def change
    change_column :reservations, :date, 'date USING CAST(date AS date)'
    change_column :reservations, :time, :time
  end
end
