import React from 'react';
import { Content } from 'antd/lib/layout/layout';

import { GenresListConsumer } from './GenresListContext';
import Card from './CardMovie';

const RatedContent = ({ rateList, changeRateList }) => (
  <Content>
    <GenresListConsumer>
      {(genresList) => {
        return rateList.map((item) => {
          const { id } = item;
          return <Card item={item} key={id} genresList={genresList} changeRateList={changeRateList} />;
        });
      }}
    </GenresListConsumer>
  </Content>
);

export default RatedContent;
