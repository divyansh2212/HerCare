import Hospitals from "../../components/hospitals/HospitalsForm";
import Navbar from "../../components/navbar/Navbar";
import Slider from "../../components/slider/Slider.js";
import "./home.css"
// import Form from '../../components/incidentForm/Form.js'
import { useNavigate } from "react-router-dom";
// import MapHome from "../../components/MapHome/MapHome";
import MapArea from "../../components/mapArea/MapArea.js";
import Footer from "../../components/Footer/Footer.jsx"
import CommunityIncidents from "../../components/CommunityIncidents/CommunityIncidents";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="homebody">
        <Slider />
        <MapArea />
        {/* <CommunityIncidents/> */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
