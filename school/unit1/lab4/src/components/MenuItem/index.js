export default function MenuItem({itemName, itemPrice, itemDescription, itemId}){
    let menuId = `menu-item-${itemId}`
    return (
        <div className="menu-item" id={menuId}>
        <span>${itemPrice}</span>
        <h2>{itemName}</h2>
        <p>
          {itemDescription}
        </p>
        <button>Add to Cart</button>
      </div>
    );
}