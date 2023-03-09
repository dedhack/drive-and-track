// For all the calculations that are used in the charts
import { fuels } from "./draft.js";
// Function to categorize the data by month
export const categorizeByMonth = (data) => {
  // use a reduce function to create an object with the months as keys
  const sumEachMonth = Object.values(
    data.reduce((acc, cur) => {
      // create a date object from the datetime string
      const date = new Date(cur.datetime);
      // get the month from the date object
      const month = date.getMonth() + 1; // hotfix for the month
      // get the year from the date object
      const year = date.getFullYear();
      // create a key for the object
      const key = `${year}-${month}`;
      // if the key does not exist in the object, create it
      if (!acc[key]) {
        acc[key] = { fuel_amount: 0, price: 0, key: key };
      }
      // add the fuel amount and price to the object
      acc[key].fuel_amount += parseInt(cur.fuel_amount);
      acc[key].price += parseFloat(cur.price);
      return acc;
    }, {})
  );
  // return the object
  return sumEachMonth;
};

// const test = categorizeByMonth(fuels);
// console.log(test);

// { datetime: "2023-03-07T15:41:00.000Z", price: "55.50" },
export const maintCategorizeByMonth = (data) => {
  // use a reduce function to create an object with the months as keys
  // object.values to retrieve the values of the objects and return them as an array
  const sumEachMonth = Object.values(
    data.reduce((acc, cur) => {
      // create a date object from the datetime string
      const date = new Date(cur.datetime);
      // get the month from the date object
      const month = date.getMonth() + 1; // hotfix for the month
      // get the year from the date object
      const year = date.getFullYear();
      // create a key for the object
      const key = `${year}-${month}`;
      // if the key does not exist in the object, create it
      if (!acc[key]) {
        acc[key] = { price: 0, key: key };
      }
      // add the fuel amount and price to the object
      // acc[key].fuel_amount += parseInt(cur.fuel_amount);
      acc[key].price += parseFloat(cur.price);
      return acc;
    }, {})
  );
  // return the object
  return sumEachMonth;
};
