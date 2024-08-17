import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const links: { href: string; title: string }[] = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/ingredients",
      title: "Ingredients",
    },
    {
      href: "/area",
      title: "Area",
    },
    {
      href: "/categories",
      title: "Categories",
    },
  ];
  return (
    <footer className=" w-full bg-[#010f36] grid grid-cols-1 lg:grid-cols-3 place-items-center items-start pt-10 pb-5 gap-5 ">
      <h2
        className={`first-letter:text-7xl  align-text-top  font-bold first-letter:text-sky-800`}
      >
        B
        <span className="text-3xl text-white relative -left-4 -top-4">
          Chief
        </span>
      </h2>
      <div className="text-center text-gray-300 ">
        <h3 className="font-bold text-white text-xl">About us </h3>
        <div className="flex flex-col gap-1 items-center">
          <p className="font-semibold  ">
            B-Chief is a web site teaching you to be a good chief{" "}
          </p>
          <p className="font-semibold   ">
            We Have A lot Of Recipes For You To Check
          </p>
        </div>
        <div className="flex gap-3 items-center justify-center mx-auto mt-5">
          <Link
            to={"https://github.com/Mohamed-Mubarak-142000/"}
            target="_blank"
          >
            <FaGithub size={25} />
          </Link>
          <Link
            to={"http://www.linkedin.com/in/mohamed-mubarak-142317215/"}
            target="_blank"
          >
            <FaLinkedin size={25} />
          </Link>
          <Link
            to={"https://www.facebook.com/profile.php?id=100088453234469/"}
            target="_blank"
          >
            <FaFacebook size={25} />
          </Link>
          <Link to={"https://wa.me/+01050867135"} target="_blank">
            <FaWhatsapp size={25} />
          </Link>
        </div>
      </div>
      <div className="text-gray-300">
        <h3 className="font-bold text-white text-xl">Important Links </h3>
        <div className="flex flex-col gap-1 items-center">
          {links.map((link, i) => (
            <Link
              className="font-semibold underline underline-offset-4"
              key={i}
              to={link.href}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <h3 className="w-full lg:col-span-3 text-center text-gray-300 font-serif ">
        Copyright &copy; 2024 All rights reserved to{" "}
        <strong>Mohamed Mubarak</strong>
      </h3>
    </footer>
  );
}
