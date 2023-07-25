import React from "react";
import "./Gig.scss";


function Gig() {
  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          {/* <span className="breadcrumbs">Liverr > Graphics & Design ></span> */}
          <h1>ID Cards</h1>
          <div className="user">
            
            <div className="stars">
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <span>5</span>
            </div>
          </div>
        
            <img
              src="https://img.freepik.com/premium-vector/id-card-template_23-2147823825.jpg?w=2000"
              alt=""
            />
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/007/703/765/small/modern-business-card-design-corporate-card-template-vector.jpg"
              alt=""
            />
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/007/670/896/small/id-card-template-design-with-green-color-vector.jpg"
              alt=""
            />
         
          <h2>Description </h2>
          <p>
          Personalized cards with a professional look.
          <ul>
              <li>4000+ design options available</li>
              <li>  Standard glossy or matte paper included</li>
              <li>Dimension shown on the design page includes bleed area (safety area), the final card size will be 8.9 cm x 5.1 cm</li>
              <li>Stretch your design up to the Bleed area to avoid white borders appearing around your card. Keep all your information within the safety area.</li>
              <li>Choose bold fonts size 10 and above when using white text</li>
              <li>Need help in designing? You can avail of our Design Services</li>
          </ul>
          </p>
          
        </div>
        <div className="right">
          <div className="price">
            <h3>ID Card</h3>
            <h2>$ 59.99</h2>
          </div>
          <p>
            I will create a unique high quality AI generated ID Cards based on a
            description that you give me
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>2 Days Delivery</span>
            </div>
           
          </div>
          <div className="features">
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Prompt writing</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Artwork delivery</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Image upscaling</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Additional design</span>
            </div>
          </div>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Gig;
