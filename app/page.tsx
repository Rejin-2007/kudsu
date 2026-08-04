import Achievement from "./components/Achievement";
import ComplaintBox from "./components/ComplaintBox";
import Hero from "./components/Hero";
import UpcomingEvent from "./components/UpcomingEvent";

export default function Home() {
  return (
    <div>
      <Hero />
      <ComplaintBox />
      <Achievement />
      <UpcomingEvent />

    </div>
  );
}
