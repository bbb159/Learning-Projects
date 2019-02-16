import React from "react";

const TopHeader = () => (
  <header className="masthead text-center text-white d-flex">
    <div className="container my-auto">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h1 className="text-uppercase">
            <strong>
              Liberdade e independência na hora de aprender ou praticar idiomas?
            </strong>
          </h1>
          <hr />
        </div>
        <div className="col-lg-8 mx-auto">
          <p className="text-faded mb-5">
            <strong>
              Aposto que pensou que isso seria caro, clique no botão abaixo e se
              supreenda!
            </strong>
          </p>
          <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">
            Faça parte
          </a>
        </div>
      </div>
    </div>
  </header>
);

export default TopHeader;
