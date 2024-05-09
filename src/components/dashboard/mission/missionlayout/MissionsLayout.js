import React from 'react';
import { Carousel } from 'react-bootstrap';
import {MissionCardCarousel, MissionCardList} from '../missioncard/MissionCard';
import './MissionsLayout.scss'; 
const MissionsCarousel = ({ missions }) => {
 
  
  const missionPairs = [];
  for (let i = 0; i < missions.length; i += 3) {
    missionPairs.push(missions.slice(i, i + 3));
  }

  return (
    <>
    <Carousel
      interval={null}
      indicators={false}
    >      {missionPairs.map((pair, idx) => (
        <Carousel.Item key={idx}>
          <div className="d-flex justify-content-around"> 
            {pair.map(mission => (
              <MissionCardCarousel key={mission.id} mission={mission} />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </>
  );
};

const MissionsList = ({ missions }) => {
  return (
    <div className='mission-card-container'>
      {missions.map(mission => (
        <MissionCardList key={mission.id} mission={mission} />
      ))}
    </div>
  );
};

export { MissionsCarousel, MissionsList };