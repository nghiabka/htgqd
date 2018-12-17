module.exports = {
    getRecommendedUniversityAndDepartment: async function(req, res) {
        var params = req.allParams();
        try {
            var result = await TopsisTable.getRecommended(params);

            res.json({ data: result });
        } catch (error) {
            console.log('error', error);
            res.json({ status: 0, message: error.message });
        }
        
    }
}