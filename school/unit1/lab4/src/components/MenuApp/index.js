import Menu from "../Menu";
export default function MenuApp({data}) {
let menus = data.map((menuData, index) => <Menu key={index} {...menuData}/>)
return <>
    {menus}
</>
}