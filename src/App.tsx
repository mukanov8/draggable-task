import React from 'react';
import Box from './components/Box';
import Draggable from './components/Draggable';

const App = () => (
    <div className="app" data-testid="app">
      <Draggable>
        <Box/>
      </Draggable>
    </div>
  );

export default App;
