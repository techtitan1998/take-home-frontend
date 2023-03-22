import React from "react";
import { MdLocationOn } from "react-icons/md";
import { FaEnvelopeOpen } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
const Index = () => {
  return (
    <div className="container-fluid py-3">
      <div className="container">
        <div className="bg-light py-2 px-4 mb-3">
          <h3 className="m-0">Contact Us For Any Queries</h3>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="bg-light mb-3" style={{ padding: 30 }}>
              <h6 className="font-weight-bold">Get in touch</h6>
              <p>Labore ipsum ipsum rebum erat amet nonumy, nonumy erat justo sit dolor ipsum sed, kasd lorem sit et duo dolore justo lorem stet labore, diam dolor et diam dolor eos magna, at vero lorem elitr</p>
              <div className="d-flex align-items-center mb-3">
                <MdLocationOn style={{ fontSize: "30px", marginRight: 20 }} className="text-primary " />
                <div className="d-flex flex-column">
                  <h6 className="font-weight-bold">Our Office</h6>
                  <p className="m-0">123 Street, New York, USA</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaEnvelopeOpen style={{ fontSize: "30px", marginRight: 20 }} className="text-primary" />
                <div className="d-flex flex-column">
                  <h6 className="font-weight-bold">Email Us</h6>
                  <p className="m-0">info@example.com</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <BsFillTelephoneFill style={{ fontSize: "30px", marginRight: 20 }} className="text-primary" />
                <div className="d-flex flex-column">
                  <h6 className="font-weight-bold">Call Us</h6>
                  <p className="m-0">+012 345 6789</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="contact-form bg-light mb-3" style={{ padding: 30 }}>
              <div id="success"></div>
              <form name="sentMessage" id="contactForm" novalidate="novalidate">
                <div className="form-row">
                  <div className="col-md-6">
                    <div className="control-group">
                      <input type="text" className="form-control p-4" id="name" placeholder="Your Name" required="required" data-validation-required-message="Please enter your name" />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="control-group">
                      <input type="email" className="form-control p-4" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="control-group">
                  <input type="text" className="form-control p-4" id="subject" placeholder="Subject" required="required" data-validation-required-message="Please enter a subject" />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <textarea className="form-control" rows="4" id="message" placeholder="Message" required="required" data-validation-required-message="Please enter your message"></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div>
                  <button className="btn btn-primary font-weight-semi-bold px-4" style={{ height: 50 }} type="submit" id="sendMessageButton">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
