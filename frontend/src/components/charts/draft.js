export const fuels = [
  {
    datetime: "2023-03-08T07:41:00.000Z",
    location: "Simpang Bedok",
    fuel_amount: "13",
    price: "44.80",
  },
  {
    datetime: "2023-03-08T07:41:00.000Z",
    location: "Simpang Bedok",
    fuel_amount: "13",
    price: "44.80",
  },
  {
    datetime: "2023-03-06T07:41:00.000Z",
    location: "Simpang Bedok",
    fuel_amount: "13",
    price: "44.80",
  },
  {
    datetime: "2023-03-06T07:41:00.000Z",
    location: "Simpang Bedok",
    fuel_amount: "13",
    price: "44.80",
  },
  {
    datetime: "2023-03-06T07:41:00.000Z",
    location: "Caltex",
    fuel_amount: "12",
    price: "40.80",
  },
  {
    datetime: "2023-02-03T07:41:00.000Z",
    location: "Caltex",
    fuel_amount: "12",
    price: "40.80",
  },
  {
    datetime: "2023-02-03T07:41:00.000Z",
    location: "Caltex",
    fuel_amount: "12",
    price: "40.80",
  },
  {
    datetime: "2023-02-03T07:41:00.000Z",
    location: "Caltex",
    fuel_amount: "12",
    price: "40.80",
  },
];
const result = fuels.reduce((acc, cur) => {
  const { location, fuel_amount, price } = cur;
  if (!acc[location]) {
    acc[location] = { fuel_amount: 0, price: 0 };
  }
  acc[location].fuel_amount += parseInt(fuel_amount);
  acc[location].price += parseFloat(price);
  return acc;
}, []);

// console.log(result);

export const fuelByMonth = [
  { month: "2023-2", fuel_amount: 64, price: 220 },
  { month: "2023-1", fuel_amount: 36, price: 122.39999999999999 },
];
