import React, { useEffect } from "react";
import styles from "../../../styles/styles";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import { allEvents } from "../../../redux/actions/event";


const Events = () => {

  const { event, isLoading } = useSelector(state => state.event);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allEvents())
  }, [dispatch])

  return (
    <>
      {
        event && <div>
          <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
              <h1>Popular Events</h1>
            </div>

            <div className="w-full grid">
              {
                event.slice(event.length-3,event.length).map((item) => <EventCard key={item._id} data={item} />)
              }
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Events;
