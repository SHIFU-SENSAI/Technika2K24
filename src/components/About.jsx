import { Fade } from "react-awesome-reveal";

const AboutPage = () => {
  return (
    <Fade duration={800} direction="up" triggerOnce>
      <div className="pb-10">
        <div className="p-5 md:p-10 lg:p-20 bg-primary w-[90%] md:w-[90vw] h-full mx-auto mt-5 border-4 contact-form-shadow font-Default  ">
          <div className="text-3xl text-black font-bold text-center py-5">
            About Technika
          </div>
          <div className="font-Default text-lg md:text-xl lg:text-2xl">
            <div className="pt-3 md:pt-5 lg:pt-8">
              Welcome to Technika - the ultimate blend of technology and culture
              at Birla Institute of Technology Patna.
            </div>
            <div className="pt-5">
              Technika is not just a technical fest; it is a celebration of
              innovation, creativity, and talent. With a wide range of technical
              events like hackathons, coding challenges, and robotics
              competitions, Technika provides a platform for students to
              showcase their skills and knowledge in the field of technology.
            </div>
            <div className="pt-5">
              But that's not all! Technika also brings together students from
              different backgrounds and interests through cultural competitions
              like dancing, singing, and acting. Our fun events and workshops
              led by experts in their domains ensure that there is something for
              everyone to enjoy and learn from.
            </div>
            <div className="pt-5">
              Join us at Technika and be a part of this exciting journey of
              learning, growth, and fun. Let's come together to celebrate
              technology, creativity, and culture in a vibrant and dynamic
              environment. See you at Technika!
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default AboutPage;
