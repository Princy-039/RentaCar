import React from "react";
import "./UserTerms.css";
import { FaWhatsapp } from 'react-icons/fa';

const UserTerms = () => {
  return (
    <div className="terms-wrapper">
      <div className="terms-content">
        <h1 className="terms-title">AGREEMENT SELF DRIVE RENTAL CAR</h1>
        <p className="last-updated"><strong>Last Updated:</strong> February 20, 2025</p>
        
        <section>
          <h2 className="section-title">Dear valued customer,</h2>
          <p>Thank you for renting a self-drive car. By signing this form, you acknowledge that you understand and agree to the detailed terms and conditions as stipulated below.</p>
        </section>

        <section>
          <h2 className="section-title">CONDITIONS</h2>
          <ul>
            <li>Security Deposit will be refunded only on the 1st to 3rd working day after returning the vehicle. Most of all, the refund will be processed within 24hrs after return.</li>
            <li>Booking amount is non-refundable but can be transferred to any trip in that month.</li>
            <li>The car should not be used for learning purposes, sports, race, rallies, or competitive events. If found, the security amount will be forfeited.</li>
            <li>No transport of goods/people in violation of local laws or against excise and customs rules.</li>
            <li>The car has to be driven by the same customer who has booked the vehicle on their license.</li>
            <li>The car has to be returned in the same condition as it was delivered at the pickup time. Fuel level should be maintained; excess fuel will not be refunded. Any loss in fuel percentage at the time of return will be charged.</li>
            <li>Toll, parking, permit, and interstate tax will not be refunded.</li>
            <li>Any bills, other damages, and loss of any accessories from the car will be charged.</li>
            <li>Customers are requested to carry the original driving license (mandatory).</li>
            <li>Damage cost up to Rs. 10,000/- will be the sole responsibility of the customers.</li>
            <li>For the damages claimed, the depreciation cost should be borne by the customer.</li>
            <li>Fastag balance should be maintained; Fastag balance will not be refunded.</li>
            <li>If the car is more dirty, a service charge will be deducted from the deposit. The maximum liability will be Rs. 50,000/-.</li>
          </ul>
        </section>

        <section>
          <h2 className="section-title">PENALTY</h2>
          <ul>
            <li>Fine for smoking inside the car: Rs. 750/-.</li>
            <li>Carrying pets or any animals in the car will be charged Rs. 1000/-.</li>
            <li>Fine for using alcohol inside the car: Rs. 1500/-.</li>
            <li>Over-speeding above 80 km per hr. will be charged Rs. 1500/-.</li>
            <li>Rs. 300/- will be charged for each hour of late drop.</li>
            <li>Food waste found inside the car: Rs. 400/-; after six hours, Rs. 650/- will be charged.</li>
          </ul>
        </section>

        <section>
          <h2 className="section-title">LEGAL LIABILITY</h2>
          <p>We will not be liable for any criminal/legal liability on account of negligent driving, driving under the influence of alcohol/drugs, etc. This includes breaking traffic laws and accidents. Any indictments or fines for driving violations by the customer will be charged to the customer. In case of an accident, vehicle towing charges will also be charged to the customer.</p>
        </section>

        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="whatsapp-icon">
          <FaWhatsapp size={50} color="white" className="whatsapp" />
        </a>
      </div>
    </div>
  );
};

export default UserTerms;
