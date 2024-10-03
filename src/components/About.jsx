import { Fade } from "react-awesome-reveal";
import Eco from "../assets/eco.png";

const AboutPage = () => {
  return (
    <Fade duration={800} direction="up" triggerOnce>
      {/* Outer Container with Background Image */}
      <div className="relative min-h-screen">
        <figure className="w-full h-full absolute inset-0">
          <img
            src={Eco}
            alt="Technika Background"
            className="object-cover w-full h-full opacity-80 brightness-40"
          />
        </figure>

        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className="relative z-10 pb-16">
          {/* Hero Section */}
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold text-white mb-6">About Technika</h1>
            <p className="text-2xl text-gray-200 max-w-3xl mx-auto">
              The ultimate blend of technology and culture at Birla Institute of Technology, Patna.
            </p>
          </div>

          {/* Cards Section */}
          <div className="w-full md:w-[85%] lg:w-[70%] mx-auto mt-10 space-y-12">
            {/* Card 1 */}
            <div className="bg-white p-8 md:p-12 shadow-lg rounded-lg border-2 border-gray-100">
              <h2 className="text-3xl font-semibold text-center text-indigo-600">Welcome to Technika</h2>
              <p className="mt-6 text-gray-700 text-lg leading-relaxed">
                Technika is not just a technical fest; it is a celebration of innovation, creativity, and talent.
                With technical events like hackathons, coding challenges, and robotics competitions, 
                Technika provides a platform for students to showcase their skills in the field of technology.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 md:p-12 shadow-lg rounded-lg border-2 border-gray-100">
              <h2 className="text-3xl font-semibold text-center text-indigo-600">Cultural Extravaganza</h2>
              <p className="mt-6 text-gray-700 text-lg leading-relaxed">
                But that’s not all! Technika also brings together students through cultural competitions like dancing, singing, and acting. 
                Fun events and workshops led by experts ensure there’s something for everyone.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 md:p-12 shadow-lg rounded-lg border-2 border-gray-100">
              <h2 className="text-3xl font-semibold text-center text-indigo-600">Join Us at Technika!</h2>
              <p className="mt-6 text-gray-700 text-lg leading-relaxed">
                Be a part of this exciting journey of learning, growth, and fun. Let's celebrate technology, creativity, and culture 
                in a vibrant environment. See you at Technika!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default AboutPage;
