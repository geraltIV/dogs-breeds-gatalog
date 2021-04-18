const pullBreed = (path) => {
  let pathArr = path.split("/");
  return {
    image: path,
    breed: pathArr[pathArr.length - 2],
  };
}

export default pullBreed