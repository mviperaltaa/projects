import './App.css';
//import MenuItem from './components/MenuItem';
//import Menu from './components/Menu';
import MenuApp from './components/MenuApp';

let menuData = [
  {
    menuName: "Dinner",
    menuItems: [
      {
        itemId: 1,
        itemPrice: "12",
        itemName: "Lasagne",
        itemDescription:
          "Meat and cheese layered between house-made pasta with bell peppers and onions.",
      },
      {
        itemId: 2,
        itemPrice: "10",
        itemName: "Cheese Ravioli",
        itemDescription: "Cheese-filled ravioli served with house red sauce.",
      },
      {
        itemId: 3,
        itemPrice: "14",
        itemName: "Chicken Parmesan",
        itemDescription:
          "Breaded chicken topped with marinara sauce and lots of cheese served over house made spaghetti.",
      },
    ],
  },
  {
    menuName: "Dessert",
    menuItems: [
      {
        itemId: 45,
        itemPrice: "10",
        itemName: "Chocolate Lava Cake",
        itemDescription: "Dark chocolate molten lava cake. Serves 2-3.",
      },
      {
        itemId: 47,
        itemPrice: "8",
        itemName: "Tiramisu",
        itemDescription:
          "Layers of espresso-soaked ladyfingers and marscarpone cream topped with cocoa and espresso powder.",
      },
      {
        itemId: 49,
        itemPrice: "5",
        itemName: "Cannolis",
        itemDescription:
          "Three flaky pastries enclosing a rich, ricotta filling dotted with decadent chocolate chips.",
      },
      {
        itemId: 50,
        itemPrice: "5",
        itemName: "Cappuccino",
        itemDescription: "Steamed milk with two ristretto shots of espresso.",
      },
    ],
  },
]
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MenuApp data={menuData}></MenuApp>
        {/*<Menu menuName = {menu.menuName} menuItems={menu.menuItems}></Menu>*/}
        {/*<MenuItem {...menuItem}></MenuItem>*/}
      </header>
    </div>
  );
}

export default App;
