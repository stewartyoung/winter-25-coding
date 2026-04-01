import { Outlet } from "react-router-dom";
import DynamicSidebar from "./addepar/DynamicSidebar";

const Layout = () => (
    <div style={{
        display: 'flex',
        paddingTop: '1rem',
        minHeight: '100vh'
    }}>
        <DynamicSidebar />
        <main style={{ flex: 1, padding: '1rem' }}>
            <Outlet />
        </main>
    </div>
)

export default Layout;