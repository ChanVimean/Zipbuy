import {
  FaArrowRight,
  FaFacebook,
  FaInstagramSquare,
  FaPhoneAlt,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { MdAccessTimeFilled, MdEmail } from "react-icons/md";
import { IoMdPin } from "react-icons/io";
import type { JSX } from "react";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  const about: string = `offers the latest electronics at great prices.
    From gadgets to accessories, we deliver quality products with fast
    shipping and secure checkouts.`;

  const categories1: string[] = [
    "Accessories",
    "Cameras",
    "components",
    "Desktops",
    "Drones",
    "Gaming Consoles",
    "Laptops",
    "Monitors",
  ];

  const categories2: string[] = [
    "Projectors",
    "Printers",
    "Smart Wacthes",
    "Speakers",
    "TVs",
  ];

  const reachUs: { title: string; icon: JSX.Element }[] = [
    { title: "012 345 678 9", icon: <FaPhoneAlt /> },
    { title: "rokrakdev@gmail.com", icon: <MdEmail /> },
    {
      title: "123 Tech Avenue, Suite 500 Electro City, CA 94016 United State",
      icon: <IoMdPin />,
    },
    { title: "Mon-Fri, 9AM-5PM (ICT/UTC+7)", icon: <MdAccessTimeFilled /> },
  ];

  const supports: string[] = [
    "Help Center",
    "Order Tracking",
    "Shipping & Delivery",
    "Returns & Refunds",
    "FAQs",
    "Terms & Conditions",
  ];

  const follows: JSX.Element[] = [
    <FaFacebook />,
    <FaInstagramSquare />,
    <FaTelegram />,
    <FaYoutube />,
    <FaTiktok />,
  ];

  const apps: { img: string; link: string }[] = [
    { img: "Google.png", link: "" },
    { img: "AppleStore.png", link: "" },
    { img: "Window.png", link: "" },
  ];

  return (
    <div className="w-full h-auto footer space-y-5 py-16">
      {/* Main Content */}
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
          gap-10 md:gap-8 lg:gap-4
          p-4 md:p-8 lg:px-20 lg:py-8"
      >
        <article className="text-center space-y-4">
          <h1 className="font-semibold text-2xl">About</h1>
          <p className="text-start">
            <span className="font-semibold mr-1">Zipbuy</span>
            {about}
          </p>
        </article>
        <article className="text-center space-y-4">
          <h1 className="font-semibold text-2xl">Categories</h1>
          <section className="flex justify-center space-x-4">
            <ul>
              {categories1.map((category, index) => (
                <li key={index}>
                  <span className="underline-hover">{category}</span>
                </li>
              ))}
            </ul>
            <ul>
              {categories2.map((category, index) => (
                <li key={index}>
                  <span className="underline-hover">{category}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>
        <article className="text-center space-y-4">
          <h1 className="font-semibold text-2xl">Reacah Us</h1>
          <ul>
            {reachUs.map((reach, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 text-start space-y-2"
              >
                <span className="text-xl">{reach.icon}</span>
                <span>{reach.title}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="text-center space-y-4">
          <h1 className="font-semibold text-2xl">Support</h1>
          <ul>
            {supports.map((support, index) => (
              <li key={index}>
                <span className="underline-hover">{support}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* 2nd Row */}
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          gap-10 md:gap-12 lg:gap-30
          p-4 md:p-8 lg:px-20 lg:py-8"
      >
        <aside className="space-y-4">
          <h2 className="font-semibold text-lg text-start">
            First time? Grab 5% off 5 items Limited Stock!
          </h2>
          <div className="relative w-full rounded-md bg-white text-black">
            <Input type="text" placeholder="example@gmail.com" />
            <FaArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 opacity-75" />
          </div>
        </aside>
        <aside className="space-y-4">
          <h2 className="font-semibold text-lg text-center">Follow Us</h2>
          <ul className="flex justify-center space-x-4 text-2xl">
            {follows.map((follow, index) => (
              <li key={index} className="text-blue-300 cursor-pointer">
                {follow}
              </li>
            ))}
          </ul>
        </aside>
        <aside className="space-y-4">
          <h2 className="font-semibold text-lg text-center">Try Our App</h2>
          <ul className="flex justify-center space-x-4">
            {apps.map((app, index) => (
              <li key={index} className="w-28">
                <a href={app.link}>
                  <img src={app.img} alt="App Link" className="w-full h-full" />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Policy & Credit */}
      <section className="flex flex-col md:flex-row justify-center text-center p-4 space-x-2 border-t-2 border-gray-400">
        <article>
          <Link to="#" className="font-semibold">
            Privacy & Policy
          </Link>
          <span className="mx-1"> | </span>
          Designed & developed by
        </article>
        <Link to="#" className="text-blue-400 font-semibold">
          Rok Rak Dev
        </Link>
      </section>
    </div>
  );
};

export default Footer;
