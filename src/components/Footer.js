const Footer = () => {
  const date = new Date();
  return (
    <div className="bg-color text-white py-2 text-center font-light msm:text-sm msm:px-1">
      <h2>
        &copy; {date.getFullYear()}
        &nbsp; Jobs Portal. Designed By Raj Shrestha
      </h2>
    </div>
  );
};
export default Footer;
