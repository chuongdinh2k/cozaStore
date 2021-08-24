import moment from "moment";

//validate username
export const checkName = (name) => {
  if (name.length > 7) {
    const arr = name.split(" ");
    if (arr.length > 1) {
      if (arr[0].length > 7) return `${arr[0].slice(0, 7)}...`;
      return `${arr[0]}...`;
    } else if (arr.length == 1) {
      return `${arr[0].slice(0, 7)}...`;
    }
  }
  return name;
};

//convert times
export const convertTime = (date) => {
  return `${moment(date).format("DD/MM/YYYY")}`;
};
// render star
export const renderStar = (stars) => {
  if (stars === 1) {
    return (
      <span>
        <i class="fas fa-star ratedStar"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
      </span>
    );
  } else if (stars === 2) {
    return (
      <span>
        <i class="fas fa-star ratedStar"></i>
        <i class="fas fa-star ratedStar"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
      </span>
    );
  } else if (stars === 3) {
    return (
      <span>
        <i class="fas fa-star ratedStar"></i>
        <i class="fas fa-star ratedStar"></i>
        <i class="fas fa-star ratedStar"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
      </span>
    );
  } else if (stars === 4) {
    return (
      <span>
        <i class="fas fa-star ratedStar"></i>
        <i class="fas fa-star ratedStar"></i>
        <i class="fas fa-star ratedStar"></i>
        <i class="fas fa-star ratedStar"></i>
        <i class="far fa-star"></i>
      </span>
    );
  } else if (stars === 5) {
    return (
      <span>
        <i class="fas fa-star ratedStar"></i>
        <i class="fas fa-star ratedStar"></i>
        <i class="fas fa-star ratedStar"></i>
        <i class="fas fa-star ratedStar"></i>
        <i class="fas fa-star ratedStar"></i>
      </span>
    );
  }
};
