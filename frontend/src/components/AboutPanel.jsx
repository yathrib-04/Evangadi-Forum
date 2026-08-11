import React from 'react';
import { Link } from 'react-router-dom';

// Right-hand panel shared by Login and Register. Previously duplicated in both
// pages, which let the two drift apart (different text colours, line heights
// and button sizing); keeping it in one place holds them identical.
function AboutPanel() {
  return (
    <div className="flex-1 relative z-10 flex items-center">
      <div className="w-full">
        <h2 className="text-base font-medium text-evangadi-orange mb-4">
          About
        </h2>
        <h1 className="text-[42px] md:text-3xl font-bold text-evangadi-heading mb-8 leading-tight">
          Evangadi Networks Q&amp;A
        </h1>
        <div className="mb-10">
          <p className="text-base leading-[1.7] text-gray-500 mb-5">
            No matter what stage of life you are in, whether you're just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow ir your footsteps.
          </p>
          <p className="text-base leading-[1.7] text-gray-500 mb-5">
            Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
          </p>
        </div>
        <Link
          to="/how-it-works"
          className="inline-block bg-evangadi-orange text-white no-underline py-3.5 px-8 text-sm font-semibold rounded uppercase tracking-wide transition-colors hover:bg-evangadi-orange-dark"
        >
          HOW IT WORKS
        </Link>
      </div>
    </div>
  );
}

export default AboutPanel;
