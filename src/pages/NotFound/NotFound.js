import Navbar from "../../components/navbar/Navbar";
import Logo from "../../img/logo.png"
export default function NotFound(){
    return(
        <div className="home-background text-light main-div min-vh-100">
            <Navbar />
            <div className="container text-center mt-5">
                <div className="row justify-content-center">
                    <img src={Logo} alt="Logo" className="logo col-3" width="50" height="400" />
                    <span className="mt-5 display-4">Desculpe!! Mas não conseguimos encontrar essa página</span>
                </div>
                
            </div>
        </div>
        
    );


}