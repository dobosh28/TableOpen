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

  demo = User.create!(
    first_name: "Demo",
    last_name: "User",
    email: "demo@user.io",
    password: "password"
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
    description: "PYLOS honors the breadth of traditional Greek cuisine by bringing fresh, wholesome cooking from all regions of Greece to an elegant, contemporary and comfortable setting in the East Village. Our Name: Among the ruins of ancient Greece were items such as clay pots that revealed many clues to daily Hellenic life. PYLOS (pronounced Pee-'los) - the root word that includes things of clay - celebrates these prosaic artifacts we now recognize as great art. *Pylos Restaurant now offers outdoor dining that is covered and heated."
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
    description: "Under the guidance of the Livanos family and Paul McLaughlin, Oceana has provided New Yorkers with an exceptional seafood destination since 1992. Oceana delivers a fresh, seasonal, innovative and approachable seafood-forward menu, with additional offerings suitable for any palate. Oceana has a 70 seat Cafe with a 18 seat marble bar. Great for lunch, after work cocktails & snacks, pre-theater dinner and post-theater desserts. Spring and Summer bring a 50 seat outdoor dining area and our new West Park Beer Garden 200 person capacity, private dining options include our Chefs Table with seating for up to 6, our new Chefs Counter for 6, Wine Room for 18, and our Grand Salon for 80. Full buyouts are also available."
  )

  aroqa = Restaurant.create!(
    name: "aRoqa",
    cross_street: "Between 22nd and 23rd on 9th Ave",
    neighborhood: "Chelsea",
    hours_of_operation: "Dinner Mon–Sat 12:00 pm–8:00 pm Lunch Mon–Wed, Fri 12:00 pm–3:00 pm Brunch Sat 12:00 pm–3:00 pm Happy Hour Daily 5:00 pm–10:00 pm",
    cuisines: "Indian",
    dining_style: "Casual Dining",
    dress_code: "Business Casual",
    parking_details: "Street Parking",
    payment_options: "AMEX, MasterCard, Visa",
    website: "https://www.aroqanyc.com",
    address: "206 9th Ave, New York, NY 10011",
    phone_number: "(646) 678-5471",
    cost: "$31 and above",
    description: "Roqa [pronounced roh-kuh; an engagement ceremony in India, is a celebration of love and commitment.] Owner and managing partner, Monica Saxena, envisioned aRoqa to be a celebration of diversity and culture, merging Indian flavors with a global palate and cocktail culture. aRoqa’s menu unites diverse flavors inspired by its name: in India, a “roka” ceremony is where friends and family come together to enjoy the engagement of a couple and celebrate by sharing a meal. At aRoqa, Chef Manni and head mixologist Prasad have created a unique marriage of cuisine and cocktails in a chic, sophisticated setting, to create an elevated experience, focusing on small plates with Indian flavors."
  )

  puts "Done!"
end
