import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
// score card
import Navpills from './components/Navpills';

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    message: "Click an image to begin!",
    topScore: 0,
    curScore: 0,
    friends: friends,
    unselectedFriends: friends
  }

  componentDidMount() {
  }

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  selectFriend = name => {
    const findFriend = this.state.unselectedFriends.find(item => item.name === name);

    if (findFriend === undefined) {
      
      this.setState({
        message: "WRONG!",
        topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
        curScore: 0,
        friends: friends,
        unselectedFriends: friends
      });
    }
    else {
      
      const newFriends = this.state.unselectedFriends.filter(item => item.name !== name);

      this.setState({
        message: "RIGHT!",
        curScore: this.state.curScore + 1,
        friends: friends,
        unselectedFriends: newFriends
      });
    }

    this.shuffleArray(friends);
  };

  

  render() {
    return (
      <Wrapper>
        {/* score card */}
        <Navpills
          message={this.state.message}
          curScore={this.state.curScore}
          topScore={this.state.topScore}
        />
        {/* friend card */}
        <Title>Friends List</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
            selectFriend={this.selectFriend} 
            curScore={this.state.curScore}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import cards from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.cards.forEach(card => {
      card.count = 0;
    });
    alert(`Game Over :( \nscore: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }

  clickCount = id => {
    this.state.cards.find((o, i) => {
      if (o.id === id) {
        if(cards[i].count === 0){
          cards[i].count = cards[i].count + 1;
          this.setState({score : this.state.score + 1}, function(){
            console.log(this.state.score);
          });
          this.state.cards.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.gameOver();
        }
      }
    });
  }
  // Map over this.state.cards and render a cardCard component for each card object
  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highscore={this.state.highscore}>Clicky Game</Header>
        {this.state.cards.map(card => (
          <Card
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

