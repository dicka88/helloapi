import React from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
  color?: string;
}

const Avatar = styled.div<{
  backgroundColor: string
}>`
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items:center;
  width: 42px;
  height: 42px;
  background-color: ${(props: any) => props.backgroundColor} ;
  color: white;
  cursor: pointer;
  user-select: none;
`;

const AvatarShortName:React.FC<Props> = ({ name, color = '#0070f3' }) => {
  const shortName = name.split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <Avatar backgroundColor={color}>
      {shortName}
    </Avatar>
  );
};

export default AvatarShortName;
