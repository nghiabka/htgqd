module.exports = {
    getRecommendedUniversityAndDepartment: async function(req, res) {
        var params = req.allParams();
        var topsisTable = await TopsisTable.find();
        console.log(topsisTable.length);
        res.json({ topsisTable_size: topsisTable.length });
        
    }
}