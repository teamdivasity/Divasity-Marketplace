import { CircleArrowLeft } from "lucide-react";
import { images } from "../../constants";
import { useNavigate } from "react-router-dom";


export default function NewsDetails() {
    const navigate = useNavigate()
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-5 w-full fixed bg-white" onClick={() => navigate(-1)}>
        <CircleArrowLeft size={30} />
        <h3 className="font-poppins text-[18px] font-[500]">
          More on Education
        </h3>
      </div>

      <div className="pt-14 px-5">
        <img src={images.Logo} alt="News Image" className="sm:h-[50vh] h-[40vh]" />
        <div className="">
          <h3 className="font-poppins sm:text-[25px] text-[20px] font-[500] pb-1">
            More on Education
          </h3>
          <p className="font-poppins font-[400] text-gray-700 sm:text-[16px] text-[14px]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium commodi perspiciatis nam ullam voluptates suscipit
            laudantium quas ex assumenda, dolore distinctio, veniam dolores quae
            porro sed nulla. Porro a consequatur nam non unde sunt
            necessitatibus nisi, distinctio dolores recusandae voluptate
            inventore tempora illum, exercitationem cum omnis cupiditate libero?
            Labore repellendus amet quasi eius facilis unde ipsa quo nostrum, ut
            in?
          </p>
        </div>
      </div>
    </div>
  );
}
