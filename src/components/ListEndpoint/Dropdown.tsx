import { Button } from '@nextui-org/react';
import React from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';

type Props = {
  prefixPath: string,
  path: string
}

const Dropdown: React.FC<Props> = ({ prefixPath, path }) => {
  const onClick = () => {
    const data = prefixPath + path;
    console.log(data);
  };
  return (
    <div style={{ margin: ' -2px -12px' }}>
      <Button light auto css={{ borderRadius: 0, '&:hover': { background: '$gray100' }, py: '$2' }} icon={<BsPencil />}>
        Rename
      </Button>
      <Button light auto color="error" onClick={onClick} css={{ borderRadius: 0 }} icon={<BsTrash />}>
        Remove
      </Button>
    </div>
  );
};

export default Dropdown;
