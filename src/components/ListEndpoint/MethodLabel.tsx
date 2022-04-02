import React from 'react';
import styled from 'styled-components';

type Props = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

const methodData = {
  GET: {
    shortName: 'GET',
    color: '#00C507',
    bg: '#AAFFAD',
  },
  POST: {
    shortName: 'POST',
    color: '#925800',
    bg: '#FFD089',
  },
  PUT: {
    shortName: 'PUT',
    color: '#002AB3',
    bg: '#90AAFF',
  },
  DELETE: {
    shortName: 'DEL',
    color: '#A80B00',
    bg: '#FF9C95',
  },
};

const MethodLabel: React.FC<Props> = ({ method }) => {
  const Label = styled.label`
  padding: 0.1rem;
  display: inline-block;
  min-width: 50px;
  text-align: center;
  border-radius: 4px;
  background-color: ${methodData[method].bg};
  color: ${methodData[method].color};
  margin-right: 1em;
  height: 100%;
`;

  return (
    <Label>
      {methodData[method].shortName}
    </Label>
  );
};

export default MethodLabel;
