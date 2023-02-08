export default (Lday, Day, option) => {
    Day.es = function () {
        console.log(this.$t);
        return this.$t
    }
}