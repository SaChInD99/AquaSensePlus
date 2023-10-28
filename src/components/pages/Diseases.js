import React from "react";
import Header2 from "./Header2";
import SideNav from "./SideNav";
import logo from "../images/logo.png";
import farm from "../images/farm2.avif";
import white from "../images/white.jpeg"
import spot from "../images/whitespot.jpg"
import svc from "../images/SVC.jpg"
import svvirus from "../images/svcvirus.jpg"
import column from "../images/column.jpg"
import columnaris from "../images/columnaris.jpg"
import aero from "../images/aero.png"
import Aeromonas from "../images/Aeromonasbacteria.jpg"
import './Diseases.css'

function Diseases() {
  return (
    <div>
      <Header2 />
      <SideNav />
      <div className="content-wrapper">
        <div className="dashboard-heading">
          <h3 className="chart-title2">Diseases</h3>
          <div className="container-fluid">
            <div className="row justify-content-center">
              {/* First Card */}
              <div className="col-lg-3 col-md-6">
                <div className="card">
                  <img
                    src={Aeromonas}
                    alt="Disease 1"
                    className="card-img-top rounded-circle"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Aeromonas</h5>
                    <p className="card-text"></p>
                    <div className="subtopics">
                      <div className="subtopic">
                        <h6>Etiological agent:</h6>
                        <p>Aeromonas hydrophila</p>
                      </div>
                      <div className="subtopic">
                        <h6>Clinical presentation:</h6>
                        <ul>
                          <li>Haemorrhagic and ulcerative lesions on skin fins, head, exopthalmia</li>
                          <li>Fin rot (eroding fins)</li>
                          <li>Belly distended containing fluid, liver and kidney enlarged</li>
                          <li>Sloughing scale</li>
                        </ul>
                      </div>
                      <div className="subtopic">
                        <h6>Management/control:</h6>
                        <p>As A. hydrophila is a ubiquitous organism in both the fish and environment, control is primarily focused on good management practices of reducing stress in the fish by supplying optimal water quality, avoiding overcrowding, proper handling, providing good nutrition, and preventing parasitic or fungal infections. The use of antibiotics, various chemicals and vaccinations have been used with limited success.
                          • Oxytetracycline ( 3-4 gm/100L for 2-3 days)
                          • Oxolinic acid: 10 mg/kg of fish/day for 10 days.
                          • Furazolidone (long bath, 0.5-1g/100L for 2 days)</p>
                      </div>
                    </div>
                    <img
                      src={aero}
                      alt="Image"
                      className="card-bottom-img"
                    />
                  </div>
                </div>
              </div>

              {/* Second Card */}
              <div className="col-lg-3 col-md-6">
                <div className="card">
                  <img
                    src={columnaris}
                    alt="Disease 2"
                    className="card-img-top rounded-circle"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Columnaris (cottonmouth)</h5>
                    <p className="card-text"></p>
                    <div className="subtopics">
                      <div className="subtopic">
                        <h6>Etiology:</h6>
                        <p>Flavobacterium columnare</p>
                      </div>
                      <div className="subtopic">
                        <h6>Clinical presentation:</h6>
                        <ul>
                          <li>White or cloudy fungus-like patches</li>
                          <li>Haemorrhagic, ulcerative lesions on fins, head</li>
                          <li>Frayed and ragged fins</li>
                          <li>Cottony proliferative lesions on the skin and fins</li>
                          <li>Anorexia</li>
                          <li>Rapid breathing</li>
                          <li>Loss of appetite</li>
                          <li>Rest on the bottom or hang at the surface</li>
                          <li>Mucus on gills, head and dorsal fins</li>
                        </ul>
                      </div>
                      <div className="subtopic">
                        <h6>Management/control:</h6>
                        <p>Whenever possible prevention is the best approach to control this disease. Decreasing fish biomass density, organic load, and ammonia and nitrite levels are important to diminish the risk of developing columnaris disease. Although not widely available, the use of fish genetically selected for higher resistance to this infection will probably be an important measure to control this disease.
                          • Antibiotic bath treatment with Tetracyclines, Oxytetracycline
                          • Potassium permanganate 500mg/100l for 1 hour by bath method
                          • KMnO4 treatment with a low concentration (2-10 ppt) of salt (sodium chloride) as a semi-permanent treatment for several days or weeks
                          • Oxytetracycline: 50-100mg/kg body weight of fish/day for 10 days.</p>
                      </div>
                    </div>
                    <img
                      src={column}
                      alt="Image"
                      className="card-bottom-img"
                    />
                  </div>
                </div>
              </div>

              {/* Third Card */}
              <div className="col-lg-3 col-md-6">
                <div className="card">
                  <img
                    src={spot}
                    alt="Disease 3"
                    className="card-img-top rounded-circle"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Whitespots</h5>
                    <p className="card-text"></p>
                    <div className="subtopics">
                      <div className="subtopic">
                        <h6>Etiology:</h6>
                        <p>Ichthyophthirius multifiliis</p>
                      </div>
                      <div className="subtopic">
                        <h6>Clinical presentation:</h6>
                        <ul>
                          <li>White spots on the body and fins</li>
                          <li>Hemorrhagic patches appeared on the bases of the fins, fish sides and mouth</li>
                          <li>Detachment of epidermis and fin rot</li>
                          <li>Loss of appetite</li>
                          <li>Gill damage and gill surface become thick</li>
                          <li>Lethargic</li>
                          <li>Rubbing against the decorations or gravel</li>
                          <li>Respiratory stress, rapid breathing</li>
                          <li>Swim near to the water</li>
                        </ul>
                      </div>
                      <div className="subtopic">
                        <h6>Management/control:</h6>
                        <p>Control of these parasites is based on isolation of fish upon arrival and periodic monitoring for infection during the quarantine period. Environmental management of the water with UV treatment or raising the temperature above 30°C for tolerant fish species has been shown to reduce the number of infectious theronts in the water.
                          • Raising the tank temperature to between 21 - 26 Celsius for at least 48 hours
                          • Treated with aquarium salt or unionized salt - short baths at a level of 1.5 to 2.5% for 10 to 30 minutes/ 7 days
                          • Acriflavine hydrochloride - long bath at 10 ppm for 3 to 20 days
                          • Methylene blue at 2-3 ppm
                          • Formaldehyde
                          • Performed water exchange between treatments</p>
                      </div>
                    </div>
                    <img
                      src={white}
                      alt="Image"
                      className="card-bottom-img"
                    />
                  </div>
                </div>
              </div>

              {/* Fourth Card */}
              <div className="col-lg-3 col-md-6">
                <div className="card">
                  <img
                    src={svvirus}
                    alt="Disease 4"
                    className="card-img-top rounded-circle"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Spring viraemia of carp</h5>
                    <p className="card-text"></p>
                    <div className="subtopics">
                      <div className="subtopic">
                        <h6>Etiology:</h6>
                        <p>Rhabdovirus carpio</p>
                      </div>
                      <div className="subtopic">
                        <h6>Clinical presentation:</h6>
                        <ul>
                          <li>Lethargy, enteritis, peritonitis, oedema, exophthalmia, thickening of the swim bladder and petechial haemorrhages in the internal organs, skin and muscle</li>
                          <li>Many scientists regard distension of the abdomen as the main feature of the disease.</li>
                          <li>Other clinical signs can include emaciation and erratic swimming movements, the latter denoting ataxia.</li>
                          <li>Mortalities are usually fairly low at first, but level out to steady daily losses, depending on the environmental conditions, e.g. low water temperature and level of secondary infections.</li>
                        </ul>
                      </div>
                      <div className="subtopic">
                        <h6>Management/control:</h6>
                        <p>Prevention is only effective where there are no introductions of infected fish into new areas. The mode of transmission of the disease appears to be horizontal, with the possibility of transmission by leeches and other ectoparasites as well as piscivorous birds. Obviously, the spread of this disease has been greatly increased by the movements of fish as part of the worldwide trade in carp.</p>
                      </div>
                    </div>
                    <img
                      src={svc}
                      alt="Image"
                      className="card-bottom-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diseases;
