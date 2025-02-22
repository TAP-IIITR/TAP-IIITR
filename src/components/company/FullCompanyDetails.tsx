import { useParams } from "react-router-dom";

const FullCompanyDetails = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="flex flex-col gap-[22px]">
      <div className="flex gap-[28px]">
        <div
          className="w-[68%] bg-[#FFF] rounded-[12px]"
          style={{ boxShadow: "1px 1px 4px 0px #00000040" }}
        ></div>
      </div>
    </div>
  );
};

export default FullCompanyDetails;
