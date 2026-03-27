export const updateErrorsOnDelete = (
  prevErrors: Record<string, string> | undefined,
  name: string,
  deletedIndex: number,
): Record<string, string> => {
  const targetKey = `${name}.${deletedIndex}`;

  // 1. Omit the deleted key using destructuring
  if (!prevErrors) return {};
  const { [targetKey]: _, ...remainingErrors } = prevErrors;

  // 2. Reduce the remaining errors into a new "shifted" object
  return Object.keys(remainingErrors).reduce(
    (acc, key) => {
      if (key.startsWith(`${name}.`)) {
        const currentIndex = parseInt(key.split(".")[1]);

        if (currentIndex > deletedIndex) {
          // Shift down: "columnNames.2" -> "columnNames.1"
          acc[`${name}.${currentIndex - 1}`] = remainingErrors[key];
        } else {
          // Keep as is
          acc[key] = remainingErrors[key];
        }
      } else {
        // Keep unrelated errors (e.g. "title")
        acc[key] = remainingErrors[key];
      }
      return acc;
    },
    {} as Record<string, string>,
  );
};
