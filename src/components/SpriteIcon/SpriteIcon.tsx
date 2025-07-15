import { Component } from 'react';

type SpriteIconProps = {
  id: string;
  url?: string;
  size?: number;
};

const BASE_SPRITE_CONFIG = {
  size: 24,
  url: '/icons/sprite.svg',
};

export class SpriteIcon extends Component<SpriteIconProps> {
  render() {
    const {
      id,
      size = BASE_SPRITE_CONFIG.size,
      url = BASE_SPRITE_CONFIG.url,
    } = this.props;

    return (
      <svg width={size} height={size} focusable="false">
        <use href={`${url}#${id}`} />
      </svg>
    );
  }
}
