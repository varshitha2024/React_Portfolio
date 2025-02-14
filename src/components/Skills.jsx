import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import { Container } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
  },
  map: {
    display: 'block',
    margin: '20px auto',
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 5,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
  },
};

function Skills({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoints.skills);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching skills data:', error);
      }
    };
    fetchData();
  }, []);

  const renderSkillsIntro = (text) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown>{text ? text.replace(/\/n/g, '\n') : ''}</ReactMarkdown>
    </h4>
  );

  if (!data) {
    return <FallbackSpinner />;
  }

  return (
    <>
      <Header title={header} />
      <Fade>
        <div className="section-content-container">
          <Container>
            {renderSkillsIntro(data.intro)}
            <div className="section-content-container">
              <h3>Data Structures and Algorithms</h3>
              {renderSkillsIntro(data.coding)}
              <img src="images/skills/Map.png" alt="progress graph" style={styles.map} />
            </div>
            {data.skills?.map((section) => (
              <div key={section.title}>
                <br />
                <h3>{section.title}</h3>
                {section.items.map((item) => (
                  <div key={item.title} style={{ display: 'inline-block', textAlign: 'center' }}>
                    <img style={styles.iconStyle} src={item.icon} alt={item.title} />
                    <p>{item.title}</p>
                  </div>
                ))}
              </div>
            ))}
          </Container>
        </div>
      </Fade>
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};
export default Skills;
