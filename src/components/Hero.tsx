const Hero = () => {
  return (
    <section className="home select-none shadow-2xl">
      <div className="lg:px-20 px-8 hidden lg:block  ">
        <h1 className=" lg:first-letter:text-9xl first-letter:text-7xl  align-text-top  font-bold first-letter:text-sky-800">
          B
          <span className="text-3xl text-white relative -left-4 -top-4 lg:text-5xl lg:-top-7 lg:-left-7">
            Chief
          </span>
        </h1>
      </div>
      <div className="text-center text-xl lg:text-3xl font-bold text-white lg:bg-transparent bg-black bg-opacity-40 shadow-lg  w-fit mx-auto px-8 flex flex-col gap-5 font-serif   ">
        <h2>Welcome To Our Website</h2>
        <h3 className="xl:text-4xl ">Now you can search for your food</h3>
        <h3>Or check our recipes</h3>
      </div>
    </section>
  );
};

export default Hero;
