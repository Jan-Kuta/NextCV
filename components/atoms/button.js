/**
 *
 * Button
 *
 */

import React from 'react';

/* eslint-disable react/require-default-props */
function Button(props) {
  const buttonProps = Object.assign({}, props);
  const propsToDelete = ['primary', 'social'];

  propsToDelete.map((value) => delete buttonProps[value]);

  const label = !props.children ? <span>{props.label}</span> : props.children;

  return (
    <button
      className={`
        button
        ${props.primary && 'primary' }
        ${props.social === 'discord' && 'discord'}
        ${props.social === 'facebook' && 'primary'}
        ${props.social === 'github' && 'github'}
        ${props.social === 'google' && 'google'}
        ${props.social === 'microsoft' && 'microsoft'}
        ${props.social === 'twitch' && 'twitch'}
        ${props.social === 'twitter' && 'twitter'}
      `}
      type={props.type || 'button'}
      {...buttonProps}
    >
      {label}
    </button>
  );
}

export default Button;
