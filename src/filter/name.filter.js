export default function nameFilter(value) {
    return value.replace(/-|\//g, ' ')
}