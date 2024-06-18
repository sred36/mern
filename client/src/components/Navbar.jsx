import Wrapper from "../assets/wrappers/Navbar"
import Logo from './Logo';
import {FaAlignLeft } from 'react-icons/fa'
import { useDashboardContext } from "../pages/DashboardLayout";
import LogoutContainer from './LogoutContainer'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const {toggleSideBar} = useDashboardContext()
    return (
        <Wrapper>
          <div className="nav-center">
            <button type="button" className="toggle-btn" onClick={toggleSideBar}>
               <FaAlignLeft/>
            </button>
            <div>
                <Logo />
                <h4 className="logo-text">Dashboard</h4>
            </div>
             <div className='btn-container'>
                <ThemeToggle />
                <LogoutContainer />
             </div>
          </div>
        </Wrapper>
    )
}
export default Navbar;