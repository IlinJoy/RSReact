type SpriteIconProps = {
  id: string;
  size?: number;
};

const BASE_SPRITE_SIZE = 24;
const PATH = '/icons/sprite.svg';

export function SpriteIcon({ id, size = BASE_SPRITE_SIZE }: SpriteIconProps) {
  return (
    <svg width={size} height={size} focusable="false">
      <use href={`${PATH}#${id}`} />
    </svg>
  );
}
