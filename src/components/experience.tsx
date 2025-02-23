import React from 'react';

type ExperienceProps = {
  position: 'left' | 'right';
  date: string;
  category: string;
  title: string;
  description: string;
  points: string[];
  tags: string[];
};

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Experience &amp; Contributions</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="relative flex flex-col items-center space-y-4">
          <ExperienceCard 
            position="right"
            date="2024"
            category="Open Source"
            title="Joplin Open Source Project"
            description="Contributed to the development of the Joplin open-source project, specifically working on enhancing macOS spell-check functionality."
            points={["Showcased proficiency in debugging and cross-platform development", "Enhanced software maintenance practices", "Collaborated with the global developer community"]}
            tags={["JavaScript", "React", "Electron"]}
          />
          
          <ExperienceCard 
            position="left"
            date="2023"
            category="Leadership"
            title="Committee Member at Orator Club"
            description="Successfully hosted and organized MUN 23 at IIIT Nagpur, enhancing participation and engagement in public speaking events."
            points={["Event organization and management", "Team leadership and coordination", "Public speaking and presentation skills"]}
            tags={["Event Management", "Leadership", "Public Speaking"]}
          />
          
          <ExperienceCard 
            position="right"
            date="2022-2025"
            category="Academic Leadership"
            title="Class Representative"
            description="Served for two years, facilitating communication between students and faculty and leading various class-related initiatives."
            points={["Academic coordination and planning", "Student advocacy and representation", "Communication and mediation"]}
            tags={["Leadership", "Communication", "Organization"]}
          />
        </div>
      </div>
    </section>
  );
};

const ExperienceCard: React.FC<ExperienceProps> = ({ position, date, category, title, description, points, tags }) => {
  return (
    <div className={`relative w-full max-w-2xl bg-neutral-900 p-6 rounded-xl shadow-lg flex flex-col md:w-1/2 ${position === 'right' ? 'md:ml-auto md:pr-8' : 'md:mr-auto md:pl-8 '}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-purple-500 text-sm text-white rounded-full">{date}</span>
        <span className="text-gray-400">{category}</span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
        {points.map((point, index) => <li key={index}>{point}</li>)}
      </ul>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => <span key={index} className="px-3 py-1 bg-neutral-700 text-sm text-gray-300 rounded-full">{tag}</span>)}
      </div>
    </div>
  );
};

export default ExperienceSection;
