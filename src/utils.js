export const timeConverter = (timestamp) => {
  var a = new Date(timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
};

export const sortbySize = (data) => {
  const comp = (a, b) => {
    if (a.filesize < b.filesize) {
      return -1;
    }
    if (a.filesize > b.filesize) {
      return 1;
    }
  };
  const dataBySize = data.sort(comp);
  return dataBySize;
};

export const sortbyDate = (data) => {
  const comp = (a, b) => {
    if (a.timestamp < b.timestamp) {
      return -1;
    }
    if (a.timestamp > b.timestamp) {
      return 1;
    }
  };
  const dataByDate = data.sort(comp);
  return dataByDate;
};
export const sortByCategory = (data) => {
  const comp = (a, b) => {
    if (a.category < b.category) {
      return -1;
    }
    if (a.category > b.category) {
      return 1;
    }
  };
  const dataByCategory = data.sort(comp);
  return dataByCategory;
};
export const getName = (obj) => {
  const newName = obj.image.split("/");
  return newName[newName.length - 1];
};
export const sortByName = (data) => {
  const comp = (a, b) => {
    if (getName(a) < getName(b)) {
      return -1;
    }
    if (getName(a) > getName(b)) {
      return 1;
    }

    return 0;
  };
  const dataByDate = data.sort(comp);
  return dataByDate;
};
