import { useOutlet } from "react-router-dom";
import { Navbar } from "../../Navbar/Navbar";
import { Footer } from "../../Footer/Footer";
export function MainLayout() {
    const outlet = useOutlet();

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col">{outlet}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
