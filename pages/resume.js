import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { name, showResume } from "../data/portfolio.json";
import { resume } from "../data/portfolio.json";
import data from "../data/portfolio.json";

// import { ReactComponent as HacettepeIcon } from '../public/icons/hacettepe.svg';
// import { ReactComponent as AsisguardIcon } from '../public/icons/asisguard.svg';
import {hacettepe, asisguard} from '../public/icons'

const Resume = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!showResume) {
      router.push("/");
    }
  }, []);

  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => router.push("/edit")} type="primary">
            Edit Resume
          </Button>
        </div>
      )}
      {data.showCursor && <Cursor />}
      <div className={`container mx-auto mb-10 ${data.showCursor && "cursor-none"}`}>
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${
                mount && theme.theme === "dark" ? "bg-slate-800" : "bg-gray-50"
              } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >
              <h1 className="text-3xl font-bold">{name}</h1>
              <h2 className="text-xl mt-5">{resume.tagline}</h2>
              <h2 className="w-4/5 text-xl mt-5 opacity-50">{resume.description}</h2>
              <div className="mt-2">
                <Socials />
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Experience</h1>
                <VerticalTimeline>
                  {resume.experiences.map(({ id, dates, type, position, bullets }) => {
                    const bulletsArray = bullets.split(",");
                    return (
                      <VerticalTimelineElement
                        key={id}
                        date={dates}
                        dateClassName="text-sm opacity-75"
                        iconStyle={{background: "#06D6A0"}}
                        icon={<asisguard />}
                      >
                        <h3 className="text-lg">{type}</h3>
                        <h2 className="text-base mt-2">{position}</h2>
                        <ul className="list-disc mt-2">
                          {bulletsArray.map((bullet, index) => (
                            <li key={index} className="ml-5 py-2">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </VerticalTimelineElement>
                    );
                  })}
                </VerticalTimeline>
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Education</h1>
                <VerticalTimeline>
                  <VerticalTimelineElement
                    date={resume.education.universityDate}
                    dateClassName="text-sm opacity-75"
                    iconStyle={{background: "#06D6A0"}}
                    icon={<hacettepe />}
                  >
                    <h2 className="text-lg">{resume.education.universityName}</h2>
                    <p className="text-sm mt-2 opacity-50">{resume.education.universityPara}</p>
                  </VerticalTimelineElement>
                </VerticalTimeline>
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Skills</h1>
                <div className="flex mob:flex-col desktop:flex-row justify-between">
                  {resume.languages && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Languages</h2>
                      <ul className="list-disc">
                        {resume.languages.map((language, index) => (
                          <li key={index} className="ml-5 py-2">
                            {language}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {resume.frameworks && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Frameworks</h2>
                      <ul className="list-disc">
                        {resume.frameworks.map((framework, index) => (
                          <li key={index} className="ml-5 py-2">
                            {framework}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {resume.others && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Others</h2>
                      <ul className="list-disc">
                        {resume.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
