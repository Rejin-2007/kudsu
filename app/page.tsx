import Achievement from "./components/Achievement";
import ComplaintBox from "./components/ComplaintBox";
import Hero from "./components/Hero";
import POC from "./components/POC";
import UpcomingEvent from "./components/UpcomingEvent";

export default function Home() {
  return (
    <div>
      <Hero />
      <ComplaintBox />
      <POC />
      <Achievement />
      <UpcomingEvent />

    </div>
  );
}
