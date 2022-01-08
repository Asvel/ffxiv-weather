import * as mobxReact from 'mobx-react-lite';
import { useStore } from './useStore';
import { Condition } from './Condition';
import { Timetable } from './Timetable';
import { Matches } from './Matches';
import { Footer } from './Footer';

export const Main = mobxReact.observer(() => {
  const store = useStore();
  return (
    <div className="app">
      <Condition />
      {store.matches.length === 1 ? <Timetable /> : <Matches />}
      <Footer />
    </div>
  );
});
