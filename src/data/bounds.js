// Country bounds drawn via http://bboxfinder.com/
// they are currently in the follow format [W, S, E, N]
const countryBounds = {
  au: [112.669086, -43.696673, 153.726368, -10.737187],
  nz: [166.332922, -47.292562, 178.573837, -34.394162],
}
// 166.509144322, -46.641235447, 178.517093541, -34.4506617165
export const allCountryBounds = Object.values(countryBounds);
// latitude is West (-) to East (+)
// longitude is North (+) to South (-)

export const totalBounds = allCountryBounds.reduce(
  ([w1, s1, e1, n1], [w2, s2, e2, n2]) => ([
    Math.min(w1, w2),
    Math.min(s1, s2),
    Math.max(e1, e2),
    Math.max(n1, n2),
  ])
)