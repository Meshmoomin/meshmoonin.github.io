import React from "react";

export const useTipRounding = (total: number): number[] => {
  // Ensure the total is valid
  if (total <= 0) {
    return [];
  }
  const suggestions = 10; // Number of suggestions to generate
  const priceCents = Math.round(total * 100); // Convert to cents for precision
  const percentage = 0.05; // 5% increase per tap
  var tipValues: number[] = []; // Store tip progression

  for (let i = 0; i < suggestions; i++) {
    // Apply the tip increase
    var new_price = priceCents * (1 + percentage * (i + 1));
    var roundTo = 50; // Round to the nearest 50 cents
    if (priceCents >= 2000) {
      roundTo = 100; // Round to the nearest euro for totals >= 10 euros
      // For totals less than 10 euros, round to the nearest 50 cents
    }
    if (new_price % roundTo != 0) {
      //new_price = Math.ceil(new_price / roundTo) * roundTo;
      new_price = Math.round(new_price / roundTo) * roundTo;
    }

    // Round up to the next 50 cents

    // Ensure that each step increases by at least 50 cents
    var last_value = tipValues[i - 1] * 100; // Get last value in cents
    if (new_price < last_value + roundTo) {
      new_price = last_value + roundTo; // Enforce a minimum 50-cent jump
    }

    tipValues[i] = new_price / 100; // Convert back to euros
  }
  return tipValues.reverse(); // Return the list of tip values
};
