import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { allEvents } from "../redux/actions/event";
import EventCard from "../components/Route/Events/EventCard";

const EventsPage = () => {


  const { event, isLoading } = useSelector(state => state.event);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allEvents())
  }, [dispatch])


  return (
    <>
      <div>
        <Header activeHeading={4} />
        {
         event&& event.map((item)=><EventCard key={item._id} data = {item} active={true} />)
        }
       </div>
    </>
  );
};

export default EventsPage;
