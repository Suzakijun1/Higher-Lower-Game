import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const mailIcon = (
  <FontAwesomeIcon icon={faEnvelope} className="text-black text-2xl" />
);

const gitHub = (
  <FontAwesomeIcon icon={faGithub} className="text-black text-2xl" />
);

const linkedIn = (
  <FontAwesomeIcon icon={faLinkedin} className="text-black text-2xl" />
);

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary py-4">
      <div className="container mx-auto">
        <ul className="flex justify-center">
          {/* <li className="p-3">
            <a href="" target="_blank">
              {mailIcon}
            </a>
          </li> */}
          <li className="p-3">
            <a
              href="https://github.com/Suzakijun1/Higher-Lower-Game"
              target="_blank"
            >
              {gitHub} Powered by SuperHero API
            </a>
          </li>
          {/* <li className="p-3">
            <a
              href=""
              target="_blank"
            >
              {linkedIn}
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}