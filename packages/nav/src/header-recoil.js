import React from 'react';
import { useRecoilState } from 'recoil';
import { cartCount } from 'homeRecoil/atoms';

const HeaderRecoil = () => {
  const [count, setCount] = useRecoilState(cartCount);
  return (
    <header style={{ fontSize: 'xx-large ' }}>
      <h2>Header Recoil</h2>
      <span>Header - Cart count is {count}</span>
      <button onClick={() => setCount(0)}>Clear</button>
    </header>
  );
};

export default HeaderRecoil;
