function merge(oldValues, newValues) {
  const mergedArray = [ ...oldValues ];
  newValues.forEach(newElement => {
    const index = oldValues.findIndex(old => old.dateTime === newElement.dateTime);
    if (index > -1) {
      mergedArray[index] = { ...oldValues[index], ...newElement };
    }
    else {
      mergedArray.push(newElement);
    }
  });
  return mergedArray;
}

export {
  merge
}
