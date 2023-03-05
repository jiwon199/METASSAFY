import TechStackItem from './TeckStackItem';
import { fetchUserStackById } from '../../services/profile-service';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const TechStackList = ({ user_id }) => {
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    const getTechStack = async () => {
      if (user_id) {
        const { data } = await fetchUserStackById(user_id);
        setStacks(data);
      }
    };
    getTechStack();
  }, [user_id]);

  return (
    <TechListStyle>
      {stacks.map((stack, index) => (
        <TechStackItem
          key={index}
          id={index}
          image={stack.tech_logo}
          title={stack.tech_id}
        />
      ))}
    </TechListStyle>
  );
};

export default TechStackList;

const TechListStyle = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;
