
import "./Home.css";
import Image from "next/image";

export default function Home() {
  return (
    <section className="main">
      <div className="splash">
        <h1 className="title">StudyComb</h1>
        <h4 className="subheading">Bee Studious</h4>
        <div className="splashButtons">
          <button className="find">Find</button>
          <button className="rate">Rate</button>
        </div>
        <Image
            src="/TanBee.png"
            className="bee"
            alt="tan bee graphic"
            width={300}
            height={150}
            /> 
      </div>
      <div className="cardSection">
        <div className="spinCards">
          <Image
            src="/randomCardDefault.png"
            className="card"
            alt="image of card"
            width={200}
            height={150}
            /> 
          <Image
            src="/randomCardDefault.png"
            className="card"
            alt="image of card"
            width={200}
            height={150}
            /> 
          <Image
            src="/randomCardDefault.png"
            className="card"
            alt="image of card"
            width={200}
            height={150}
            /> 
        </div>
        <button className="spinButton">Spin!</button>

      </div>
    </section>
  );
}