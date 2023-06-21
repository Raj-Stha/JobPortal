const Loading = () => {
  return (
    <div className="w-[50%] h-[100px] mx-auto">
      {/* https://assets5.lottiefiles.com/packages/lf20_p8bfn5to.json */}
      <lottie-player
        src="https://assets5.lottiefiles.com/packages/lf20_dkz94xcg.json"
        background="transparent"
        speed="1"
        loop
        autoplay
      ></lottie-player>
    </div>
  );
};
export default Loading;
