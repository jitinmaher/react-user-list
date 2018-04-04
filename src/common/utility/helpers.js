function getDateDifference(dateString) {
    var today = new Date();
    var givenDate = new Date(dateString.replace(/-/g, "/"));
    var diff = today.getFullYear() - givenDate.getFullYear();
    var m = today.getMonth() - givenDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < givenDate.getDate())) {
        diff--;
    }
    return diff;
}

export { getDateDifference };