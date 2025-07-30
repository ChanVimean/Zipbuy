import type { JSX } from "react";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  const icons: JSX.Element[] = [
    <FaFacebook />,
    <FaTwitter />,
    <FaInstagramSquare />,
    <FaTiktok />,
  ];

  return (
    <div className="flex justify-evenly">
      {/* Header */}
      <section className="space-y-4">
        <div>
          <h1>Location</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius,
            quod.
          </p>
        </div>

        <div>
          <h1>Follow us</h1>
          <ul className="flex items-center space-x-4">
            {icons.map((icon, index) => (
              <li key={index}>{icon}</li>
            ))}
          </ul>
          <p></p>
        </div>
      </section>

      <form className="flex flex-col items-start">
        <h1>Contact Form</h1>
        <input type="text" placeholder="Enter your name" />
        <input type="text" placeholder="Enter a valid email address" />
        <textarea placeholder="Enter your message" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
