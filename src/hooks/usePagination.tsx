export const usePagination = (
  currentPage: number,
  postsTotal: number | undefined
) => {
  const pagesAmount = Math.ceil(Number(postsTotal) / 8);
  const allPages = currentPage;
  let buttonList = [];

  if (pagesAmount === 1) return null;

  if (pagesAmount < 6) {
    for (let i = 1; i <= pagesAmount; i++) {
      buttonList.push(i);
    }
    return buttonList;
  }

  if (allPages <= 2) {
    for (let i = 1; i < pagesAmount; i++) {
      if (i < 5) buttonList.push(i);
    }
    buttonList.push(0);
    buttonList.push(pagesAmount);
  } else if (allPages >= 3 && allPages < pagesAmount - 3) {
    buttonList.push(1);
    buttonList.push(0);
    for (let i = 1; i < pagesAmount; i++) {
      if (i === allPages || i === allPages - 1 || i === allPages + 1) {
        buttonList.push(i + 1);
      }
    }
    buttonList.push(0);
    buttonList.push(pagesAmount);
  } else if (allPages >= pagesAmount - 3) {
    buttonList.push(1);
    buttonList.push(0);
    for (let i = 1; i < pagesAmount; i++) {
      if (
        i === pagesAmount - 4 ||
        i === pagesAmount - 3 ||
        i === pagesAmount - 1 ||
        i === pagesAmount - 2
      )
        buttonList.push(i + 1);
    }
  }
  return buttonList;
};
