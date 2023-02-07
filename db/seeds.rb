# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do
    puts "Destroying tables..."
    User.destroy_all
  
    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!("users")

    puts "Creating users..."
    ivan = User.create!(
        first_name: "Ivan",
        last_name: "Dobosh",
        email: "idobosh01@gmail.com", 
        password: "ivan123"
    )
    
    chad = User.create!(
        first_name: "Giga",
        last_name: "Chad",
        email: "gigachad@icloud.com", 
        password: "gigachad123"
    )

    puts "Done!"
end
