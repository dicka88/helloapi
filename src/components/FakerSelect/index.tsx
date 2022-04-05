import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';

export interface Faker {
  label: string;
  value?: string;
  options?: Faker[];
}

type Props = {
  value?: string;
  onChange: Function;
  [x:string]: any;
}

const options: Faker[] = [
  {
    label: 'Address',
    options: [
      { label: 'Cardinal Direction', value: 'address.cardinalDirection' },
      { label: 'City', value: 'address.city' },
      { label: 'City Name', value: 'address.cityName' },
      { label: 'City Prefix', value: 'address.cityPrefix' },
      { label: 'City Suffix', value: 'address.citySuffix' },
    ],
  },
  {
    label: 'Animal',
    options: [
      { label: 'Bear', value: 'animal.bear' },
      { label: 'Bird', value: 'animal.bird' },
      { label: 'Cat', value: 'animal.cat' },
      { label: 'Cetacean', value: 'animal.cetacean' },
      { label: 'Cow', value: 'animal.cow' },
    ],
  },
  {
    label: 'Internet',
    options: [
      { label: 'Avatar', value: 'internet.avatar' },
      { label: 'Color', value: 'internet.color' },
      { label: 'Domain Name', value: 'internet.domainName' },
      { label: 'Domain Suffix', value: 'internet.domainSuffix' },
      { label: 'Domain Name', value: 'internet.domainName' },
      { label: 'Email', value: 'internet.email' },
      { label: 'Example Email', value: 'internet.exampleEmail' },
    ],
  },
];

const getFlatOptions = (): Faker[] => {
  let flattenOptions: Faker[] = [];
  const flat = options.map((item: Faker) => item.options);

  flat.forEach((items) => {
    flattenOptions = flattenOptions.concat([...items!]);
  });

  return flattenOptions;
};

const FakerSelect: React.FC<Props> = ({ value = '', onChange, ...props }) => {
  const propValue = getFlatOptions().find((item: Faker) => item.value === value);
  const [selectedValue, setSelectedValue] = useState<SingleValue<Faker>>(propValue as Faker);

  const changeHandler = (option: SingleValue<Faker>) => {
    onChange(option);
    setSelectedValue(option);
  };

  return (
    <Select<Faker>
      placeholder="Faker options"
      value={selectedValue}
      options={options}
      onChange={changeHandler}
      styles={{
        control: (provided: any) => ({
          ...provided,
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          minWidth: '250px',
          cursor: 'pointer',
        }),
      }}
      {...props}
    />
  );
};

export default FakerSelect;
