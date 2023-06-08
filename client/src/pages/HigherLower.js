import HigherLowerBody from "../components/HigherLowerBody";
import bgImage from "../images/battlegrounds-3.jpeg";

export default function HigherLower() {
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <h1 className="text-3xl font-bold text-center pt-10">
        Welcome to the Game!
      </h1>
      <HigherLowerBody />
    </div>
  );
}
