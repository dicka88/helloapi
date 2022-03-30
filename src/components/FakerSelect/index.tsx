import React from 'react';
import styled from 'styled-components';

type Props = {
  value: string
}

const fakerOptions = [
  'name.fullname',
  'name.shortname',
];

const Select = styled.select`
  border-radius: 12px;
  background: '#F0F0F0';
  padding: 0.5em;
  border: none;
`;

const FakerSelect: React.FC<Props> = ({ value }) => (
  <Select value={value}>
    {fakerOptions.map((option) => (
      <option key={option}>{option}</option>
    ))}
  </Select>
);

export default FakerSelect;
