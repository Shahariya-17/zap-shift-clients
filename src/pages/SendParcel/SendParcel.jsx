import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const regions = ["Region A", "Region B", "Region C"];
const serviceCenters = {
  "Region A": ["Center A1", "Center A2"],
  "Region B": ["Center B1", "Center B2"],
  "Region C": ["Center C1", "Center C2"],
};

const zilas = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barisal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Chuadanga",
  "Comilla",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokati",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon"
];

// Full 64 zilar upozila data example (shudhu 5 zilar diye example dilam)
const upozilasData = {
  Bagerhat: [
    "Bagerhat Sadar",
    "Kachua",
    "Morrelganj",
    "Rampal",
    "Mollahat",
    "Sarankhola",
  ],
  Bandarban: [
    "Bandarban Sadar",
    "Ruma",
    "Thanchi",
    "Alikadam",
    "Lama",
  ],
  Barguna: [
    "Amtali",
    "Bamna",
    "Barguna Sadar",
    "Betagi",
    "Patharghata",
    "Taltali",
  ],
  Barisal: [
    "Agailjhara",
    "Babuganj",
    "Bakerganj",
    "Banaripara",
    "Gaurnadi",
    "Hizla",
    "Barisal Sadar",
    "Mehendiganj",
    "Muladi",
  ],
  Bhola: [
    "Bhola Sadar",
    "Burhanuddin",
    "Char Fasson",
    "Daulatkhan",
    "Lalmohan",
    "Manpura",
    "Tazumuddin",
  ],
  Bogra: [
    "Adamdighi",
    "Bogra Sadar",
    "Dhunat",
    "Gabtali",
    "Kahaloo",
    "Nandigram",
    "Shajahanpur",
    "Sariakandi",
    "Sherpur",
    "Shibganj",
  ],
  Brahmanbaria: [
    "Ashuganj",
    "Brahmanbaria Sadar",
    "Kasba",
    "Bancharampur",
    "Bijoynagar",
    "Nasirnagar",
    "Akhaura",
    "Nasirnagar",
  ],
  Chandpur: [
    "Chandpur Sadar",
    "Haimchar",
    "Kachua",
    "Haziganj",
    "Shahrasti",
    "Faridgonj",
    "Hajiganj",
  ],
  Chattogram: [
    "Pahartali",
    "Patiya",
    "Fatikchhari",
    "Rangunia",
    "Satkania",
    "Boalkhali",
    "Chandanaish",
    "Lohagara",
    "Mirsharai",
    "Hathazari",
    "Sandwip",
    "Rangamati Sadar",
  ],
  Chuadanga: [
    "Alamdanga",
    "Chuadanga Sadar",
    "Damurhuda",
    "Jibannagar",
  ],
  Comilla: [
    "Barura",
    "Daudkandi",
    "Laksam",
    "Muradnagar",
    "Comilla Sadar Dakshin",
    "Comilla Sadar Uttar",
    "Homna",
    "Meghna",
    "Titas",
    "Debidwar",
    "Manohargonj",
    "Chauddagram",
  ],
  CoxsBazar: [
    "Cox's Bazar Sadar",
    "Kutubdia",
    "Teknaf",
    "Ukhia",
    "Maheshkhali",
  ],
  Dhaka: [
    "Dhamrai",
    "Dohar",
    "Keraniganj",
    "Nawabganj",
    "Savar",
  ],
  Dinajpur: [
    "Birampur",
    "Biral",
    "Boda",
    "Chirirbandar",
    "Dinajpur Sadar",
    "Ghoraghat",
    "Hakimpur",
    "Kaharole",
    "Khansama",
    "Nawabganj",
    "Parbatipur",
  ],
  Faridpur: [
    "Alfadanga",
    "Bhanga",
    "Boalmari",
    "Charbhadrasan",
    "Faridpur Sadar",
    "Madhukhali",
    "Nagarkanda",
    "Sadarpur",
    "Saltha",
  ],
  Feni: [
    "Daganbhuiyan",
    "Fulgazi",
    "Feni Sadar",
    "Parshuram",
  ],
  Gaibandha: [
    "Palashbari",
    "Sadullapur",
    "Saghata",
    "Gaibandha Sadar",
    "Gobindaganj",
    "Phulchhari",
    "Sundarganj",
  ],
  Gazipur: [
    "Gazipur Sadar",
    "Kaliakair",
    "Kapasia",
    "Sreepur",
  ],
  Gopalganj: [
    "Gopalganj Sadar",
    "Kashiani",
    "Muksudpur",
  ],
  Habiganj: [
    "Ajmiriganj",
    "Bahubal",
    "Baniachang",
    "Habiganj Sadar",
    "Lakhai",
    "Madhabpur",
    "Nabiganj",
  ],
  Jamalpur: [
    "Baksiganj",
    "Dewanganj",
    "Islampur",
    "Jamalpur Sadar",
    "Madarganj",
    "Melandaha",
  ],
  Jashore: [
    "Chaugachha",
    "Jhikargachha",
    "Keshabpur",
    "Jessore Sadar",
    "Manirampur",
    "Sharsha",
  ],
  Jhalokati: [
    "Jhalokati Sadar",
    "Kathalia",
    "Nalchity",
  ],
  Jhenaidah: [
    "Harinakunda",
    "Jhenaidah Sadar",
    "Kaliganj",
    "Kotchandpur",
    "Shailkupa",
  ],
  Joypurhat: [
    "Akkelpur",
    "Joypurhat Sadar",
    "Khetlal",
    "Panchbibi",
  ],
  Khagrachari: [
    "Dighinala",
    "Guimara",
    "Khagrachhari Sadar",
    "Lakshmichhari",
    "Manikchhari",
    "Panchhari",
    "Ramgarh",
    "Rangamati",
    "Lakshmichhari",
    "Mahalchhari",
  ],
  Khulna: [
    "Batiaghata",
    "Dumuria",
    "Dighalia",
    "Koyra",
    "Paikgachha",
    "Phultala",
    "Rupsha",
    "Terokhada",
    "Khulna Sadar",
  ],
  Kishoreganj: [
    "Bajitpur",
    "Bhairab",
    "Hossainpur",
    "Itna",
    "Katiadi",
    "Kishoreganj Sadar",
    "Karimganj",
    "Kuliarchar",
    "Mithamain",
    "Nikli",
    "Pakundia",
  ],
  Kurigram: [
    "Chilmari",
    "Phulbari",
    "Rowmari",
    "Ulipur",
    "Kurigram Sadar",
    "Nageshwari",
    "Rajarhat",
    "Bhurungamari",
  ],
  Kushtia: [
    "Bheramara",
    "Daulatpur",
    "Kumarkhali",
    "Kushtia Sadar",
    "Mirpur",
  ],
  Lakshmipur: [
    "Lakshmipur Sadar",
    "Raipur",
    "Ramganj",
  ],
  Lalmonirhat: [
    "Aditmari",
    "Hatibandha",
    "Lalmonirhat Sadar",
    "Patgram",
  ],
  Madaripur: [
    "Kalkini",
    "Madaripur Sadar",
    "Rajoir",
  ],
  Magura: [
    "Magura Sadar",
    "Mohammadpur",
    "Sreepur",
  ],
  Manikganj: [
    "Daulatpur",
    "Ghior",
    "Harirampur",
    "Manikganj Sadar",
    "Shivalaya",
    "Saturia",
  ],
  Meherpur: [
    "Meherpur Sadar",
    "Mujibnagar",
    "Gangni",
  ],
  Munshiganj: [
    "Lohajang",
    "Munshiganj Sadar",
    "Sreenagar",
    "Tongibari",
  ],
  Mymensingh: [
    "Bhaluka",
    "Dhobaura",
    "Fulbaria",
    "Gaffargaon",
    "Haluaghat",
    "Ishwarganj",
    "Mymensingh Sadar",
    "Muktagachha",
    "Trishal",
  ],
  Naogaon: [
    "Atrai",
    "Badalgachhi",
    "Manda",
    "Naogaon Sadar",
    "Niamatpur",
    "Patnitala",
    "Porsha",
    "Raninagar",
    "Sapahar",
    "Mohadevpur",
  ],
  Narail: [
    "Kalia",
    "Lohagara",
    "Narail Sadar",
  ],
  Narayanganj: [
    "Araihazar",
    "Bandar",
    "Narayanganj Sadar",
    "Rupganj",
  ],
  Narsingdi: [
    "Belabo",
    "Monohardi",
    "Narsingdi Sadar",
    "Palash",
    "Shibpur",
  ],
  Natore: [
    "Bagatipara",
    "Baraigram",
    "Natore Sadar",
    "Naldanga",
    "Singra",
  ],
  Netrokona: [
    "Atpara",
    "Barhatta",
    "Durgapur",
    "Khaliajuri",
    "Kalmakanda",
    "Kendua",
    "Netrokona Sadar",
    "Purbadhala",
    "Madan",
  ],
  Nilphamari: [
    "Dimla",
    "Domar",
    "Jaldhaka",
    "Kishoreganj",
    "Nilphamari Sadar",
    "Saidpur",
  ],
  Noakhali: [
    "Begumganj",
    "Chatkhil",
    "Hatiya",
    "Kabirhat",
    "Noakhali Sadar",
    "Companiganj",
    "Sonaimuri",
  ],
  Pabna: [
    "Atgharia",
    "Bera",
    "Bhangura",
    "Chatmohar",
    "Faridpur",
    "Ishwardi",
    "Pabna Sadar",
    "Santhia",
  ],
  Panchagarh: [
    "Atwari",
    "Boda",
    "Debiganj",
    "Panchagarh Sadar",
  ],
  Patuakhali: [
    "Bauphal",
    "Dumki",
    "Galachipa",
    "Kalapara",
    "Mirzaganj",
    "Patuakhali Sadar",
    "Rangabali",
    "Dashmina",
  ],
  Pirojpur: [
    "Bhandaria",
    "Kawkhali",
    "Mathbaria",
    "Nazirpur",
    "Pirojpur Sadar",
    "Nesarabad",
  ],
  Rajbari: [
    "Baliakandi",
    "Kalukhali",
    "Pangsha",
    "Rajbari Sadar",
  ],
  Rajshahi: [
    "Bagha",
    "Bagmara",
    "Charghat",
    "Durgapur",
    "Godagari",
    "Mohanpur",
    "Paba",
    "Puthia",
    "Rajshahi Sadar",
  ],
  Rangamati: [
    "Bagaichhari",
    "Barkal",
    "Juraichhari",
    "Kaptai",
    "Langadu",
    "Naniarchar",
    "Rangamati Sadar",
    "Rajasthali",
    "Kawkhali",
  ],
  Rangpur: [
    "Badarganj",
    "Gangachhara",
    "Kaunia",
    "Mithapukur",
    "Pirgachha",
    "Rangpur Sadar",
    "Taraganj",
    "Pirganj",
    "Gangachhara",
  ],
  Satkhira: [
    "Assasuni",
    "Debhata",
    "Kalaroa",
    "Kaliganj",
    "Satkhira Sadar",
    "Tala",
  ],
  Shariatpur: [
    "Damudya",
    "Naria",
    "Shariatpur Sadar",
    "Bhedarganj",
    "Zajira",
  ],
  Sherpur: [
    "Nalitabari",
    "Sherpur Sadar",
    "Sreebardi",
  ],
  Sirajganj: [
    "Belkuchi",
    "Chauhali",
    "Kamarkhanda",
    "Raiganj",
    "Sirajganj Sadar",
    "Tarash",
    "Ullahpara",
  ],
  Sunamganj: [
    "Bishwamvarpur",
    "Chhatak",
    "Dakshin Sunamganj",
    "Derai",
    "Dharampasha",
    "Jagannathpur",
    "Jamalganj",
    "Shalla",
    "Sunamganj Sadar",
    "Tahirpur",
  ],
  Sylhet: [
    "Beanibazar",
    "Golapganj",
    "Gowainghat",
    "Jaintiapur",
    "Kanaighat",
    "Sylhet Sadar",
    "Balaganj",
    "Zakiganj",
  ],
  Tangail: [
    "Bhuapur",
    "Delduar",
    "Dhanbari",
    "Gopalpur",
    "Kalihati",
    "Madhupur",
    "Mirzapur",
    "Nagarpur",
    "Sakhipur",
    "Tangail Sadar",
  ],
  Thakurgaon: [
    "Baliadangi",
    "Haripur",
    "Ranisankail",
    "Thakurgaon Sadar",
  ],
};


const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SendParcel = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderName: "Prefilled Name",
    },
  });

  const [formData, setFormData] = useState(null);

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const senderZila = watch("senderZila");
  const receiverRegion = watch("receiverRegion");
  const receiverZila = watch("receiverZila");

  const calculateCost = (data) => {
    let cost = data.type === "document" ? 50 : 100;
    if (data.type === "non-document" && data.weight)
      cost += Number(data.weight) * 10;
    if (data.senderServiceCenter) cost += 20;
    if (data.receiverServiceCenter) cost += 20;
    return cost;
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data);
    setFormData(data);
    toast.info(
      <div className="flex items-center space-x-4">
        <span>
          Delivery cost: <b>${cost.toFixed(2)}</b>
        </span>
        <button onClick={handleConfirm} className="btn btn-sm btn-primary">
          Confirm
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleConfirm = () => {
    const parcelWithDate = {
      ...formData,
      creation_date: new Date().toISOString(),
    };
    console.log("Saving to DB:", parcelWithDate);
    toast.dismiss();
    toast.success("Parcel info saved successfully!");
  };

  return (
    <div className="min-h-screen mb-10 mt-10 flex items-center justify-center p-6 bg-gradient-to-br from-lime-100 via-lime-200 to-lime-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl w-full bg-gray-100 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-10 space-y-12"
      >
        <motion.h1
          className="text-5xl font-extrabold text-center text-gradient mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
        >
          Send a Parcel
        </motion.h1>
        <motion.p
          className="text-center text-gray-700 max-w-3xl mx-auto mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
        >
          Fill in the details below to send your parcel quickly and securely.
        </motion.p>

        {/* Parcel Info */}
        <motion.section
          className="bg-violet-50 rounded-xl shadow-md border border-gray-300 p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 15px 30px rgba(102, 126, 234, 0.4)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">
            Parcel Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="type" className="block font-medium mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                {...register("type", { required: "Parcel type is required" })}
                className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              >
                <option value="">Select type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-document</option>
              </select>
              {errors.type && (
                <p className="text-red-500 mt-1">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Parcel Name <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                placeholder="Describe your parcel"
              />
              {errors.title && (
                <p className="text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

            {type === "non-document" && (
              <div>
                <label htmlFor="weight" className="block font-medium mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  step="0.01"
                  {...register("weight", {
                    min: { value: 0, message: "Weight must be positive" },
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Parcel weight"
                />
                {errors.weight && (
                  <p className="text-red-500 mt-1">{errors.weight.message}</p>
                )}
              </div>
            )}
          </div>
        </motion.section>

        {/* Sender & Receiver Info */}
        <div className="flex flex-col lg:flex-row lg:space-x-10 gap-10">
          {/* Sender Info */}
          <motion.section
            className="bg-violet-50 rounded-xl shadow-md border border-gray-300 p-8 flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 15px 30px rgba(118, 75, 162, 0.4)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">
              Sender Info
            </h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="senderName" className="block font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="senderName"
                  type="text"
                  {...register("senderName", { required: "Name is required" })}
                  className="w-full input input-bordered bg-gray-100 cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  readOnly
                />
              </div>

              <div>
                <label
                  htmlFor="senderContact"
                  className="block font-medium mb-1"
                >
                  Contact <span className="text-red-500">*</span>
                </label>
                <input
                  id="senderContact"
                  type="tel"
                  {...register("senderContact", {
                    required: "Contact is required",
                    pattern: {
                      value: /^[0-9\-+() ]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Phone number"
                />
                {errors.senderContact && (
                  <p className="text-red-500 mt-1">
                    {errors.senderContact.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="senderRegion"
                  className="block font-medium mb-1"
                >
                  Select Region <span className="text-red-500">*</span>
                </label>
                <select
                  id="senderRegion"
                  {...register("senderRegion", { required: "Region is required" })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                >
                  <option value="">Select region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <p className="text-red-500 mt-1">{errors.senderRegion.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="senderZila" className="block font-medium mb-1">
                  Select Zila <span className="text-red-500">*</span>
                </label>
                <select
                  id="senderZila"
                  {...register("senderZila", { required: "Zila is required" })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                >
                  <option value="">Select Zila</option>
                  {zilas.map((zila) => (
                    <option key={zila} value={zila}>
                      {zila}
                    </option>
                  ))}
                </select>
                {errors.senderZila && (
                  <p className="text-red-500 mt-1">{errors.senderZila.message}</p>
                )}
              </div>

              {/* Sender Upozila Dropdown */}
              <div>
                <label
                  htmlFor="senderUpozila"
                  className="block font-medium mb-1"
                >
                  Select Upozila <span className="text-red-500">*</span>
                </label>
                <select
                  id="senderUpozila"
                  {...register("senderUpozila", {
                    required: "Upozila is required",
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  disabled={!senderZila || !(upozilasData[senderZila]?.length > 0)}
                >
                  <option value="">
                    {senderZila
                      ? "Select upozila"
                      : "Select zila first"}
                  </option>
                  {senderZila &&
                    upozilasData[senderZila]?.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                </select>
                {errors.senderUpozila && (
                  <p className="text-red-500 mt-1">{errors.senderUpozila.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="senderServiceCenter"
                  className="block font-medium mb-1"
                >
                  Select Service Center <span className="text-red-500">*</span>
                </label>
                <select
                  id="senderServiceCenter"
                  {...register("senderServiceCenter", {
                    required: "Service Center is required",
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  disabled={!senderRegion}
                >
                  <option value="">
                    {senderRegion
                      ? "Select service center"
                      : "Select region first"}
                  </option>
                  {senderRegion &&
                    serviceCenters[senderRegion].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
                {errors.senderServiceCenter && (
                  <p className="text-red-500 mt-1">
                    {errors.senderServiceCenter.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="senderAddress"
                  className="block font-medium mb-1"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="senderAddress"
                  {...register("senderAddress", { required: "Address is required" })}
                  className="w-full textarea textarea-bordered resize-none focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  rows={3}
                  placeholder="Pickup address"
                />
                {errors.senderAddress && (
                  <p className="text-red-500 mt-1">{errors.senderAddress.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pickupInstruction"
                  className="block font-medium mb-1"
                >
                  Pickup Instruction <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="pickupInstruction"
                  {...register("pickupInstruction", {
                    required: "Pickup instruction is required",
                  })}
                  className="w-full textarea textarea-bordered resize-none focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  rows={3}
                  placeholder="Pickup instructions"
                />
                {errors.pickupInstruction && (
                  <p className="text-red-500 mt-1">{errors.pickupInstruction.message}</p>
                )}
              </div>
            </div>
          </motion.section>

          {/* Receiver Info */}
          <motion.section
            className="bg-violet-50 rounded-xl shadow-md border border-gray-300 p-8 flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 15px 30px rgba(107, 141, 214, 0.4)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">
              Receiver Info
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="receiverName"
                  className="block font-medium mb-1"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="receiverName"
                  type="text"
                  {...register("receiverName", { required: "Name is required" })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Receiver full name"
                />
                {errors.receiverName && (
                  <p className="text-red-500 mt-1">{errors.receiverName.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="receiverContact"
                  className="block font-medium mb-1"
                >
                  Contact <span className="text-red-500">*</span>
                </label>
                <input
                  id="receiverContact"
                  type="tel"
                  {...register("receiverContact", {
                    required: "Contact is required",
                    pattern: {
                      value: /^[0-9\-+() ]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  placeholder="Phone number"
                />
                {errors.receiverContact && (
                  <p className="text-red-500 mt-1">{errors.receiverContact.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="receiverRegion"
                  className="block font-medium mb-1"
                >
                  Select Region <span className="text-red-500">*</span>
                </label>
                <select
                  id="receiverRegion"
                  {...register("receiverRegion", { required: "Region is required" })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                >
                  <option value="">Select region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.receiverRegion && (
                  <p className="text-red-500 mt-1">{errors.receiverRegion.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="receiverZila" className="block font-medium mb-1">
                  Select Zila <span className="text-red-500">*</span>
                </label>
                <select
                  id="receiverZila"
                  {...register("receiverZila", { required: "Zila is required" })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                >
                  <option value="">Select Zila</option>
                  {zilas.map((zila) => (
                    <option key={zila} value={zila}>
                      {zila}
                    </option>
                  ))}
                </select>
                {errors.receiverZila && (
                  <p className="text-red-500 mt-1">{errors.receiverZila.message}</p>
                )}
              </div>

              {/* Receiver Upozila Dropdown */}
              <div>
                <label
                  htmlFor="receiverUpozila"
                  className="block font-medium mb-1"
                >
                  Select Upozila <span className="text-red-500">*</span>
                </label>
                <select
                  id="receiverUpozila"
                  {...register("receiverUpozila", {
                    required: "Upozila is required",
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  disabled={!receiverZila || !(upozilasData[receiverZila]?.length > 0)}
                >
                  <option value="">
                    {receiverZila
                      ? "Select upozila"
                      : "Select zila first"}
                  </option>
                  {receiverZila &&
                    upozilasData[receiverZila]?.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                </select>
                {errors.receiverUpozila && (
                  <p className="text-red-500 mt-1">{errors.receiverUpozila.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="receiverServiceCenter"
                  className="block font-medium mb-1"
                >
                  Select Service Center <span className="text-red-500">*</span>
                </label>
                <select
                  id="receiverServiceCenter"
                  {...register("receiverServiceCenter", {
                    required: "Service Center is required",
                  })}
                  className="w-full input input-bordered focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  disabled={!receiverRegion}
                >
                  <option value="">
                    {receiverRegion
                      ? "Select service center"
                      : "Select region first"}
                  </option>
                  {receiverRegion &&
                    serviceCenters[receiverRegion].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
                {errors.receiverServiceCenter && (
                  <p className="text-red-500 mt-1">
                    {errors.receiverServiceCenter.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="receiverAddress"
                  className="block font-medium mb-1"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="receiverAddress"
                  {...register("receiverAddress", { required: "Address is required" })}
                  className="w-full textarea textarea-bordered resize-none focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  rows={3}
                  placeholder="Delivery address"
                />
                {errors.receiverAddress && (
                  <p className="text-red-500 mt-1">{errors.receiverAddress.message}</p>
                )}
              </div>
            </div>
          </motion.section>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-lime-400 text-black font-bold rounded-2xl p-2 btn-lg mt-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>

        <ToastContainer />
      </form>
    </div>
  );
};

export default SendParcel;
