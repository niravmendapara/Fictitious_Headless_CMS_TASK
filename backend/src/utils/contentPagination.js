
const paginateData = (data, page, limit) => {
    if(!data || !data?.length) return [];
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Return the sliced array
    return data.slice(startIndex, endIndex);
}
module.exports = {
    paginateData,
};