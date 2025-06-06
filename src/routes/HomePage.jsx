import HomeSectionCategories from "../components/HomeSectionCategories";
import HomeSectionCustomers from "../components/HomeSectionCustomers";
import HomeSectionProducts from "../components/HomeSectionProducts";
import Slider from "../components/Slider";
import HomeBanner from "../components/HomeBanner";
import HomeLayout from "../layout/HomeLayout";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="max-w-[1400px] m-auto pt-[7.5rem] md:pt-[5rem]">
        <Slider>
          <HomeBanner />
          <div key="2" className="p-6 bg-green-500 text-white rounded-lg">
            Slide 2: Otro contenido aquí.
          </div>
          <div key="3" className="p-6 bg-red-500 text-white rounded-lg">
            Slide 3: Otro contenido aquí.
          </div>
        </Slider>
      </div>
      <HomeSectionCategories />
      <HomeSectionCustomers />
      <HomeSectionProducts />
    </HomeLayout>
  );
};

export default HomePage;
