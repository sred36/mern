
import Wrapper from '../assets/wrappers/SmallSidebar'

import { useDashboardContext } from '../pages/DashboardLayout';
import {FaTimes} from 'react-icons/fa'
import {Logo} from '../components';

import NavLinks from './NavLinks'

const SmallSidebar = () => {
    const {showSidebar, toggleSideBar} = useDashboardContext();
    return (
        <Wrapper>
            <div  className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container' }>
                <div className="content">
                    <button type="button" className='close-btn' onClick={toggleSideBar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo/>
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}
export default SmallSidebar;