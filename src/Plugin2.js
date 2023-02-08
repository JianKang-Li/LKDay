export default (Lday, Day, option) => {
    Day.dd = function () {
        console.log(this.$D);
        return this.$D
    }
}