export default function nameFilter(value) {
  if (!value.includes("http")) {
    return value.replace(/-|\//g, " ");
  } else {
    let name = value.split("/");
    return name[name.length - 2].replace(/-|\//g, " ");
  }
}
