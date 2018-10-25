/**
*
* SocialLink
*
*/

import React from 'react';
import Button from './button'
import { getProviderAuthenticationUrl } from '../../lib/auth';

function SocialLink({ provider }) {
  return (
    <a href={getProviderAuthenticationUrl(provider)} className="link">
      <Button type="button" social={provider} style={{ width: '100%' }}>
        <i className={`fa fa-${provider} w3-left`} />
        {provider}
      </Button>
    </a>
  );
}

export default SocialLink;
