export const DEFAULT_MENU = {
  pizzas: {
    title: "14 IN PIZZA (8 SLICES)",
    items: [
      { id: "p1", name: "Cheese Pizza", description: "", price: 9.99 },
      { id: "p2", name: "Pepperoni Pizza", description: "", price: 10.99 },
      { id: "p3", name: "Meat Lovers", description: "Pepperoni, Bacon, Ham, Sausage", price: 14.99 },
      { id: "p4", name: "Veggie Pizza", description: "Green Pepper, Banana Pepper, Mushroom, Black Olive", price: 14.99 },
      { id: "p5", name: "Deluxe Pizza", description: "Pepperoni, Ham, Bacon, Sausage, Onion, Banana Pepper, Green Pepper, Mushroom, Black Olive", price: 23.99 },
      { id: "p6", name: "Cheesy Bread", description: "", price: 10.99 },
      { id: "p7", name: "Ground Beef Pizza", description: "Ground Beef, Green Pepper, Onion, Yellow Pepper, Black Olives", price: 17.99 },
      { id: "p8", name: "Double Down Pizza", description: "Pepperoni, Bacon, Ham, Sausage, Green Pepper, Onion, Another Dough, Extra Cheese", price: 27.99 },
    ],
  },
  alaCartePizzas: {
    title: "A LA CARTE",
    subtitle: "Available in Warmers",
    hours: "M-F from 10:30AM–7:30PM or sellout | Sat and Sun 11:30AM–5PM or sellout",
    items: [
      { id: "a1", name: "Pizza Slice (Reg)", description: "", price: 2.29 },
      { id: "a2", name: "Pizza Slice (Meat Lover)", description: "", price: 2.79 },
      { id: "a3", name: "Pizza Slice (Deluxe)", description: "", price: 2.99 },
      { id: "a4", name: "Meat Pie", description: "Seasoned Ground Beef, Onion, Pepper Jack Cheese, Green Pepper — Must be ordered in 2", price: 4.99 },
      { id: "a5", name: "EZ Stick", description: "Cheese and Pepperoni (can customize)", price: 3.99 },
      { id: "a6", name: "Pizza Calzone", description: "Sauce, Pepperoni, Cheese (can customize)", price: 5.99 },
      { id: "a7", name: "Kielbasa Roll", description: "Jalapeño Kielbasa & Mozzarella — Must be Ordered in 2", price: 2.99 },
      { id: "a8", name: "EZ Fold", description: "Pepperoni, Ham, Bacon, Parmesan Cheese, Sauce, Hot Pepper Cheese, Mozzarella", price: 7.99 },
    ],
  },
  specialty: {
    title: "SPECIALTY ITEMS",
    items: [
      { id: "s1", name: "Kielbasa Tray", description: "12 Jalapeño Cheddar Kielbasas wrapped in Mozzarella and Fresh Dough", price: 30.00 },
      { id: "s2", name: "Unbaked Pizzas", description: "", price: 12.99, priceNote: "+" },
      { id: "s3", name: "Party Pizzas", description: "", price: null, priceNote: "Coming Soon!" },
    ],
  },
  combos: {
    title: "COMBOS",
    items: [
      { id: "c1", name: "Tony's Special", description: "1 Large One Topping Pizza, One Cheesy Bread, 1 2L Pop", price: 23.99 },
      { id: "c2", name: "Easy Pick Special", description: "1 Large One Topping Pizza, 2 Calzones, 1 2L Pop", price: 24.99 },
    ],
  },
  toppings: {
    title: "ALL TOPPINGS",
    items: ["Pepperoni", "Sausage", "Bacon", "Ham", "Green Pepper", "Banana Pepper", "Olive", "Mushroom", "Pineapple", "Onion"],
    additionalCost: 2.50,
    extraCheese: 3.00,
    sideOfMarinara: 1.00,
  },
  crusts: {
    title: "CRUST OPTIONS",
    items: ["Regular Butter", "Garlic Butter", "Cajun Crust", "Parmesan Crust"],
  },
  menuNote: "All Prices Are Before Tax and Subject to Change",
  orderCutoff: "No Orders Will Be Taken After 7:30pm Mon-Sat | 5:30pm on Sun",
  gallery: [],
};

export function getMenu() {
  const stored = localStorage.getItem("easypick_menu");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_MENU;
    }
  }
  return DEFAULT_MENU;
}

export function saveMenu(menu) {
  localStorage.setItem("easypick_menu", JSON.stringify(menu));
}

export function resetMenu() {
  localStorage.removeItem("easypick_menu");
  return DEFAULT_MENU;
}
