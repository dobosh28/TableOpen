class RemovePrimaryLocation < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :primary_location
  end
end
