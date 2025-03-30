type Subscription = {
    start: string;
    end: string;
    daysLeft: number;
  };
  
  type Restaurant = {
    id: number;
    name: string;
    logo: string;
    type: string;
    rating: number;
    location: string;
    status: "active" | "inactive";
    subscription: Subscription;
  };
  
  export const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Restaurant 1",
      logo:
        "https://images.pexels.com/photos/1383776/pexels-photo-1383776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      type: "Cafe",
      rating: 4.8,
      location: "Savar, Dhaka",
      status: "active",
      subscription: { start: "10 Jan, 2025", end: "10 Mar, 2025", daysLeft: 90 },
    },
    {
      id: 2,
      name: "Restaurant 2",
      logo:
        "https://images.pexels.com/photos/1383776/pexels-photo-1383776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      type: "Cafe",
      rating: 4.8,
      location: "Savar, Dhaka",
      status: "active",
      subscription: { start: "10 Jan, 2025", end: "10 Mar, 2025", daysLeft: 90 },
    },
  ];