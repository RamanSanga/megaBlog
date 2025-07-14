import React from 'react';

function Logo({ width = '100px', height = '30px' , backgroundColor = "tranparent"}) {
  return (
    <div >
      <img
        src="https://go.forrester.com/wp-content/themes/forrester/assets/static/forrester_logo.svg"
        alt="RS Blog Logo"
        style={{ width, height ,backgroundColor:backgroundColor }}
        
      />
    </div>
  );
}

export default Logo;
