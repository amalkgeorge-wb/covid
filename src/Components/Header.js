import img from "../images/OBJECTS.png"

function Header() {
    return(
     <div className= "header">
            <h1 className="heading">Welcome to Covid web</h1>
            <p className="sub-heading">We’re all responsible.....Let’s defeat COVID 19</p>
            <img className="vaccine-img" src={img} alt="vaccine_image" />
     </div>   
    )
}

export default Header;