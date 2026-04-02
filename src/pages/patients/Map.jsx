
const GoogleMap = () => {
  return (
    <div className="map-container">
      <iframe
        title="CMS Garage Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.561619893363!2d3.387673073587784!3d6.450282624012757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b1008d84415%3A0x91f6f0a98033f1e6!2sCMS%20Garage!5e0!3m2!1sen!2sng!4v1775127338500!5m2!1sen!2sng"
        width="100%"
        height="250"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;