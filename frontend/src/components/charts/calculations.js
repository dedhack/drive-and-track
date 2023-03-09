// For all the calculations that are used in the charts
import { fuels } from "./draft.js";
import { differenceInCalendarDays } from "date-fns";

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

// can use for both maintenance and fuel
export const averageCost = (data) => {
  // get the range of days from the first and last entry in the array
  const firstDate = new Date(data[0].datetime);
  const lastDate = new Date(data[data.length - 1].datetime);

  const noOfDays = differenceInCalendarDays(firstDate, lastDate);

  // get total amount of spending
  const totalSpending = data.reduce((acc, cur) => {
    return acc + parseFloat(cur.price);
  }, 0);

  // calculate the average cost per day
  const averageCost = totalSpending / noOfDays;

  return averageCost;
};

// console.log(averageCost(fuels));

// To calculate total cost of fuel/ maintenance
export const totalCost = (data) => {
  const totalSpending = data.reduce((acc, cur) => {
    return acc + parseFloat(cur.price);
  }, 0);

  return totalSpending;
};

// To calculate total fuel used
export const totalFuelUsed = (data) => {
  const totalFuel = data.reduce((acc, cur) => {
    return acc + parseFloat(cur.fuel_amount);
  }, 0);

  return totalFuel;
};

// To calculate average distance traveled per day
export const averageDistance = (data) => {
  // get the range of days from the first and last entry in the array
  const firstDate = new Date(data[0].datetime);
  const lastDate = new Date(data[data.length - 1].datetime);

  const noOfDays = differenceInCalendarDays(firstDate, lastDate);

  // get difference in odometer reading
  const totalDistance =
    parseInt(data[0].odometer) - parseInt(data[data.length - 1].odometer);

  // calculate the average distance traveled per day
  const averageDistance = totalDistance / noOfDays;

  return averageDistance;
};

// To calculate average fuel efficiency
export const averageFuelEfficiency = (data) => {
  // get total fuel used
  const totalFuel = totalFuelUsed(data);

  // get difference in odometer reading
  const totalDistance =
    parseInt(data[0].odometer) - parseInt(data[data.length - 1].odometer);

  // calculate the average fuel efficiency in km/L
  const averageFuelEfficiency = totalDistance / totalFuel;

  return averageFuelEfficiency;
};
