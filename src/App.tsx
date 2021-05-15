import React from 'react';
import Box from './components/Box';
import Draggable from './components/Draggable';

const App = () => (
    <div className="App">
      <Draggable>
        <Box/>
      </Draggable>
    </div>
  );

export default App;
