
const ownerId = "66b7f2a7c1234567890abcd1"; 



const sampleListings = [
  {
    title: "Super Collection O Hanamkonda Near NIT",
    description: "Situated just a 2-minute walk from the NIT Warangal campus, this hotel offers air-conditioned rooms and an on-site restaurant. Ideal for quick campus access and comfortable city stays.",
    image: {
      url: "https://rukmini-ct.flixcart.com/w_2048,f_auto,q_auto/ct-hotel-images/places/hotels/cms/4266/4266816/images/image_4266816_e002e57f-9813-4e43-883a-96a4044fb24b.jpg",
      filename: "Super-Collection-O-Hanamkonda-Near-NIT"
    },
    price: 3179,
    location: "Hanamkonda, Warangal",
    country: "India",
    amenities: ["WiFi", "Laundry", "Meals", "Restaurant", "Room Service", "Parking", "Free Breakfast"],
    roomType: "hotel",
    geometry: { type: "Point", coordinates: [79.54, 18.01] },
    reviews: [],
    owner: ownerId
  },
  {
    title: "Townhouse Casa Grand",
    description: "Located 900m from NIT Warangal, this property provides modern rooms with a convenient location and flexible check-in options.",
    image: {
      url: "https://images.oyoroomscdn.com/uploads/hotel_image/234773/medium/xmtkerqhgpii.jpg",
      filename: "Townhouse-Casa-Grand"
    },
    price: 1831,
    location: "Subedari, Hanamkonda, Warangal",
    country: "India",
    amenities: ["Air conditioning", "TV", "Hot water", "Room service", "Complimentary breakfast", "Laundry service", "Free cancellation"],
    roomType: "hotel",
    geometry: { type: "Point", coordinates: [79.53508, 17.99064] },
    reviews: [],
    owner: ownerId
  },
  {
    title: "Comfort Stays Luxury Rooms",
    description: "900m from NIT Warangal, this hotel is close to Kazipet railway station and offers clean, spacious rooms perfect for families or business stays.",
    image: {
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/641375359.jpg?k=193bf6ad1ec6c522397c994568142e362c3ebaa835535b06ed0583a1ebec931b&o=&hp=1",
      filename: "Comfort-Stays-Luxury-Rooms"
    },
    price: 3500,
    location: "Subedari, Hanamkonda, Warangal",
    country: "India",
    amenities: ["Clean rooms", "Spacious rooms", "Comfortable beds", "Complimentary breakfast", "Free cancellation", "Linens Provided", "Family Rooms", "Soundproof Rooms"],
    roomType: "hotel",
    geometry: { type: "Point", coordinates: [79.535, 17.990] },
    reviews: [],
    owner: ownerId
  },
  {
    title: "Hotel Grand Gayathri Warangal",
    description: "A 3-star property with warmly decorated rooms, a family-friendly atmosphere, and an in-house dining experience. Convenient for both leisure and business travelers.",
    image: {
      url: "https://imgcld.yatra.com/ytimages/image/upload/t_hotel_mobileactualimage/v1563797132/Hotel/Warangal/00028802/hotel-grand-gayathri_yOcxFG.jpg",
      filename: "Hotel-Grand-Gayathri-Warangal"
    },
    price: 886,
    location: "Girmajipet, Warangal",
    country: "India",
    amenities: ["Restaurant", "Room service", "Free WiFi", "Parking", "Laundry service", "Kid-friendly", "Flat-screen TVs", "Complimentary breakfast", "Fitness Centre", "Wheel Chair Seating", "Airport Transfer"],
    roomType: "hotel",
    geometry: { type: "Point", coordinates: [79.6, 17.98] },
    reviews: [],
    owner: ownerId
  },
  {
    title: "Hotel Shreya",
    description: "Located in Hanamkonda, 4.49km from Central Library, NITW, with quick city access and convenient booking policies.",
    image: {
      url: "https://media.easemytrip.com/media/Hotel/TEMP1/RoomImage/RoomImageJuCTBZ.jpg",
      filename: "Hotel-Shreya"
    },
    price: 2484,
    location: "Hanamkonda, Warangal",
    country: "India",
    amenities: ["Free cancellation", "Kid-friendly", "Shuttle Bus", "Bar", "Cafe", "Restaurant", "Wake-Up Calls", "24 Hour Concierge/Help Desk", "Caretaker", "Shuttle Service", "Airport Transfer", "Bus Station Transfers", "Medical Assistance", "Doctor On Call", "First Aid", "Safety Kits", "In Room Locker", "CCTV", "Electronic Keycard", "ATM Service", "Currency Exchange"],
    roomType: "hotel",
    geometry: { type: "Point", coordinates: [79.55, 18.02] },
    reviews: [],
    owner: ownerId
  },
  {
    title: "Venkateshwara Mitra Residency",
    description: "4.9 km from NIT Warangal, this property offers a fantastic location and flexible date change policies, suitable for extended stays.",
    image: {
      url: "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/49000000/48310000/48304000/48303916/6a50ef68_z.jpg?_src=imagekit&tr=c-at_max,f-jpg,h-720,pr-true,q-40,w-1280",
      filename: "Venkateshwara-Mitra-Residency"
    },
    price: 1421,
    location: "Nakkala Gutta, Hanamkonda, Warangal",
    country: "India",
    amenities: ["Fantastic location", "Clean rooms", "Spacious rooms", "Date changes allowed", "Kid-friendly", "WiFi", "Fitness Centre", "24 Hour Concierge/Help Desk", "Guide Services", "Room Service"],
    roomType: "hotel",
    geometry: { type: "Point", coordinates: [79.555393, 18.000839] },
    reviews: [],
    owner: ownerId
  },
  {
    title: "Hotel Thousand Pillars",
    description: "Located near popular temples with excellent hospitality and cultural charm. Ideal for tourists and heritage lovers.",
    image: {
      url: "https://gos3.ibcdn.com/eaf879ac268711eca3600a58a9feac02.jpg",
      filename: "HOTEL-THOUSAND-PILLARS"
    },
    price: 3184,
    location: "Nakkala Gutta, Warangal",
    country: "India",
    amenities: ["Nearby temples", "On-site restaurant", "Excellent hospitality", "Courteous staff", "Minibar", "Fireplace", "Smart controls", "Dental kit", "Terrace", "Barbeque", "Coffee shop", "Cafe", "Newspaper", "Free Wi-Fi", "Smoking Rooms", "24-hour Room Service", "Elevator/Lift", "Umbrellas", "Refrigerator", "Smoke Detector"],
    roomType: "hotel",
    geometry: { type: "Point", coordinates: [79.56, 18] },
    reviews: [],
    owner: ownerId
  },
  {
    title: "Hotel Meridian Blue",
    description: "1.4 km from NIT Warangal, offering easy campus access and a comfortable stay for students and professionals.",
    image: {
      url: "https://rukmini-ct.flixcart.com/w_2048,f_auto,q_auto/ct-hotel-images/places/hotels/cms/4674/4674217/images/image_4674217_5699c281-4cd6-4a83-bcbd-7654381523a0.jpeg",
      filename: "HOTEL-MERIDIAN-BLUE"
    },
    price: 2395,
    location: "Hanamkonda, Warangal",
    country: "India",
    amenities: ["Air Conditioning", "Smoking Rooms", "Free Wi-Fi", "First-aid Services", "Reception", "Room Service", "Work desk", "Minibar", "Hairdryer"],
    roomType: "motel",
    geometry: { type: "Point", coordinates: [79.53, 17.99] },
    reviews: [],
    owner: ownerId
  },
  {
    title: "Hotel Sushmitha Inn",
    description: "2.6 km from NIT Warangal, with a peaceful location and convenient access to key city spots.",
    image: {
      url: "https://rukmini-ct.flixcart.com/w_2048,f_auto,q_auto/ct-hotel-images/places/hotels/cms/4535/4535132/images/image_4535132_71ae7eba-6e45-477d-afe3-b78e4dc756d7.jpeg",
      filename: "Hotel-Sushmitha-Inn"
    },
    price: 2695,
    location: "Subedari, Warangal",
    country: "India",
    amenities: ["Medical Centre", "Free Wi-Fi", "Seating Area", "Umbrellas", "Printer", "Wake-up Call", "Kitchenette", "Newspaper", "24-hour Room Service", "Elevator/Lift", "Refrigerator", "Laundry Service", "Smoke Detector"],
    roomType: "hotel",
    geometry: { type: "Point", coordinates: [79.54, 17.99] },
    reviews: [],
    owner: ownerId
  }
];

  
module.exports = { data: sampleListings }; 
