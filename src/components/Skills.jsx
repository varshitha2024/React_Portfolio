import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  skillCard: {
    flex: '0 0 300px',
    width: '100%', // Full width on mobile
    maxWidth: '300px', // Limit width on larger screens
    height: 'auto',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    margin: '10px', // Adjusted margin for better spacing on mobile
    scrollSnapAlign: 'start',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  },
  skillIcon: {
    width: '40px',
    height: '40px',
    margin: '0 10px 10px 0',
  },
  mapImage: {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    marginBottom: '20px',
  },
  carouselContainer: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    paddingBottom: '20px',
    marginBottom: '30px',
    borderBottom: '1px solid #eee',
  },
  topSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '0 10px', // Add padding for better spacing on mobile
  },
  introText: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 20px auto',
    fontSize: 'clamp(16px, 4vw, 18px)', // Responsive font size
    fontFamily: 'Open Sans, sans-serif',
    padding: '0 10px', // Add padding for better spacing on mobile
  },
  codingText: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 20px auto',
    fontSize: 'clamp(16px, 4vw, 18px)', // Responsive font size
    fontFamily: 'Open Sans, sans-serif',
    padding: '0 10px', // Add padding for better spacing on mobile
  },
};

function Skills({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((error) => console.error('Error fetching skills data:', error));
  }, []);

  const renderSkillsIntro = (text, style) => (
    <div style={style}>
      <ReactMarkdown>{text ? text.replace(/\/n/g, '\n') : ''}</ReactMarkdown>
    </div>
  );

  if (!data) {
    return <FallbackSpinner />;
  }

  return (
    <div className="skills-component" style={{ padding: '20px' }}>
      <Header title={header} />
      <div className="container py-5" style={{ marginTop: '-50px' }}>
        <div style={styles.topSection}>
          {renderSkillsIntro(data.intro, styles.introText)}
          <h3 className="mb-4" style={{ color: '#2ecc71', fontSize: 'clamp(20px, 5vw, 24px)' }}>
            Data Structures and Algorithms
          </h3>
          {renderSkillsIntro(data.coding, styles.codingText)}
          <img src="images/skills/Map.png" alt="Skills Map" style={styles.mapImage} />
        </div>
        <div style={styles.carouselContainer}>
          {data.skills?.map((section) => (
            <div key={section.title} style={styles.skillCard}>
              <h4 className="mb-4" style={{ color: '#2ecc71', fontSize: 'clamp(18px, 4vw, 22px)' }}>
                {section.title}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {section.items.map((item) => (
                  <div key={item.title} style={{ textAlign: 'center', margin: '10px' }}>
                    <img src={item.icon} alt={item.title} style={styles.skillIcon} />
                    <div style={{ fontSize: 'clamp(14px, 3vw, 16px)', marginTop: '5px' }}>
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
