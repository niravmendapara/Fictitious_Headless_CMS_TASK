
// Filter by Category
const filterByCategories = (data, categoryId) => {
    return data?.filter((article) => article.category?.id == categoryId)
}

module.exports = {
    filterByCategories,
};