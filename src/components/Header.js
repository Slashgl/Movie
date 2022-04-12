import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Input } from 'antd';

const { Header } = Layout;

const HeaderMovie = ({ onInputChange }) => (
  <Header>
    <Input placeholder="Type to search..." onChange={onInputChange} />
  </Header>
);
export default HeaderMovie;
