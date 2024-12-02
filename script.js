// script.js

// Sample car data
const cars = [
    { id: 1, type: "Economy", available: true },
    { id: 2, type: "Standard", available: true },
    { id: 3, type: "Luxury", available: false }
  ];
  
 
  
  
  // Handle form submission
  document.getElementById("rentalForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Collect form data
    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      pickUpDate: document.getElementById("pickUpDate").value,
      pickUpTime: document.getElementById("pickUpTime").value,
      returnDate: document.getElementById("returnDate").value,
      returnTime: document.getElementById("returnTime").value,
      carType: document.getElementById("carType").value,
      additionalServices: [
        document.getElementById("gps").checked ? "GPS" : null,
        document.getElementById("childSeat").checked ? "Child Seat" : null
      ].filter(Boolean),
      drivers: parseInt(document.getElementById("drivers").value)
    };
  
    const error = validateForm(data);
    if (error) {
      document.getElementById("result").innerText = error;
      return;
    }
  
   
    const rentalDays = Math.ceil((returnDate - pickUpDate) / (1000 * 60 * 60 * 24));
  
    if (rentalDays <= 0) {
      document.getElementById("result").innerText = "Invalid rental dates.";
      return;
    }
  
    const availableCar = cars.find(car => car.type === data.carType && car.available);
    if (!availableCar) {
      document.getElementById("result").innerText = "No car available for the selected type.";
      return;
    }
  
    const totalCost = calculateRentalCost(rentalDays, data.carType, data.additionalServices);
  
  });

