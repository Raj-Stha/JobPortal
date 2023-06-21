import { useFormik } from "formik";
import { useNavigate } from "react-router";

const Banner = () => {
  const nav = useNavigate();
  const fromik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (value) => {
      if (value.search) {
        nav(`search/${value.search}`);
      }
    },
  });
  return (
    <div className="banner-wrapper px-[4%] pt-[6%] pb-[9%] mmd:pt-[8%]  msm:pt-[16%] msm:px-[5%]">
      <div className="w-[41%]  space-y-6 mlg:w-[54%] mmd:w-[70%] mmd:space-y-4  msm:w-[100%]">
        <h2 className="text-4xl font-bold  leading-[45px] break-words w-[90%] mmd:text-2xl msm:w-[100%] msm:text-2xl">
          Find A<span className="text-color">&nbsp;Job</span>
          &nbsp;That
          <span className="text-color">&nbsp; Matches</span>&nbsp; Your Passion
        </h2>

        <div className="text-sm">
          <p>
            Hand-picked opportunities to work from home, remotely, freelance,
            full-time, part-time, contract and internships.
          </p>
        </div>

        <div className="pt-8 mmd:pt-4">
          <form className="space-x-2" onSubmit={fromik.handleSubmit}>
            <input
              className="px-4 py-3 w-[80%] m2xl:w-[70%] msm:w-[70%] msm:px-3 msm:py-2 rounded-md  outline-none focus:outline-green-600 msm:text-sm msm:focus:outline-none"
              type="text"
              name="search"
              placeholder="Search by job title...................... "
              onChange={fromik.handleChange}
              value={fromik.values.search}
            />
            <button
              type="submit"
              className="px-6 bg-color py-3 msm:py-2 msm:px-3 rounded-md msm:text-sm text-white hover:bg-green-800 hover:text-gray-100 "
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Banner;
