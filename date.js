const now = new Date();
const date = {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear()
}
const fullDate = `${date.day}-${date.month}-${date.year}`;
module.exports = fullDate;