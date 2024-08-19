import MenuItem from "../MenuItem"
export default function Menu({menuName, menuItems}){

    let elements = menuItems.map(
      (element,index) => <MenuItem key={index}{...element}/>
    )
    return <div>
      <h1>{menuName}</h1>
      {elements}
      </div>
}