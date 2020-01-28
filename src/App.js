import React, { Component } from 'react';

import styled, { css } from 'styled-components'

import './App.css';

const PageNumber = styled.a`
  cursor: pointer;
  padding: 3px;
  background-color: grey;
`

class App extends Component {
  constructor() {
    super();
    this.state = {
      myItems: [],
      currentPage: 1,
      itemsPerPage: 10
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }


  componentDidMount() {
    fetch('/api/items')
        .then(res => res.json())
        .then((data) => {
          this.setState({ myItems: data.items })
          console.log(this.state.myItems)
        })
        .catch(console.log)
  }

  callApi = async () => {
    const response = await fetch('/api/items');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    const { myItems, currentPage, itemsPerPage } = this.state;

    // Logic for displaying todos
    const lastItemIdx = currentPage * itemsPerPage;
    const firstItemIdx = lastItemIdx - itemsPerPage;
    const currentItem = myItems.slice(firstItemIdx, lastItemIdx);
    const renderItems = currentItem.map((item, index) => {
      return <li key={item.id}>{item.text}</li>;
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(myItems.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
          <PageNumber key={number}
                      id={number}
                      onClick={this.handleClick}>
            {number}
          </PageNumber>
      );
    });
    return (
        <div className="App">
          <div>
            <ul>
              {renderItems}
            </ul>
            <span id="page-numbers" >
              {renderPageNumbers}
            </span>
          </div>
        </div>
    );
  }
}

export default App;