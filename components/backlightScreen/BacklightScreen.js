import { Backlight } from '../backlight/Backlight'

export function BacklightScreen({ data }) {
  return (
    <Backlight>
      <span>Backlight Example</span>,{' '}
      <span>
        data from{' '}
        {data.map((item) => (
          <span key={item.id}>{item.title}</span>
        ))}
      </span>
    </Backlight>
  )
}
