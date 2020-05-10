import React, { useState, useEffect } from 'react';
import './App.css';

import Search from './components/Search';
import List from './components/List';

const App = () => {

  // window.onunload = () => window.localStorage.clear();

  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    }, 
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }, 
  ];


  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || 'React'
  );

  useEffect(() => {
    document.title = `You searched for ${searchTerm}`;
    localStorage.setItem('search', searchTerm);
    console.log(localStorage);
  }, [searchTerm]);

  // Since search state is managed in this component, filter the list array with the stateful searchTerm.If user entered search term is in an item in the stories array, then it is passed to the List component.
  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // State lifted out of Search Component. Search passes up the event after text is entered into the input via this Callback handler. The callback is used in Search component.
  const handleSearch = event => {
    // After Search used callback handler and callsback to here, this function then uses the passes up value to set search state.
    setSearchTerm(event.target.value);
    // console.log(event.target.value);
    
  };

  

  return (
    <div className="App">
      {/* Callback handler is passed via props to Search Component */}
      <Search userSearch={searchTerm} onSearch={handleSearch} />

      <hr />
    {/* If searchTerm is in stories array, the filtered results array with item is passed to the List component */}
      <List list={searchedStories} />
    </div>
  );
}


export default App;
