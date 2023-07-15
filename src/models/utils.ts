export function getRandomElements<TElement>(
  elements: TElement[],
  getElementId: (element: TElement) => string,
  randomElementCount: number
): TElement[] {
  if (elements.length < randomElementCount) {
    throw new RangeError(
      "getRandomElements: more elements taken than available"
    );
  }

  let takenElements: TElement[] = [];
  let takenElementIds: string[] = [];

  while (takenElementIds.length < randomElementCount) {
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    const randomElementId = getElementId(randomElement);

    if (!takenElementIds.includes(randomElementId)) {
      takenElements.push(randomElement);
      takenElementIds.push(randomElementId);
    }
  }

  return takenElements;
}
