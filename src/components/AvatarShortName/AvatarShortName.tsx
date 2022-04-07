import React from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
}

const Avatar = styled.div`
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items:center;
  width: 42px;
  height: 42px;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  user-select: none;
`;

const AvatarShortName:React.FC<Props> = ({ name }) => {
  const shortName = name.split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <Avatar>
      {shortName}
    </Avatar>
  );
};

export default AvatarShortName;
