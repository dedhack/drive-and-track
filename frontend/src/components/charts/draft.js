export const fuels = [
  { location: "Simpang Bedok", fuel_amount: "13", price: "44.80" },
  { location: "Simpang Bedok", fuel_amount: "13", price: "44.80" },
  { location: "Simpang Bedok", fuel_amount: "13", price: "44.80" },
  { location: "Simpang Bedok", fuel_amount: "13", price: "44.80" },
  { location: "Caltex", fuel_amount: "12", price: "40.80" },
  { location: "Caltex", fuel_amount: "12", price: "40.80" },
  { location: "Caltex", fuel_amount: "12", price: "40.80" },
  { location: "Caltex", fuel_amount: "12", price: "40.80" },
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

console.log(result);
