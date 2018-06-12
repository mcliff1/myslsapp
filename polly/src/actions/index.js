
export const updateText = (text) => {
  console.log(text)

  return({
  type: 'UPDATE_TEXT',
  text
});
}
