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
        
    },
    getAllOptions: async function(req, res) {
        try {
            let allOptions = await Promise.all([
                University.find().sort('name asc'),
                Hobby.find().sort('name asc'),
                Group.findAll(),
                Subject.find().sort('name asc'),
            ])

            let universities = allOptions[0];
            let hobbies = allOptions[1];
            let groups = allOptions[2];
            let subjects = allOptions[3];
            let dataResponse = { universities: universities, hobbies: hobbies, groups: groups, subjects: subjects };
            console.log(dataResponse);
            return res.json({ status: 1, data: dataResponse });
        } catch (error) {
            console.log('error', error);
            return res.json({ status: 0, message: error.message });
        }
    }
}