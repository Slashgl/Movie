import 'antd/dist/antd.css';
import './App.css';
import React, { Component } from 'react';

import { GenresListProvider } from '../GenresListContext';

import Header from '../Header';
import SearchContent from '../SearchContent';
import RatedContent from '../RatedContent';

import apiServise from '../../services/ApiServise';

import { Layout } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default class App extends Component {
  state = {
    searchQuery: null,
    numberPage: 1,
    genresList: [],
    rateList: [],
  };

  componentDidMount() {
    apiServise.getGenres().then((list) => {
      this.setState({
        genresList: [...list],
      });
    });

    if (!JSON.parse(localStorage.getItem('guestToken'))) {
      apiServise.creatGuestSession().then((guestToken) => {
        localStorage.setItem('guestToken', JSON.stringify(guestToken));
      });
    } else {
      this.changeRateList();
    }
  }

  onInputChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
      numberPage: 1,
    });
  };

  onPageChange = (page) => {
    this.setState({
      numberPage: page,
    });
  };

  changeRateList = () => {
    apiServise.getRatedFilms().then((res) => {
      this.setState({
        rateList: [...res.results],
      });
    });
  };

  onTabClick = (key) => {

    this.changeRateList();
  };

  render() {
    const { searchQuery, numberPage, genresList, rateList } = this.state;
    return (
      <GenresListProvider value={genresList}>
        <div className="container">
          <Layout>
            <Tabs defaultActiveKey="1" onTabClick={this.onTabClick}>
              <TabPane tab="Search" key="1">
                <Header onInputChange={this.onInputChange} />
                <SearchContent
                  searchQuery={searchQuery}
                  numberPage={numberPage}
                  onPageChange={this.onPageChange}
                  changeRateList={this.changeRateList}
                  rateList={rateList}
                />
              </TabPane>
              <TabPane tab="Rated" key="2">
                <RatedContent rateList={rateList} changeRateList={this.changeRateList} />
              </TabPane>
            </Tabs>
          </Layout>
        </div>
      </GenresListProvider>
    );
  }
}
