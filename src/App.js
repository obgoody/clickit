import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import Navpills from './components/Navpills/Navpills.js';

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    message: "Click an image to begin!",
    topScore: 0,
    curScore: 0,
    friends: friends,
    unselectedFriends: friends
  };
  componentDidMount() {
  }

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  selectFriend = friend => {
    const findFriend = this.state.unselectedFriend.find(item => item.friend === friend);

    if (findFriend === undefined) {
      // failure to select a new dog
      this.setState({
        message: "You guessed incorrectly!",
        topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
        curScore: 0,
        friends: friends,
        unselectedFriends: friends
      });
    }
    else {
      // success to select a new dog
      const newFriends = this.state.unselectedFriends.filter(item => item.friend !== friend);

      this.setState({
        message: "You guessed correctly!",
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
        <Navpills
          message={this.state.message}
          curScore={this.state.curScore}
          topScore={this.state.topScore}
        />
        <Title>Friends List</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
