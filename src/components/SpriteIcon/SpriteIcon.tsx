import sprite from '@/assets/icons/sprite.svg';

type SpriteIconProps = {
  id: string;
  size?: number;
};

const BASE_SPRITE_SIZE = 24;

export function SpriteIcon({ id, size = BASE_SPRITE_SIZE }: SpriteIconProps) {
  return (
    <svg width={size} height={size} focusable="false">
      <use href={`${sprite}#${id}`} />
    </svg>
  );
}
