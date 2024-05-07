import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

type Event = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

type Props = {
  className: string;
};

const ListsWidget2: React.FC<Props> = ({ className }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/agent/match');
        const matches = response.data;

        // Adapt each match to the format expected by react-big-calendar
        const adaptedEvents: Event[] = matches.map((match: any) => ({
          title: `${match.team1?.name} vs ${match.team2?.name}`,
          start: new Date(match.time),
          end: new Date(new Date(match.time).getTime() + 90 * 60 * 1000),  // Assuming each match lasts 90 minutes
          allDay: false,
        }));

        setEvents(adaptedEvents);
      } catch (error) {
        console.error('Error retrieving match data:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <h3 className="card-title">Match Calendar</h3>
      </div>
      <div className="card-body">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      </div>
    </div>
  );
}

export { ListsWidget2 };
