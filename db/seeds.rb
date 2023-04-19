require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
  puts "Destroying tables..."

  Review.destroy_all
  Restaurant.destroy_all
  User.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!("users")

  puts "Creating users..."
  user_1 = User.create!(first_name: "Ivan", last_name: "Dobosh", email: "idobosh01@gmail.com", password: "123456")
  user_2 = User.create!(first_name: "Giga", last_name: "Chad", email: "gigachad@icloud.com", password: "123456")
  user_3 = User.create!(first_name: "Demo", last_name: "User", email: "demo@user.io", password: "123456")
  user_4 = User.create!(first_name: "Frank", last_name: "Brown", email: "cool@frank.com", password: "123456")
  user_5 = User.create!(first_name: "Jack", last_name: "Stenrud", email: "jack@sten.com", password: "123456")
  user_6 = User.create!(first_name: "Lily", last_name: "Shaw", email: "lily@shaw.com", password: "123456")
  user_7 = User.create!(first_name: "Anna", last_name: "Kovalski", email: "anna@k.com", password: "123456")
  user_8 = User.create!(first_name: "Kiki", last_name: "Smith", email: "kiki@smith.com", password: "123456")
  
  
  puts "Creating restaurants..."
  restaurant_1 = Restaurant.create!(
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
    cost: "$31 to $50",
    description: "PYLOS honors the breadth of traditional Greek cuisine by bringing fresh, wholesome cooking from all regions of Greece to an elegant, contemporary and comfortable setting in the East Village. Our Name: Among the ruins of ancient Greece were items such as clay pots that revealed many clues to daily Hellenic life. PYLOS (pronounced Pee-'los) - the root word that includes things of clay - celebrates these prosaic artifacts we now recognize as great art. *Pylos Restaurant now offers outdoor dining that is covered and heated."
  )

  restaurant_2 = Restaurant.create!(
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
    cost: "$31 to $50",
    description: "Under the guidance of the Livanos family and Paul McLaughlin, Oceana has provided New Yorkers with an exceptional seafood destination since 1992. Oceana delivers a fresh, seasonal, innovative and approachable seafood-forward menu, with additional offerings suitable for any palate. Oceana has a 70 seat Cafe with a 18 seat marble bar. Great for lunch, after work cocktails & snacks, pre-theater dinner and post-theater desserts. Spring and Summer bring a 50 seat outdoor dining area and our new West Park Beer Garden 200 person capacity, private dining options include our Chefs Table with seating for up to 6, our new Chefs Counter for 6, Wine Room for 18, and our Grand Salon for 80. Full buyouts are also available."
  )

  restaurant_3 = Restaurant.create!(
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
    cost: "$31 to $50",
    description: "Roqa [pronounced roh-kuh; an engagement ceremony in India, is a celebration of love and commitment.] Owner and managing partner, Monica Saxena, envisioned aRoqa to be a celebration of diversity and culture, merging Indian flavors with a global palate and cocktail culture. aRoqa’s menu unites diverse flavors inspired by its name: in India, a “roka” ceremony is where friends and family come together to enjoy the engagement of a couple and celebrate by sharing a meal. At aRoqa, Chef Manni and head mixologist Prasad have created a unique marriage of cuisine and cocktails in a chic, sophisticated setting, to create an elevated experience, focusing on small plates with Indian flavors."
  )

  restaurant_4 = Restaurant.create!(
    name: "Gyu-Kaku Japanese BBQ",
    cross_street: "50th, 3rd Ave (2nd floor)",
    neighborhood: "Midtown East",
    hours_of_operation: "Mon–Thu, Sun 11:00 am–10:00 pm Fri, Sat 11:00 am–11:00 pm Happy Hour Daily 11:00 am–5:00 pm",
    cuisines: "Japanese, Barbecue, Tapas / Small Plates",
    dining_style: "Casual Elegant",
    dress_code: "Business Casual",
    parking_details: "Street Parking",
    payment_options: "AMEX, Diners Club, Discover, JCB, MasterCard, Visa",
    website: "https://www.gyu-kaku.com/midtown",
    address: "805 3rd Ave, New York, NY 10022",
    phone_number: "(212) 702-8816",
    cost: "$30 and under",
    description: "Gyu-Kaku, meaning 'Horn of the Bull' in Japanese, provides the authentic Japanese yakiniku (grilled barbecue) dining experience where customers share premium cooked meats over a flaming charcoal grill, while sipping on Japanese sake, shochu, and frosty cold beers. Gyu-Kaku offers a wide range of meats including the best-seller Harami Skirt Steak in Miso Marinade and Certified Angus Kalbi Short Rib in Tare Sweet Soy Marinade."
  )

  restaurant_5 = Restaurant.create!(
    name: "La Grande Boucherie",
    cross_street: "6 1/2 Avenue between W 53rd &amp; W 54th Street",
    neighborhood: "Midtown West",
    hours_of_operation: "Breakfast Mon–Fri 8:00 am–11:00 am Brunch Sat, Sun 10:00 am–3:45 pm Lunch Mon–Fri 11:00 am–4:00 pm Late Lunch Daily 4:00 pm–4:45 pm Happy Hour Mon–Fri 4:00 pm–7:00 pm Dinner Daily 5:00 pm–12:00 am",
    cuisines: "French, Steakhouse",
    dining_style: "Casual Dining",
    dress_code: "Smart Casual",
    parking_details: "Public Lot",
    payment_options: "AMEX, Discover, MasterCard, Visa",
    website: "https://www.boucherie.nyc/",
    address: "145 W 53rd St, New York, NY 10019",
    phone_number: "(212) 510-7714",
    cost: "$50 and over",
    description: "With a dazzling dining gallery featuring 40’ glass ceilings, this one-of-a-kind brasserie is built in the tradition of the Belle Epoque, inspired by elegant and ornamental Art Nouveau style. The menu features French classics and timeless bistro favorites, with a focus on prime cuts and an in-house meat program. In addition to an extensive wine list and classic cocktails, La Grande Boucherie also features an inspired menu of absinthe-driven signature drinks. We look forward to welcoming you!"
  )

  restaurant_6 = Restaurant.create!(
    name: "The Odeon",
    cross_street: "Thomas Street",
    neighborhood: "TriBeCa - Downtown",
    hours_of_operation: "Brunch Sat, Sun 10:00 am–4:00 pm Lunch Mon–Fri 11:00 am–4:00 pm Brasserie Daily 4:00 pm–5:00 pm Dinner Daily 5:00 pm–11:00 pm",
    cuisines: "French, American",
    dining_style: "Casual Elegant",
    dress_code: "Casual Dress",
    parking_details: "Street Parking",
    payment_options: "AMEX, MasterCard, Pay with OpenTable, Visa",
    website: "http://www.theodeonrestaurant.com/",
    address: "145 W Broadway, New York, NY 10013",
    phone_number: "(212) 233-7000",
    cost: "$31 to $50",
    description: "The Odeon offers reservations for indoor and outdoor dining for parties up to 6 guests. Walk-Ins are welcome. The Outdoor Cafe is complete with rain-proof awnings, umbrellas, and fans. Due to demand, we are unable to hold your reservation past the time it has been booked. If you cannot be present at the time of your reservation, we will offer the table to waiting guests. If you are running late or wish to cancel, please call us at 212-233-0507. The Odeon takes the last “Open Table” Reservation at 10:15 PM. Should you like to visit the restaurant after that time, please call 212-233-0507 to check availability. We allow 1 hour 45 minutes dining time for parties up to 2 guests and 2 hours for parties of 3-4 guests."
  )

  restaurant_7 = Restaurant.create!(
    name: "Quality Meats",
    cross_street: "Between 5th and 6th",
    neighborhood: "Midtown West",
    hours_of_operation: "Lunch Mon–Fri 12:00 pm–3:00 pm Dinner Mon–Wed, Sun 5:00 pm–10:30 pm Thu–Sat 5:00 pm–11:00 pm",
    cuisines: "American, Steakhouse, Steak",
    dining_style: "Casual Elegant",
    dress_code: "Business Casual",
    parking_details: "Garage available on 58th street between 5th & 6th avenues, next to the Park Lane Hotel.",
    payment_options: "AMEX, Contactless Payment, Diners Club, Discover, JCB, MasterCard, Visa",
    website: "http://www.qualitymeatsnyc.com/",
    address: "57 West 58th Street, New York, NY 10019",
    phone_number: "(212) 371-7777",
    cost: "$31 to $50",
    description: "Quality Meats is the best steakhouse in New York City. Located in Midtown Manhattan near Central Park, MOMA, Carnegie Hall, Rockefeller Center, Radio City Music Hall, and Times Square, Quality Meats features modern interpretations of familiar dishes and flavor combinations, resulting in unique tastes, innovative presentations, and a distinctive Quality Meats style. The warm, industrial décor by award-winning designers AvroKO draws on cues from traditional New York City family-owned butcher shops, in the use of warm wood, stainless steel, and white marble."  
  )

  restaurant_8 = Restaurant.create!(
    name: "Chama Mama",
    cross_street: "W 14th St between 6th Ave and 7th Ave",
    neighborhood: "Chelsea",
    hours_of_operation: "Mon-Sun 11:00am-11:00pm",
    cuisines: "Georgian",
    dining_style: "Casual Dining",
    dress_code: "Casual Dress",
    parking_details: "Street Parking",
    payment_options: "AMEX, Discover, MasterCard, Visa",
    website: "https://www.chamamama.com/",
    address: "149 W 14th St, New York, NY 10011",
    phone_number: "(646) 438-9007",
    cost: "$30 and under",
    description: "Chama Mama is a Georgian restaurant in the heart of Chelsea. We serve traditional Georgian cuisine, including khachapuri, khinkali, lobio, and more. We also have a full bar with Georgian wines, craft beers, and cocktails. We are open for lunch and dinner, and we offer takeout and delivery. We look forward to seeing you!"  
  )

  restaurant_9 = Restaurant.create!(
    name: "Veselka",
    cross_street: "2nd Ave and E 9th St", 
    neighborhood: "Ukrainian Village",
    hours_of_operation: "Sun–Thu 11:00am–11:00pm, Fri–Sat 11:00 am–12:00 am",
    cuisines: "Ukrainian, Eastern European",
    dining_style: "Casual Dining",
    dress_code: "Casual Dress",
    parking_details: "Street Parking",
    payment_options: "AMEX, Discover, MasterCard, Visa",
    website: "https://www.veselka.com/",
    address: "144 2nd Ave, New York, NY 10003",
    phone_number: "(212) 228-9682",
    cost: "$30 and under",
    description: "Veselka - Second Ave has been serving up delectable Ukrainian cuisine in the heart of New York's East Village since 1954. For over six decades patrons have shrugged the weight of the day off in this cozy coffee shop to savor classic pierogi, goulash, borscht and stroganoff. Tradition is never compromised at Veselka, where you can sit with friends and discuss events, or stay quiet by yourself and get lost in the comfortable food. Veselka, like anything built from scratch, came from humble beginnings. It started out as an unadorned newsstand, serving sandwiches and soups to the masses. It's now grown into a twenty-four hour sought after place of congregation. Veselka has been a mainstay on this corner of East Ninth and Second Avenue since its conception and plans to stay that way for years to come."  
  )

  restaurant_10 = Restaurant.create!(
    name: "Brooklyn Chop House",
    cross_street: "Nassau Street and Spruce St",
    neighborhood: "Financial District",
    hours_of_operation: "Daily 4:00 pm–11:00 pm",
    cuisines: "Steakhouse, Chinese (Beijing)",
    dining_style: "Fine Dining",
    dress_code: "Casual Dress",
    parking_details: "Parking Garage in building and street",
    payment_options: "AMEX, Discover, MasterCard, Visa",
    website: "http://www.brooklynchophouse.com/",
    address: "150 Nassau St, New York, NY 10038",
    phone_number: "(212) 619-1200",
    cost: "$31 to $50",
    description: "Brooklyn Chop House is a modern American steakhouse located in the heart of the Financial District. The restaurant features a 28-foot bar, a 1,000-bottle wine cellar, and a 1,000-square-foot private dining room. The menu features a variety of steaks, chops, and seafood, as well as a selection of appetizers, salads, and sides. The restaurant also offers a variety of craft cocktails, wines, and beers." 
  )

  restaurant_11 = Restaurant.create!(
    name: "Ocean Prime - New York",
    cross_street: "52nd Street Between 6th and 7th Ave",
    neighborhood: "Rockefeller Center Midtown",
    hours_of_operation: "Mon–Fri 11:30 am–10:00 pm Sat 4:00 pm–10:00 pm Sun 4:00 pm–9:00 pm",
    cuisines: "Seafood, Steak, Sushi",
    dining_style: "Fine Dining",
    dress_code: "Business Casual",
    parking_details: "None",
    payment_options: "AMEX, Discover, MasterCard, Visa",
    website: "http://www.ocean-prime.com/locations/new-york-city",
    address: "123 West 52nd Street, New York, NY 10019",
    phone_number: "(212) 965-1404",
    cost: "$50 and over",
    description: "Located in Midtown on 52nd between 6th & 7th, Ocean Prime is a nationally acclaimed, modern American restaurant & lounge from the award-winning Cameron Mitchell Restaurants. Stunning settings, an impressive menu of seafood & steaks, and genuine hospitality make Ocean Prime the ideal place to socialize, talk business, celebrate & indulge. Reservations are recommended."  
  )

  restaurant_12 = Restaurant.create!(
    name: "Chazz Palminteri Italian Restaurant",
    cross_street: "5th Avenue and 6th Avenue",
    neighborhood: "Theater District / Times Square",
    hours_of_operation: "Sun 3:00 pm–10:00 pm Lunch Mon–Fri 12:00 pm–3:45 pm Dinner Mon–Sat 4:00 pm–10:00 pm",
    cuisines: "Italian, Steakhouse, Seafood",
    dining_style: "Fine Dining",
    dress_code: "Business Casual",
    parking_details: "None",
    payment_options: "AMEX, Discover, JCB, MasterCard, Visa",
    website: "http://www.chazzpalminterinyc.com/",
    address: "30 W 46th Street, New York, NY 10036",
    phone_number: "(212) 355-5540",
    cost: "$50 and over",
    description: "Chazz Palminteri Italian Restaurant, conveniently located on 46th street between 5th and 6th avenues, showcases a modern décor. An intimate bar space with a stunning bar and high top seating. Chazz Palminteri’s features the finest meat, seafood and pasta dishes, as well as antipasto and traditional Italian desserts. Signature dishes include Zuppa di Cozze, Filetto di Pomodoro and Cotoletta di Vitello al Marsala. The upscale Italian eatery offers a global wine list boasting close to 250 wines and is curated to pair with the bold, rich flavors of classic Italian fare. Custom cocktails featuring spirits blended with seasonal ingredients as well as Italian and craft beer are offered as well. The space can accommodate 100+ guests for lunch and dinner."  
  )

  restaurant_13 = Restaurant.create!(
    name: "Jalao",
    cross_street: "Amsterdam Ave & 181st St",
    neighborhood: "Washington Heights",
    hours_of_operation: "Mon–Thur 3:00 am–12:00 am Fri 3:00 pm–1:00 am Sun 12:00 pm–11:00 pm",
    cuisines: "Caribbean",
    dining_style: "Casual Dining",
    dress_code: "Casual Dress",
    parking_details: "None",
    payment_options: "AMEX, MasterCard, Visa",
    website: "http://jalaonyc.com/",
    address: "2420 Amsterdam Ave, New York, NY 10033",
    phone_number: "(929) 688-4684",
    cost: "$30 and under",
    description: "Welcome to Jalao! An authentic Dominican Republic experience in the heart of Washington Heights."  
  )

  restaurant_14 = Restaurant.create!(
    name: "PHD Terrace – Dream Midtown",
    cross_street: "Broadway and 56th Street",
    neighborhood: "Midtown West",
    hours_of_operation: "Tue, Wed, Sun 5:00 pm–12:00 am Thu 5:00 pm–1:00 am Fri, Sat 5:00 pm–2:00 am",
    cuisines: "Contemporary American, Bar / Lounge / Bottle Service",
    dining_style: "Casual Elegant",
    dress_code: "Smart Casual",
    parking_details: "Street Parking",
    payment_options: "AMEX, Diners Club, Discover, MasterCard, Visa",
    website: "http://www.phdterrace.com/",
    address: "210 W 55th St, New York, NY 10019",
    phone_number: "(646) 756-2044",
    cost: "$30 and under",
    description: "Located in the heart of NYC at the top of Dream Hotel Midtown, PHD Terrace is an all-season rooftop oasis perfect for after-work drinks, weekend revelry and private events. Enjoy the intimate, indoor atmosphere of the lower level, or head outside to the upper level to enjoy an evening on the Terrace providing breathtaking views of Manhattan & Times Square, the ultimate temporary escape from the hustle of Midtown Manhattan."  
  )

  restaurant_15 = Restaurant.create!(
    name: "Nizza - NYC",
    cross_street: "Between 44th and 45th Streets",
    neighborhood: "Midtown West",
    hours_of_operation: "Mon, Tue 12:00 pm–10:30 pm Wed–Fri 12:00 pm–11:30 pm Sat 11:00 am–11:30 pm Sun 11:00 am–10:30 pm",
    cuisines: "Italian",
    dining_style: "Casual Dining",
    dress_code: "Casual Dress",
    parking_details: "None",
    payment_options: "AMEX, MasterCard, Visa",
    website: "https://nizzanyc.com/",
    address: "630 9th Ave, New York, NY 10036",
    phone_number: "(212) 956-1800",
    cost: "$30 and under",
    description: "A modern Italian Trattoria in the heart of Hell's Kitchen, Nizza has been an elevated crowd pleaser and a favorite of neighborhood locals, tourists and the pre-theatre crowd since 2007."  
  )

  # restaurant_x = Restaurant.create!(
  #   name: "",
  #   cross_street: "",
  #   neighborhood: "",
  #   hours_of_operation: "",
  #   cuisines: "",
  #   dining_style: "",
  #   dress_code: "",
  #   parking_details: "",
  #   payment_options: "",
  #   website: "",
  #   address: "",
  #   phone_number: "",
  #   cost: "",
  #   description: ""  
  # )
  

  
  photo_1 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_1.jpeg')
  photo_2 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_2.jpeg')
  photo_3 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_3.jpeg')
  photo_4 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_4.jpeg')
  photo_5 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_5.png')
  photo_6 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_6.jpeg')
  photo_7 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_7.jpeg')
  photo_8 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_8.webp')
  photo_9 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_9.webp')
  photo_10 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_10.jpeg')
  photo_11 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_11.jpeg')
  photo_12 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_12.avif')
  photo_13 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_13.jpeg')
  photo_14 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_14.jpeg')
  photo_15 = URI.open('https://table-open-yd-seeds.s3.amazonaws.com/photo_15.jpeg')



  
  restaurant_1.photo.attach(io: photo_1, filename: 'photo_1.jpeg')
  restaurant_2.photo.attach(io: photo_2, filename: 'photo_2.jpeg')
  restaurant_3.photo.attach(io: photo_3, filename: 'photo_3.jpeg')
  restaurant_4.photo.attach(io: photo_4, filename: 'photo_4.jpeg')
  restaurant_5.photo.attach(io: photo_5, filename: 'photo_5.png')
  restaurant_6.photo.attach(io: photo_6, filename: 'photo_6.jpeg')
  restaurant_7.photo.attach(io: photo_7, filename: 'photo_7.jpeg')
  restaurant_8.photo.attach(io: photo_8, filename: 'photo_8.webp')
  restaurant_9.photo.attach(io: photo_9, filename: 'photo_9.webp')
  restaurant_10.photo.attach(io: photo_10, filename: 'photo_10.jpeg')
  restaurant_11.photo.attach(io: photo_11, filename: 'photo_11.jpeg')
  restaurant_12.photo.attach(io: photo_12, filename: 'photo_12.avif')
  restaurant_13.photo.attach(io: photo_13, filename: 'photo_13.jpeg')
  restaurant_14.photo.attach(io: photo_14, filename: 'photo_14.jpeg')
  restaurant_15.photo.attach(io: photo_15, filename: 'photo_15.jpeg')


  puts "Creating reviews..."
  review_1 = Review.create!(
    overall: 5,
    service: 5,
    food: 5,
    ambience: 4,
    value: 5,
    body: "This is a great restaurant. The food is delicious and the service is great. I would definitely recommend this restaurant to anyone looking for a great meal.",
    nickname: "IvanD",
    user_id: user_1.id,
    restaurant_id: restaurant_1.id
  )

  review_2 = Review.create!(
    overall: 4,
    service: 3,
    food: 5,
    ambience: 5,
    value: 4,
    body: "The food was delicious and the ambience was great. The service was a little slow but overall it was a great experience.",
    nickname: "Kiki",
    user_id: user_8.id,
    restaurant_id: restaurant_1.id
  )

  review_3 = Review.create!(
    overall: 4,
    service: 4,
    food: 3,
    ambience: 4,
    value: 3,
    body: "The food was alright and the service was a little slow. The restaurant as a whole was okay but I, personally, would not recommend it to my friends and family.",
    nickname: "IvanD",
    user_id: user_1.id,
    restaurant_id: restaurant_2.id
  )

  review_4 = Review.create!(
    overall: 5,
    service: 5,
    food: 5,
    ambience: 5,
    value: 4,
    body: "The food was delicious and beautifully presented at this restaurant. The staff were attentive and provided excellent service. Overall, it was a fantastic dining experience.",
    nickname: "DemoU",
    user_id: user_3.id,
    restaurant_id: restaurant_6.id
  )

  puts "Done!"
end
