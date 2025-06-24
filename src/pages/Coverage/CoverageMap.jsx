import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const districtIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 25],
});

// Bangladesh center position
const centerPosition = [23.685, 90.3563];

// FlyTo helper component
const FlyToDistrict = ({ position }) => {
  const map = useMap();
  if (position) map.flyTo(position, 10);
  return null;
};

const CoverageMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  // Full 64 districts data from your provided list
 const districtData = [
  // Dhaka Division (13 districts)
  { region: "Dhaka", district: "Dhaka", latitude: 23.8103, longitude: 90.4125, covered_area: ["Uttara", "Dhanmondi", "Mirpur", "Mohammadpur"], flowchart: "#" },
  { region: "Dhaka", district: "Faridpur", latitude: 23.6, longitude: 89.8333, covered_area: ["Goalanda", "Boalmari", "Bhanga"], flowchart: "#" },
  { region: "Dhaka", district: "Gazipur", latitude: 23.9999, longitude: 90.4203, covered_area: ["Tongi", "Kaliakair", "Sreepur"], flowchart: "#" },
  { region: "Dhaka", district: "Gopalganj", latitude: 23.0052, longitude: 89.8266, covered_area: ["Tungipara", "Kotalipara", "Kashiani"], flowchart: "#" },
  { region: "Dhaka", district: "Kishoreganj", latitude: 24.426, longitude: 90.7829, covered_area: ["Bajitpur", "Kuliarchar", "Pakundia"], flowchart: "#" },
  { region: "Dhaka", district: "Madaripur", latitude: 23.17, longitude: 90.2, covered_area: ["Rajoir", "Kalkini", "Shibchar"], flowchart: "#" },
  { region: "Dhaka", district: "Manikganj", latitude: 23.8617, longitude: 89.9767, covered_area: ["Saturia", "Shivalaya", "Ghior"], flowchart: "#" },
  { region: "Dhaka", district: "Munshiganj", latitude: 23.55, longitude: 90.5305, covered_area: ["Sreenagar", "Lohajang", "Sirajdikhan"], flowchart: "#" },
  { region: "Dhaka", district: "Narayanganj", latitude: 23.62, longitude: 90.5, covered_area: ["Fatullah", "Siddhirganj", "Rupganj"], flowchart: "#" },
  { region: "Dhaka", district: "Narsingdi", latitude: 23.9226, longitude: 90.7156, covered_area: ["Palash", "Belabo", "Raipura"], flowchart: "#" },
  { region: "Dhaka", district: "Rajbari", latitude: 23.7576, longitude: 89.65, covered_area: ["Pangsha", "Kalukhali", "Baliakandi"], flowchart: "#" },
  { region: "Dhaka", district: "Shariatpur", latitude: 23.22, longitude: 90.4308, covered_area: ["Zajira", "Naria", "Gosairhat"], flowchart: "#" },
  { region: "Dhaka", district: "Tangail", latitude: 24.25, longitude: 89.92, covered_area: ["Delduar", "Ghatail", "Kalihati"], flowchart: "#" },

  // Mymensingh Division (4 districts)
  { region: "Mymensingh", district: "Mymensingh", latitude: 24.7471, longitude: 90.4203, covered_area: ["Trishal", "Muktagachha", "Ishwarganj"], flowchart: "#" },
  { region: "Mymensingh", district: "Jamalpur", latitude: 24.9167, longitude: 89.9372, covered_area: ["Dewanganj", "Sarishabari", "Islampur"], flowchart: "#" },
  { region: "Mymensingh", district: "Netrokona", latitude: 24.8737, longitude: 90.7312, covered_area: ["Khaliajuri", "Durgapur", "Barhatta"], flowchart: "#" },
  { region: "Mymensingh", district: "Sherpur", latitude: 25.0333, longitude: 90.0, covered_area: ["Jhenaigati", "Nalitabari", "Sreebardi"], flowchart: "#" },

  // Chattogram Division (11 districts)
  { region: "Chattogram", district: "Chattogram", latitude: 22.3569, longitude: 91.8123, covered_area: ["Pahartali", "Kotwali", "Halishahar", "Panchlaish", "Agrabad", "Chandgaon"], flowchart: "#" },
  { region: "Chattogram", district: "Cox's Bazar", latitude: 21.4272, longitude: 92.0165, covered_area: ["Teknaf", "Ukhia", "Chakaria", "Ramu"], flowchart: "#" },
  { region: "Chattogram", district: "Cumilla", latitude: 23.4573, longitude: 91.1809, covered_area: ["Laksam", "Debidwar", "Chandina", "Muradnagar"], flowchart: "#" },
  { region: "Chattogram", district: "Brahmanbaria", latitude: 23.9571, longitude: 91.1116, covered_area: ["Nabinagar", "Ashuganj", "Sarail"], flowchart: "#" },
  { region: "Chattogram", district: "Chandpur", latitude: 23.2333, longitude: 90.85, covered_area: ["Haimchar", "Matlab", "Shahrasti"], flowchart: "#" },
  { region: "Chattogram", district: "Feni", latitude: 23.0167, longitude: 91.4, covered_area: ["Parshuram", "Daganbhuiyan", "Chhagalnaiya"], flowchart: "#" },
  { region: "Chattogram", district: "Khagrachari", latitude: 23.1, longitude: 91.9667, covered_area: ["Ramgarh", "Mahalchari", "Dighinala"], flowchart: "#" },
  { region: "Chattogram", district: "Lakshmipur", latitude: 22.9444, longitude: 90.8415, covered_area: ["Raipur", "Ramganj", "Kamalnagar"], flowchart: "#" },
  { region: "Chattogram", district: "Noakhali", latitude: 22.8245, longitude: 91.0995, covered_area: ["Begumganj", "Senbagh", "Chatkhil"], flowchart: "#" },
  { region: "Chattogram", district: "Rangamati", latitude: 22.65, longitude: 92.2, covered_area: ["Baghaichhari", "Kaptai", "Juraichhari"], flowchart: "#" },

  // Sylhet Division (4 districts)
  { region: "Sylhet", district: "Sylhet", latitude: 24.8949, longitude: 91.8662, covered_area: ["Zindabazar", "Ambarkhana", "Dargah Gate", "South Surma", "Subid Bazar", "Tilagor"], flowchart: "#" },
  { region: "Sylhet", district: "Moulvibazar", latitude: 24.4826, longitude: 91.7832, covered_area: ["Sreemangal", "Kamalganj", "Kulaura", "Barlekha"], flowchart: "#" },
  { region: "Sylhet", district: "Habiganj", latitude: 24.3745, longitude: 91.4026, covered_area: ["Shaistaganj", "Madhabpur", "Chunarughat", "Nabiganj"], flowchart: "#" },
  { region: "Sylhet", district: "Sunamganj", latitude: 25.0658, longitude: 91.395, covered_area: ["Jagannathpur", "Chhatak", "Tahirpur", "Dowarabazar"], flowchart: "#" },

  // Rangpur Division (8 districts)
  { region: "Rangpur", district: "Rangpur", latitude: 25.746, longitude: 89.2752, covered_area: ["Jahaj Company", "Pairaband", "Mahiganj", "Satmatha", "Lalbagh"], flowchart: "#" },
  { region: "Rangpur", district: "Dinajpur", latitude: 25.6275, longitude: 88.6414, covered_area: ["Birampur", "Fulbari", "Parbatipur", "Nawabganj"], flowchart: "#" },
  { region: "Rangpur", district: "Thakurgaon", latitude: 26.0333, longitude: 88.466, covered_area: ["Pirganj", "Ranisankail", "Baliadangi"], flowchart: "#" },
  { region: "Rangpur", district: "Panchagarh", latitude: 26.3411, longitude: 88.5658, covered_area: ["Tetulia", "Boda", "Atwari"], flowchart: "#" },
  { region: "Rangpur", district: "Nilphamari", latitude: 25.931, longitude: 88.856, covered_area: ["Saidpur", "Domar", "Jaldhaka"], flowchart: "#" },
  { region: "Rangpur", district: "Lalmonirhat", latitude: 25.9167, longitude: 89.1662, covered_area: ["Hatibandha", "Patgram", "Aditmari"], flowchart: "#" },
  { region: "Rangpur", district: "Kurigram", latitude: 25.8054, longitude: 89.65, covered_area: ["Nageshwari", "Bhurungamari", "Chilmari", "Ulipur"], flowchart: "#" },
  { region: "Rangpur", district: "Gaibandha", latitude: 25.3288, longitude: 89.5418, covered_area: ["Gobindaganj", "Sundarganj", "Palashbari", "Phulchhari"], flowchart: "#" },

  // Khulna Division (10 districts)
  { region: "Khulna", district: "Khulna", latitude: 22.8456, longitude: 89.5672, covered_area: ["Sonadanga", "Khalishpur", "Daulatpur", "Shib Bari", "Boyra"], flowchart: "#" },
  { region: "Khulna", district: "Jessore", latitude: 23.17, longitude: 89.2167, covered_area: ["Chowgachha", "Bagharpara", "Manirampur", "Abhaynagar"], flowchart: "#" },
  { region: "Khulna", district: "Satkhira", latitude: 22.7085, longitude: 89.0809, covered_area: ["Tala", "Assasuni", "Kalaroa", "Debhata"], flowchart: "#" },
  { region: "Khulna", district: "Bagerhat", latitude: 22.6516, longitude: 89.7926, covered_area: ["Mongla", "Rampal", "Fakirhat", "Kachua"], flowchart: "#" },
  { region: "Khulna", district: "Magura", latitude: 23.4853, longitude: 89.4194, covered_area: ["Sreepur", "Mohammadpur", "Shalikha"], flowchart: "#" },
  { region: "Khulna", district: "Narail", latitude: 23.1667, longitude: 89.5, covered_area: ["Lohagara", "Kalia", "Narail Sadar"], flowchart: "#" },
  { region: "Khulna", district: "Jhenaidah", latitude: 23.5333, longitude: 89.1833, covered_area: ["Harinakunda", "Shailkupa", "Kaliganj"], flowchart: "#" },
  { region: "Khulna", district: "Chuadanga", latitude: 23.64, longitude: 88.85, covered_area: ["Alamdanga", "Damurhuda", "Jibannagar"], flowchart: "#" },
  { region: "Khulna", district: "Meherpur", latitude: 23.7623, longitude: 88.6318, covered_area: ["Mujibnagar", "Gangni"], flowchart: "#" },

  // Rajshahi Division (8 districts)
  { region: "Rajshahi", district: "Rajshahi", latitude: 24.3745, longitude: 88.6087, covered_area: ["Boalia", "Rajpara", "Motihar", "Shah Makhdum", "Paba"], flowchart: "#" },
  { region: "Rajshahi", district: "Natore", latitude: 24.4167, longitude: 89, covered_area: ["Baraigram", "Bagatipara", "Lalpur", "Singra"], flowchart: "#" },
  { region: "Rajshahi", district: "Naogaon", latitude: 24.8236, longitude: 88.93, covered_area: ["Manda", "Sapahar", "Porsha", "Patnitala"], flowchart: "#" },
  { region: "Rajshahi", district: "Chapainawabganj", latitude: 24.5962, longitude: 88.27, covered_area: ["Shibganj", "Bholahat", "Gomostapur"], flowchart: "#" },
  { region: "Rajshahi", district: "Pabna", latitude: 24.0037, longitude: 89.2331, covered_area: ["Ishwardi", "Bera", "Chatmohar", "Atgharia"], flowchart: "#" },
  { region: "Rajshahi", district: "Sirajganj", latitude: 24.45, longitude: 89.7167, covered_area: ["Ullapara", "Kazipur", "Shahjadpur", "Belkuchi"], flowchart: "#" },
  { region: "Rajshahi", district: "Joypurhat", latitude: 25.0953, longitude: 89.0412, covered_area: ["Akkelpur", "Kalai", "Panchbibi"], flowchart: "#" },
  { region: "Rajshahi", district: "Bogura", latitude: 24.85, longitude: 89.37, covered_area: ["Sariakandi", "Sonatola", "Gabtali", "Sherpur", "Shajahanpur"], flowchart: "#" },

  // Barisal Division (6 districts)
  { region: "Barisal", district: "Barisal", latitude: 22.7, longitude: 90.3667, covered_area: ["Band Road", "Cox’s Road", "Kawnia", "Rupatali", "Nathullabad"], flowchart: "#" },
  { region: "Barisal", district: "Bhola", latitude: 22.685, longitude: 90.6311, covered_area: ["Borhanuddin", "Tazumuddin", "Daulatkhan", "Char Fasson"], flowchart: "#" },
  { region: "Barisal", district: "Patuakhali", latitude: 22.35, longitude: 90.3333, covered_area: ["Kalapara", "Mirzaganj", "Dashmina", "Galachipa"], flowchart: "#" },
  { region: "Barisal", district: "Pirojpur", latitude: 22.5833, longitude: 89.9667, covered_area: ["Nazirpur", "Kawkhali", "Nesarabad"], flowchart: "#" },
  { region: "Barisal", district: "Jhalokati", latitude: 22.68, longitude: 90.18, covered_area: ["Nalchity", "Kathalia", "Rajapur"], flowchart: "#" },

];



  const handleSearch = () => {
    const found = districtData.find(
      (d) => d.district.toLowerCase() === searchInput.trim().toLowerCase()
    );
    if (found) {
      setSelectedDistrict(found);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="w-full mt-8">
      {/* Search Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search District..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-l-md w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700"
        >
          Go
        </button>
      </div>

      {/* Map */}
      <div className="w-full h-[800px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={centerPosition}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedDistrict && (
            <FlyToDistrict
              position={[selectedDistrict.latitude, selectedDistrict.longitude]}
            />
          )}

          {districtData.map((district, index) => (
            <Marker
              key={index}
              position={[district.latitude, district.longitude]}
              icon={districtIcon}
              eventHandlers={{
                click: () => setSelectedDistrict(district),
              }}
            >
              <Popup>
                <div>
                  <strong>{district.district}</strong>
                  <p className="text-sm mt-1">
                    Areas: {district.covered_area.join(", ")}
                  </p>
                  <a
                    href={district.flowchart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mt-2 block"
                  >
                    View Flowchart
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {selectedDistrict && (
        <div className="text-center mt-4 text-lg font-semibold text-green-600">
          ✅ You selected: {selectedDistrict.district}
        </div>
      )}
    </div>
  );
};

export default CoverageMap;
