import { Component } from 'react';

import sprite from '@/assets/icons/sprite.svg';

type SpriteIconProps = {
  id: string;
  size?: number;
};

const BASE_SPRITE_SIZE = 24;

export class SpriteIcon extends Component<SpriteIconProps> {
  render() {
    const { id, size = BASE_SPRITE_SIZE } = this.props;

    return (
      <svg width={size} height={size} focusable="false">
        <use href={`${sprite}#${id}`} />
      </svg>
    );
  }
}
