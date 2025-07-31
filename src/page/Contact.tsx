import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { MdMail } from "react-icons/md";

const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const contactInfos = [
    {
      title: "Location",
      icon: <FaLocationDot />,
      details: ["367 Grove Street Los Santos, San Andreas"],
    },
    {
      title: "Business Hours",
      icon: <IoTimeSharp />,
      details: [
        "Mon - Fri: 9:00 AM",
        "6:00 PM Sat: 10:00 AM",
        "4:00 PM Sun: Closed",
      ],
    },
    {
      title: "Contact Info",
      icon: <MdMail />,
      details: ["support@rokrakdev.com", "+1 (555) 420-6969"],
    },
  ];

  const handleClear = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="w-full py-16 md:py-24 lg:py-32 px-4 md:px-0">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Location Info */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-start">
          {contactInfos.map((info, index) => (
            <li
              key={index}
              className="shadow-md text-center rounded-lg p-6 space-y-2 bg-white text-slate-950 overflow-hidden"
            >
              <h2 className="flex items-center justify-center space-x-2 text-lg font-semibold">
                <span>{info.icon}</span>
                <span>{info.title}</span>
              </h2>
              {info.details.map((detail, i) => (
                <p key={i} className="text-sm md:text-base">
                  {detail}
                </p>
              ))}
            </li>
          ))}
        </ul>

        {/* Contact Form */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Image */}
          <img
            src="Mail.png"
            alt="Contact Illustration"
            className="w-56 md:w-72 lg:w-96 h-auto object-contain"
          />

          {/* Contact Form */}
          <form className="w-full max-w-xl p-6 rounded-lg shadow-md space-y-5 bg-white text-slate-950">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              📬 Contact Form
            </h2>

            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <aside className="w-full flex justify-between">
              <Button
                type="submit"
                className="bg-blue-400 hover:bg-blue-500 active:bg-blue-300 cursor-pointer"
              >
                Send Message
              </Button>
              <button
                type="button"
                onClick={handleClear}
                className="font-medium text-red-500 cursor-pointer hover:font-semibold active:text-red-300 duration-150 ease-in-out"
              >
                Clear
              </button>
            </aside>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
