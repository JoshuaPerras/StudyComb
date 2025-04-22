import "./Homepage.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="main">
      <div className="splash">
        {/* main title and tagline */}
        <h1 className="title">StudyComb</h1>
        <h4 className="subheading">Bee Studious</h4>

        {/* navigation buttons to filter and add room pages */}
        <div className="splashButtons">
          <a href="/filter"><button className="find">Find</button></a>
          <a href="/addRoom"><button className="rate">Add</button></a>
        </div>

        {/* decorative bee images */}
        <Image
          src="/TanBee.png"
          className="bee"
          alt="tan bee graphic"
          width={300}
          height={150}
        />
        <Image
          src="/LightBee.png"
          className="Lbee"
          alt="light bee graphic"
          width={300}
          height={150}
        />

        {/* about the platform */}
        <p className="description">
          Tired of hunting for your ideal study spot? StudyComb is an all-in-one platform for discovering and reviewing study spots around UGA campus. Browse student reviews, check noise levels, outlet access, and more. Find your perfect study spot today.
        </p>
      </div>

      <div className="cardSection">
        {/* section for rotating cards - placeholder visuals */}
        {/* <h3 className="cardDescription">Study Spot of the Day!</h3> */}
        <div className="spinCards">
          <Image
            src="/randomCardDefault.png"
            className="homeCard"
            alt="image of card"
            width={200}
            height={150}
          /> 
          <Image
            src="/randomCardDefault.png"
            className="homeCard"
            alt="image of card"
            width={200}
            height={150}
          /> 
          <Image
            src="/randomCardDefault.png"
            className="homeCard"
            alt="image of card"
            width={200}
            height={150}
          /> 
        </div>

        {/* button linking to review page */}
        <button className="spinButton">
          <a href="/review">Rate!</a>
        </button>
      </div>
    </section>
  );
}
