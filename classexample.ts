export const palindromer = (word: string): boolean => {
  let reversed = []
  for (let i = word.length - 1; i >= 0; i--) {
    reversed.push(word[i])
  }
  if (reversed.join('') === word) {
    return true
  }
  return false
}
