import { useMemo } from 'react';
import Timeline from './components/TimeLine';
import { DateTime } from 'luxon';
import ControlsBar from './components/ControlsBar/ControlsBar';
import styled from 'styled-components';
import Store from './state/store';

const Root = styled.div`
  padding: 2rem;
`;

const StyledControlBar = styled(ControlsBar)`
  margin: 2rem 0;
`;

function App() {
  const timeLineStart = useMemo(() => DateTime.local(), []);

  return (
    <Root className="App">
      <Store>
        <StyledControlBar timeLineStart={timeLineStart} />
        <Timeline timeLineStart={timeLineStart}></Timeline>
      </Store>
    </Root>
  );
}

export default App;
