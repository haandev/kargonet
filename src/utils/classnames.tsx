export default function classNames(
  ...classes: Array<string | null | undefined | boolean>
) {
  return classes.filter(Boolean).join(" ")
}
