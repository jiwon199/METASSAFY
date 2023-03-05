import React from 'react';

function TextGroupComponent(props) {
  return (
    <div style={{ textAlign: 'center', margin: 20 }}>
      <b style={{ margin: 0, padding: 0, fontSize: '1.5rem' }}>
        <strong>{props.name}</strong>
      </b>{' '}
      <br />
      <b style={{ margin: 0, padding: 0, fontSize: '0.8rem' }}>
        {props.area} {props.class}반
      </b>
    </div>
  );
}

export default TextGroupComponent;
