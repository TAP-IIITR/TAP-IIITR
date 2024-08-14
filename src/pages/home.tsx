import Overview from "@/components/home/overview"
import Banner from "../components/home/banner"
import Footer from "@/components/footer"

const Home = () => {
  return (
    <div className="bg-[#DCE5EE] flex-col space-y-5">
        <Banner/>
        <Overview/>
        <Footer/>
    </div>
  )
}
export default Home