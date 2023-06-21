import { useGetHomepageQuery } from "../../features/jobApi";
import Banner from "./Homepage/Banner";
import Categories from "./Homepage/Categories";
import Company from "./Homepage/Company";

const ClientHomepage = () => {
  const { data, isLoading } = useGetHomepageQuery();
  return (
    <div>
      <Banner />
      <Categories />
      <Company />
    </div>
  );
};
export default ClientHomepage;
