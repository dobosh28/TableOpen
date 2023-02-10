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
    password: "ivan123",
  )

  chad = User.create!(
    first_name: "Giga",
    last_name: "Chad",
    email: "gigachad@icloud.com",
    password: "gigachad123",
  )

  demo = User.create!(
    first_name: "Demo",
    last_name: "User",
    email: "demo@user.io",
    password: "password",
  )

  puts "Creating restaurants..."
  pylos = Restaurant.create!(
    name: "Pylos",
    cross_street: "between 1st Ave and Ave A",
    neighborhood: "East Village",
    hours_of_operation: "Brunch Sat, Sun 12:00 pm–3:00 pm Lunch Fri 12:00 pm–3:00 pm Dinner Daily 5:00 pm–11:00 pm",
    cuisines: "Greek, Mediterranean",
    dining_style: "Casual Elegant",
    dress_code: "Dress Casual",
    parking_details: "Street Parking",
    payment_options: "AMEX, MasterCard, Visa",
    website: "https://www.pylosrestaurant.com",
    address: "128 E 7th St, New York, NY 10009",
    phone_number: "(212) 473-0220",
    cost: "$31 and above",
    description: "Pylos is a Greek restaurant in the East Village of Manhattan, New York City. It is located at 128 East 7th Street, between 1st Avenue and Avenue A. The restaurant is owned by chef and restaurateur Michael Psilakis, who also owns the Greek restaurant Emporio in the Flatiron District. The restaurant is known for its Greek cuisine and its extensive wine list. The restaurant was named one of the 10 best new restaurants in the United States by Esquire magazine in 2006."
  )

  oceana = Restaurant.create!(
    name: "Oceana",
    cross_street: "between 6th Ave and 7th Ave",
    neighborhood: "Midtown West",
    hours_of_operation: "Lunch Mon–Fri 11:30 am–3:00 pm Dinner Mon–Fri, Sun 5:00 pm–9:30 pm Sat 4:45 pm–9:30 pm",
    cuisines: "American, Seafood, Steakhouse",
    dining_style: "Casual Elegant",
    dress_code: "Smart Casual",
    parking_details: "Public Lot",
    payment_options: "AMEX, Doners Club, Disover, JCB, MasterCard, Visa",
    website: "https://www.oceanarestaurant.com",
    address: "120 W 49th St, New York, NY 10019",
    phone_number: "(212) 759-5941",
    cost: "$31 and above",
    description: "Oceana is a seafood restaurant in New York City. It is located at 120 West 49th Street, between 6th Avenue and 7th Avenue, in Midtown Manhattan. The restaurant is owned by chef and restaurateur Michael Psilakis, who also owns the Greek restaurant Emporio in the Flatiron District. The restaurant is known for its seafood cuisine and its extensive wine list. The restaurant was named one of the 10 best new restaurants in the United States by Esquire magazine in 2006."
  )
  puts "Done!"
end
