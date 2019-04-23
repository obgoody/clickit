import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
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
        <Navpills
          message={this.state.message}
          curScore={this.state.curScore}
          topScore={this.state.topScore}
        />
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
