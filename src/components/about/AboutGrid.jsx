import { useState, useEffect, useRef } from 'react';
import { SectionTitle, PurpleText, CommentText } from './CodingTitle';

const AboutGrid = ({ skills, experiences, languages, busy }) => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (sectionId) => visibleSections.has(sectionId);

  const hasExperiences = experiences && experiences.length > 0;
  const hasLanguages = languages && Object.keys(languages).length > 0 &&
    Object.values(languages).some(arr => arr && arr.length > 0);
  const hasBusy = busy && busy.length > 0;

  if (!hasExperiences && !hasLanguages && !hasBusy) return null;

  return (
    <div className="pt-12 pr-8 -mr-[25vw] w-[75vw] lg:pt-12 lg:pr-8 lg:-mr-[25vw] lg:w-[75vw] max-lg:pt-8 max-lg:pr-4 max-lg:mr-0 max-lg:w-full">

      {/* Experience Section */}
      {hasExperiences && (
        <section
          id="experience"
          ref={el => sectionRefs.current.experience = el}
          className={`mb-8 transition-all duration-700 ${
            isVisible('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SectionTitle>Experience</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="font-mono text-gray-400 leading-relaxed">
                <div className="mb-1">
                  <PurpleText className="font-semibold">{exp.position}</PurpleText>
                </div>
                <div className="mb-1">@ {exp.company}</div>
                <div className="text-sm mb-2">{exp.time}</div>
                {exp.description && (
                  <div className="text-xs text-gray-500 leading-relaxed">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages Section */}
      {hasLanguages && (
        <section
          id="languages"
          ref={el => sectionRefs.current.languages = el}
          className={`mb-8 transition-all duration-700 delay-100 ${
            isVisible('languages') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SectionTitle>Languages</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-4">
            {Object.entries(languages).map(([level, langs]) => (
              langs && langs.length > 0 && (
                <div key={level} className="font-mono text-gray-400 leading-relaxed">
                  <div className="mb-2">
                    <CommentText>{level}</CommentText>
                  </div>
                  {langs.map(([locale, label], index) => (
                    <div key={index}>
                      <PurpleText className="italic">{locale}</PurpleText> {label}
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Also Busy With Section */}
      {hasBusy && (
        <section
          id="busy"
          ref={el => sectionRefs.current.busy = el}
          className={`mb-8 transition-all duration-700 delay-200 ${
            isVisible('busy') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <SectionTitle>Also busy with</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-4">
            {busy.map((activity, index) => (
              <div key={index} className="font-mono text-gray-400 leading-relaxed">
                {activity}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutGrid;
