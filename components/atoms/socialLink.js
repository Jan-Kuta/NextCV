/**
*
* SocialLink
*
*/

import React from 'react';
import Button from './button'

function SocialLink({ provider }) {
  return (
    <a href={`http://localhost:1337/connect/${provider}`} className="link">
      <Button type="button" social={provider} style={{ width: '100%' }}>
        <i className={`fa fa-${provider} w3-left`} />
        {provider}
      </Button>
    </a>
  );
}

export default SocialLink;
