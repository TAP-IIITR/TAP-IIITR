import ApplicationCompanyCard from "../application-company-card";

const MyApplication = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col md:flex-row gap-[16px] md:gap-[28px]">
        <input
          className="w-full md:w-2/3 rounded-[16px] border border-[#9E9E9E] h-[52px] px-[20px] py-[16px] text-[16px] text-[#9E9E9E] font-[500]"
          placeholder="Search Jobs..."
        />
        <input className="w-full md:w-1/3 rounded-[16px] border border-[#9E9E9E] h-[52px]" />
      </div>
      <div
        className="flex flex-col bg-[#FFFFFF] rounded-[16px] w-full h-fit p-[24px] gap-[10px]"
        style={{ boxShadow: "1px 1px 6px 0px #00000040" }}
      >
        <ApplicationCompanyCard applicationStatus={"Selected"} />
        <ApplicationCompanyCard applicationStatus={"Rejected"} />
        <ApplicationCompanyCard applicationStatus={"Pending"} />
      </div>
    </div>
  );
};

export default MyApplication;
