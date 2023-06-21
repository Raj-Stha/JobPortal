import { useNavigate } from "react-router";
import { jobCategories } from "../../constant/JobCategories";
const AllCategories = () => {
  const nav = useNavigate();
  const singleCat = (catName) => {
    let url;
    const sp = catName.split(" ");
    if (sp.length > 1) {
      const res = sp.map((d) => d.toLowerCase());
      url = res.toString().replace(",", "-");
    } else {
      url = sp[0].toLowerCase();
    }
    return nav(`/category/${url}`);
  };
  return (
    <div className="py-8 w-[90%] mx-auto mlg:w-[92%]  msm:py-4 h-[84vh] mb-[2px] msm:mt-[12%] msm:h-auto">
      <h2 className="font-semibold text-2xl text-center pb-8 msm:text-xl msm:pb-4">
        Categories{" "}
      </h2>
      <div className="grid grid-cols-5 gap-5  mmd:grid-cols-3 msm:grid-cols-2 msm:gap-3">
        {jobCategories.map((cat, index) => {
          return (
            <div
              className="text-center space-y-5 bg-gray-50 py-5 rounded-md category-container cursor-pointer   text-color hover:text-black hover:scale-110 hover:ease-in-out duration-200"
              key={index}
              onClick={() => singleCat(cat.CategoryName)}
            >
              <div className="text-[50px] icons-wrapper">{cat?.icon}</div>

              <h2 className="catdescription">{cat.CategoryName}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AllCategories;
