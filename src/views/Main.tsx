import { useStore } from './useStore';
import { Condition } from './Condition';
import { Timetable } from './Timetable';
import { Matches } from './Matches';
import { Footer } from './Footer';

export function Main() {
  const store = useStore();
  return (
    <div class="app">
      <Condition />
      {store.matches.length === 1 && <Timetable />}
      {store.matches.length > 1 && <Matches />}
      <Footer />
    </div>
  );
}
