export default function PauseIcon({
  height = 24,
  width = 24,
  fill = "#000",
  ...rest
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M8 5V19M16 5V19'
        stroke='#000000'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
