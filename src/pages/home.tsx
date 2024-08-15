import Overview from "@/components/home/overview"
import Banner from "../components/home/banner"
import Footer from "@/components/footer"
import WhyRecruit from "@/components/home/why-recruit"
import PlacementStats from "@/components/home/placement-stats"
import Alumni from "@/components/home/alumni"
import PastRecruiters from "@/components/home/past-recruiters"
import PlacementProcedure from "@/components/home/placement-procedure"
import Team from "@/components/home/team"
import Policy from "@/components/home/policy"

const Home = () => {
  return (
    <div className="bg-[#DCE5EE] flex-col space-y-5">
      <Banner />
      <Overview />
      <WhyRecruit />
      <PlacementStats />
      <Alumni />
      <PastRecruiters />
      <Policy />
      <PlacementProcedure />
      <Team />
      <Footer />
    </div>
  )
}
export default Home