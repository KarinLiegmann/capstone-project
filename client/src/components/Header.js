
import Burger from './Burger'
import Menu from './Menu'



export default function Header({ open, setOpen }) {
    return (

        <div>
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
        </ div>

    )
}






